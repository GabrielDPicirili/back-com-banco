import pgp from "pg-promise";
import { config} from 'dotenv';
import path,{join} from "path";
import { fileURLToPath } from "url";

config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const dbURL = `postgres://${user}:${password}@${host}:${port}/${database}`;

const pg = pgp()(dbURL);
export default function connect(){
    

    pg.query("SELECT 1+1 AS result").then((result)=> {
        console.log(result);
    });
}

const __fimename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fimename);

const filePath = join(__dirname, "Create-tables.sql");
const query = new  pgp.QueryFile(filePath);

pg.query(query);

