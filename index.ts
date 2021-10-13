import fastify from "fastify";
import { decrypt, encrypt, generateKey } from './route';
import { Encrypter } from './encrypter';
import MemDB from './memory.db'
import { KeyHelper } from './key.helper';

const db = new MemDB();
const keyHelper = new KeyHelper();
const server = fastify();

const encrypter = Encrypter.init();

server.route(generateKey);
server.route(encrypt);
server.route(decrypt);

console.log(process.env);

server.listen(process.env.PORT || 3000, process.env.HOST || '::', (console.log, console.log));
export { encrypter, keyHelper, db };
