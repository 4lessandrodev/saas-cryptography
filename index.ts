import 'module-alias/register';
import fastify from "fastify";
import { decrypt, encrypt, generateKey } from '@app/route';
import { Encrypter } from '@app/encrypter';
import MemDB from '@app/db/memory.db'
import { KeyHelper } from '@app/helpers/key.util';

const db = new MemDB();
const keyHelper = new KeyHelper();
const encrypter = Encrypter.init();
const server = fastify();


server.route(generateKey);
server.route(encrypt);
server.route(decrypt);

server.listen(
	process.env.PORT || 3000, 
	process.env.HOST || '::', (console.log, console.log)
);
export { encrypter, keyHelper, db };
