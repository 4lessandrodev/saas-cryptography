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

server.listen(3000, (console.log, console.log));
export { encrypter, keyHelper, db };
