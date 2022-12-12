import qs from 'qs';
import { z } from 'zod';
import useFiles from '../useFiles';

/* global defineEventHandler, getRequestHeaders, readBody, createError, sendError, sendRedirect, sendRedirect */

/**
 * Request body
 * Multipart/form-data
 * Validation
 * Validation errors as cookie
 * JSON vs HTML response
 * Handling other http methods
 */

/**
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event);
  let body;
  const schema = z.object({
    learned: z.literal(true),
  });

  if (headers['content-type']?.includes('application/x-www-form-urlencoded')) {
    body = qs.parse(await readRawBody(event));
  } else {
    body = await readBody(event);
  }
  if (headers['content-type']?.includes('multipart/form-data')) {
    const files = await useFiles(event);
  }

  const returnJson =
    headers['sec-fetch-mode'] !== 'navigation' || // Sent by browser
    headers.accept?.includes('application/json') || // Fetch requesting JSON
    headers['x-custom-fetch'] || // Fetch using custom header
    headers['content-type']?.includes('application/json'); // Fetch sent JSON

  try {
    body = schema.parse(body);
  } catch (error) {
    const errorResponse = createError({
      statusCode: 400,
      data: {},
    });
    for (const issue of error.issues) {
      errorResponse.data[issue.path[0]] = issue.message;
    }
    if (returnJson) {
      return sendError(event, errorResponse);
    }
    // @ts-ignore
    return sendRedirect(event, headers.referer, 400);
  }

  if (returnJson) {
    return body;
  }
  return sendRedirect(event, headers.referer, 303);
});
