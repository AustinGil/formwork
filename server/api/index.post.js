/* global defineEventHandler, getRequestHeaders, readBody, createError, sendError, sendRedirect, sendRedirect */

/**
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
export default defineEventHandler(async (event) => {
  return { hello: 'world' };
});
