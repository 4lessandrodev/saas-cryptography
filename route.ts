import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import {encrypter, db, keyHelper} from "./index";

export const generateKey: RouteOptions = {
	method: 'GET',
	url: '/key',
	handler: async (_req: FastifyRequest<any>, res: FastifyReply) => {
		
		const value = keyHelper.generateKey();
		const tag = randomUUID();

		db.setKey({ tag, value});

		res.send({ tag });
	}
}

export const encrypt: RouteOptions = {
	method: 'POST',
	url: '/encrypt',
	//preHandler: auth,
	schema:{
		body:{
			type: 'object',
			required: ['data'],
			properties: {
				data: { type:'object' },
			}
		}
	},
	handler: async (req: FastifyRequest<any>, res: FastifyReply) => {
		const xApiKey = req.headers['x-api-key'];
		
		const key = db.getKey(xApiKey);

		encrypter.setKey(key);
		
		const data = JSON.stringify(req.body.data);

		const result = await encrypter.encrypt({ data });
		res.send(result);
	}
}

export const decrypt: RouteOptions = {
	method: 'POST',
	url: '/decrypt',
	//preHandler: auth,
	schema:{
		body:{
			type: 'object',
			required: ['data'],
			properties: {
				data: { type:'string' },
			}
		}
	},
	handler: async (req: FastifyRequest<any>, res: FastifyReply) => {
		const xApiKey = req.headers['x-api-key'];

		const key = db.getKey(xApiKey);

		encrypter.setKey(key);

		const result = await encrypter.decrypt({ data: req.body.data });

		db.deleteKey(xApiKey)

		res.send(result);
	}
}
