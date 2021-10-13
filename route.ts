import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import encrypter from "./index";


export const encrypt: RouteOptions = {
	method: 'POST',
	url: '/encrypt',
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
		encrypter.setKey(xApiKey);
		const result = await encrypter.encrypt({ data: req.body.data });
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
		encrypter.setKey(xApiKey);
		const result = await encrypter.decrypt({ data: req.body.data });
		res.send(result);
	}
}
