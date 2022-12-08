/**
 * @typedef {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} HTMLFormControl
 */

const FORM_CONTROLS = 'input,select,textarea';

/** @param {HTMLFormControl} input */
function validateInput(input) {
  /**
   * Check validity state
   * Toggle aria-invalid
   * Get or generate input ID
   * Create .control__errors div with errors
   * Connect with aria-describedby
   * Account for pre-existing aria-describedby excluding
   * Challenge: Custom error messages via config
   * Challenge: Custom error messages via data-attrs
   */
  const inputId = input.id || Math.random().toString(36).slice(2);
  input.id = inputId;
  const errorsId = `${inputId}-input-errors`;
  let descriptors = input.getAttribute('aria-describedby');
  descriptors = descriptors ? descriptors.split(' ') : [];
  descriptors = descriptors.filter((s) => s !== errorsId);

  const { validity } = input;
  input.setAttribute('aria-invalid', false);
  document.getElementById(errorsId)?.remove();

  if (!validity.valid) {
    input.setAttribute('aria-invalid', true);
    const errors = [];
    const errorContainer = document.createElement('div');
    errorContainer.id = errorsId;
    errorContainer.classList.add('control__errors');

    if (validity.valueMissing) {
      errors.push(`Field is required.`);
    }
    if (validity.typeMismatch) {
      errors.push(`Must be of type ${input.getAttribute('type')}.`);
    }
    if (validity.rangeUnderflow) {
      errors.push(`Must be greater than ${input.getAttribute('min')}.`);
    }
    if (validity.rangeOverflow) {
      errors.push(`Must be less than ${input.getAttribute('max')}.`);
    }
    if (validity.tooShort) {
      errors.push(`Must be longer than ${input.getAttribute('min-length')}.`);
    }
    if (validity.tooLong) {
      errors.push(`Must be shorter than ${input.getAttribute('max-length')}.`);
    }
    if (validity.patternMismatch) {
      errors.push(`Does not match pattern (${input.getAttribute('pattern')}).`);
    }

    errorContainer.innerText = errors.join(' ');

    descriptors.push(errorsId);
    input.parentElement.before(errorContainer);
  }

  if (descriptors.length > 0) {
    input.setAttribute('aria-describedby', descriptors.join(' '));
  }
}

/** @param {Event} event */
function validateOnEvent(event) {
  const input = event.currentTarget;
  if (event.type === 'blur') {
    input.dataset.validateme = true;
  }
  if (!input.dataset.validateme) return;
  validateInput(input);
}
/** @param {HTMLInputElement} input */
export function enhanceInput(input) {
  input.addEventListener('input', validateOnEvent);
  input.addEventListener('blur', validateOnEvent);
}

class FetchError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = 'FetchError';
  }
}
class LazyPromise extends Promise {
  constructor(fn) {
    // eslint-disable-next-line prettier/prettier
    super(() => { });
    if (typeof fn !== 'function') {
      throw new TypeError(`Promise resolver is not a function`);
    }
    this._fn = fn;
  }
  then() {
    this.promise = this.promise || new Promise(this._fn);
    return this.promise.then.apply(this.promise, arguments);
  }
}
/**
 * @param {Parameters<typeof fetch>[0]} url
 * @param {Parameters<typeof fetch>[1] & {
 * data?: string | object,
 * json?: string | object,
 * timeout?: number
 * retry?: number
 * retryWait?: number
 * retryExponential?: boolean,
 * modifyRequest?: (init: Parameters<typeof enhancedFetch>[1]) => Parameters<typeof enhancedFetch>[1]
 * modifyResponse?: (response: ReturnType<enhancedFetch>) => any
 * }} [init]
 */
