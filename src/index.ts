import {MikroORM} from "@mikro-orm/core";
import "reflect-metadata";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const emFork = orm.em.fork();
    // const post = emFork.create(Post, {title: 'my first post', updatedAt: new Date(), createdAt: new Date()});
    // await emFork.persistAndFlush(post);

    // const posts = await emFork.find(Post, {});
    // console.log(posts);
    const app = express();
    app.get('/', (_req, res) => {
        res.send('hello');
    })

    const apolloSever = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({em: emFork})
    });

    await apolloSever.start()
    apolloSever.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
    
}

main().catch(err => {
    console.log(err);
});