"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230228230657 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230228230657 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "title" type text using ("title"::text);');
    }
    async down() {
        this.addSql('alter table "post" alter column "title" type varchar(255) using ("title"::varchar(255));');
    }
}
exports.Migration20230228230657 = Migration20230228230657;
//# sourceMappingURL=Migration20230228230657.js.map