export function enhancedFetch(url, init = {}) {
  /**
   * Put data on response object
   * Errors on bad requests
   * Abortable
   * Retries
   * Timeout
   * Lazy execution
   * Challenge: How to handle 3XX status codes?
   * Challenge: Resumable on network reconnect (navigator.onLine)
   */

  url = new URL(url);
  const controller = new AbortController();
  if (!init.signal) {
    init.signal = controller.signal;
  }
  init.headers = init.headers || {};

  // Create custom return Promise with custom properties
  /** @type {Promise<Response & { data: any }> & { abort: typeof controller.abort }} */
  const promise = new LazyPromise(async (resolve, reject) => {
    try {
      if (init.timeout != undefined) {
        setTimeout(() => {
          reject(new FetchError('HTTP request exceeded timeout limit.'));
        }, init.timeout);
      }

      if (init.modifyRequest) {
        init = init.modifyRequest(init);
      }

      let response = await fetch(url, init);
      // In the event of bad requests
      if (!response.ok) {
        const retry = init.retry;
        // Check if we need to retry request more times
        if (retry) {
          init.retryWait = init.retryWait || 500;
          await new Promise((r) => setTimeout(r, init.retryWait));

          const exponential =
            init.retryExponential != undefined ? init.retryExponential : true;
          init.retryWait = exponential ? init.retryWait * 2 : init.retryWait;
          return resolve(
            enhancedFetch(url, {
              ...init,
              retry: retry - 1,
            })
          );
        } else {
          // throw custom error with access to response object
          throw new FetchError(`${response.status} ${response.statusText}`, {
            cause: response,
          });
        }
      }

      // Grab response.json for JSON, otherwise use response.text
      let bodyType = 'text';
      if (response.headers.get('content-type')?.includes('application/json')) {
        bodyType = 'json';
      }

      // Append data property to response object with results
      const data = await response[bodyType]();
      response.data = data;

      if (init.modifyResponse) {
        response = init.modifyResponse(response);
      }

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  promise.abort = () => controller.abort();
  return promise;
}

/**
 * @param {BeforeUnloadEvent} event
 */
function onBeforeUnload(event) {
  const changedForm = document.querySelector(
    'form[data-preventnav][data-haschanges'
  );
  if (!changedForm) return;
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
}

/**
 * @param {HTMLFormElement} form
 * @param {{
 * preventNav: boolean
 * }} [options]
 */
export function enhanceForm(form, options = {}) {
  /**
   * Enhance submission with fetch
   * Account for file inputs (multipart/form-data)
   * noValidate, checkValidity & reportValidity
   * Custom input validation UI
   * Focus/scroll management (w/o aria live regions)
   * Handling nested form data
   * Prevent page navigation
   * Store in sessionStorage
   * Prevent spamming submit button
   * Enhanced fetch
   */

  if (options.preventNav) {
    form.dataset.preventnav = true;
    form.addEventListener('change', () => {
      form.dataset.haschanges = true;
    });
    form.addEventListener('submit', () => {
      form.dataset.haschanges = false;
    });
    window.addEventListener('beforeunload', onBeforeUnload);
  }

  /** @type {NodeListOf<HTMLFormControl>} */
  const inputs = form.querySelectorAll(FORM_CONTROLS);
  for (const input of inputs) {
    enhanceInput(input);
  }

  form.noValidate = true;
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      for (const input of form.querySelectorAll(FORM_CONTROLS)) {
        input.dataset.validateme = true;
        validateInput(input);
      }
      form.querySelector(':invalid:not(fieldset)').focus();

      event.preventDefault();
      return;
    }

    if (form._pendingRequest) {
      form._pendingRequest.abort();
    }

    /** @type {HTMLFormElement} */
    const url = new URL(form.action || window.location.href);
    const formData = new FormData(form);
    const searchParameters = new URLSearchParams(formData);
    const options = {
      method: form.method,
    };

    if (options.method.toUpperCase() === 'GET') {
      url.search = searchParameters;
    } else {
      options.body =
        form.enctype === 'multipart/form-data' ? formData : searchParameters;
    }

    event.preventDefault();
    const request = enhancedFetch(url, options);
    form._pendingRequest = request;
    request.then(() => {
      delete form._pendingRequest;
    });
    return request;
  });
}
