import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}'
    },
    entities: [Post],
    dbName: "reddit",
    user: "postgres",
    password: "admin",
    debug: !__prod__,
    type: 'postgresql'
} as Parameters<typeof MikroORM.init>[0];