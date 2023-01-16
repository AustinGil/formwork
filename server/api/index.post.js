import qs from 'qs';
import { z } from 'zod';
// import useFiles from '../useFiles';

/* global defineEventHandler, getRequestHeaders, readBody, readRawBody, createError, sendError, sendRedirect, sendRedirect */

/**
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
export default defineEventHandler(async (event) => {
  /**
   * 1. Request body
   * 2. Multipart/form-data
   * 3. Validation
   * 4. JSON vs HTML response
   * 5. Handling other http methods
   */

  const headers = getRequestHeaders(event);
  let body;
  // 3. Validation
  const schema = z.object({
    learned: z.literal(true),
  });
  // 1. Request body
  if (headers['content-type']?.includes('application/x-www-form-urlencoded')) {
    body = qs.parse(await readRawBody(event));
  } else {
    body = await readBody(event);
  }
  // 2. Multipart/form-data
  // if (headers['content-type']?.includes('multipart/form-data')) {
  //   const files = await useFiles(event);
  // }

  // 4. JSON vs HTML response
  // const returnRedirect = headers['sec-fetch-mode'] === 'navigation'; // Sent by browser
  const returnJson =
    headers.accept?.includes('application/json') || // Fetch requesting JSON
    headers['content-type']?.includes('application/json') || // Fetch sent JSON
    headers['x-custom-fetch']; // Fetch using custom header

  try {
    // 3. Validation
    body = schema.parse(body);
  } catch (error) {
    // 3. Validation
    const errorResponse = createError({
      statusCode: 400,
      data: {},
    });
    for (const issue of error.issues) {
      errorResponse.data[issue.path[0]] = issue.message;
    }
    // 4. JSON vs HTML response
    if (returnJson) {
      // 3. Validation
      return sendError(event, errorResponse);
    }
    // 3. Validation
    return sendRedirect(event, String(headers.referer), 400);
  }

  // 4. JSON vs HTML response
  if (returnJson) {
    return body;
  }
  return sendRedirect(event, String(headers.referer), 303);
});
