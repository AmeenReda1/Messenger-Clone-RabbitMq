import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "../user.entity";

export let dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.POSTGRES_URI,
    entities: [UserEntity],
    migrations: ['apps/auth/db/migrations/*.js'],
}
let ds = new DataSource(dataSourceOptions);

export default ds;
