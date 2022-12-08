import path from 'node:path';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import FastifyFormbody from '@fastify/formbody';
import FastifyMultipart from '@fastify/multipart';
import FastifyView from '@fastify/view'
import ejs from 'ejs'

const fastify = Fastify({ logger: true });
fastify.register(FastifyView, {
  engine: { ejs: ejs },
});
fastify.register(FastifyStatic, {
  root: path.dirname(new URL(import.meta.url).pathname) // __dirname
});
fastify.register(FastifyFormbody);
fastify.register(FastifyMultipart, { addToBody: true });

fastify.get('/', async (request, reply) => {
  return reply.view('/src/index.ejs');
});
fastify.all('/api', async (request, reply) => {
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