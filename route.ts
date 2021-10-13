import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import DecryptService from "./decrypt-service";
import EncryptService from './encrypt-service';

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
		const result = await EncryptService(req.body.data, xApiKey);
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
		const result = await DecryptService(req.body, xApiKey);
		res.send(result);
	}
}
