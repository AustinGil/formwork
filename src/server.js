import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import FastifyFormbody from '@fastify/formbody';
import FastifyMultipart from '@fastify/multipart';
import FastifyCookie from '@fastify/cookie';
import { z } from 'zod';

/**
 * Request body
 * Multipart/form-data
 * Validation
 * Validation errors as cookie
 * JSON vs HTML response
 * Handling other http methods
 */

const fastify = Fastify({ logger: false });
fastify.register(FastifyCors, {
  origin: 'http://localhost:3000',
  credentials: true,
});
fastify.register(FastifyFormbody);
fastify.register(FastifyMultipart, { addToBody: true });
fastify.register(FastifyCookie);

fastify.all('/', async (request, reply) => {
  const headers = request.headers;
  const returnJson =
    headers['sec-fetch-mode'] !== 'navigation' || // Sent by browser
    headers.accept?.includes('application/json') || // Fetch requesting JSON
    headers['x-custom-fetch'] || // Fetch using custom header
    headers['content-type'].includes('application/json'); // Fetch sent JSON

  try {
    const schema = z.object({
      t: z.literal(true),
      f: z.literal(false),
    });
    const body = schema.parse({
      t: false,
      f: true,
    });
  } catch (error) {
    const data = {};
    for (const issue of error.issues) {
      data[issue.path[0]] = issue.message;
    }
    if (returnJson) {
      return reply.status(400).send(data);
    }
    return reply.redirect(400, headers.referer);
  }

  if (returnJson) {
    return reply.send({ hello: 'world' });
  }
  return reply.redirect(303, headers.referer);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
