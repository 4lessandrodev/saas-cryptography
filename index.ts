import fastify from "fastify";
import { decrypt, encrypt } from './route';
import { Encrypter } from './encrypter';
const server = fastify();
const encrypter = Encrypter.init();

server.route(encrypt);
server.route(decrypt);

server.listen(3000, (console.log, console.log));
export default encrypter;
