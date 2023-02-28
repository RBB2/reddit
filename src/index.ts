import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import {Post} from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const emFork = orm.em.fork();
    // const post = emFork.create(Post, {title: 'my first post', updatedAt: new Date(), createdAt: new Date()});
    // await emFork.persistAndFlush(post);

    // const posts = await emFork.find(Post, {});
    // console.log(posts);
    
}

main().catch(err => {
    console.log(err);
});