import fastify from "fastify";
import { decrypt, encrypt } from './route';
const server = fastify();

server.route(encrypt);
server.route(decrypt);

server.listen(3000, (console.log, console.log));
