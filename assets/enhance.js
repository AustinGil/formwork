/**
 * @typedef {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} HTMLFormControl
 */

const FORM_CONTROLS = 'input,select,textarea';

/**
 * @param {HTMLInputElement} input
 */
function validateInput(input) {
  input.id = input.id || Math.random().toString(36).slice(2);
  const id = input.id;
  const errorId = `${id}__errors`;
  const { validity } = input;
  const errorContainer =
    document.getElementById(errorId) || document.createElement('div');

  if (validity.valid) {
    errorContainer.remove();
    return;
  }

  errorContainer.id = errorId;
  input.ariaInvalid = 'true';
  let descriptors = input.getAttribute('aria-describedby');
  if (descriptors) {
    descriptors = descriptors.split(' ');
  } else {
    descriptors = [];
  }
  descriptors = descriptors.filter((s) => s !== errorContainer.id);

  const errors = [];
  if (validity.valueMissing) {
    errors.push('This field is required.');
  }
  if (validity.tooShort) {
    errors.push(`This field must be at least ${input.minLength} characters.`);
  }
  if (errors.length) {
    errorContainer.innerHTML = errors.join(' ');
    input.parentElement?.after(errorContainer);
    descriptors.push(errorContainer.id);
  }

  if (descriptors?.length) {
    input.setAttribute('aria-describedby', descriptors.join(' '));
  }
}

/** @param {HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement} input */
function enhanceInput(input) {
  input.addEventListener('blur', (event) => {
    validateInput(event.currentTarget);
  });
  input.addEventListener('input', (event) => {
    validateInput(event.currentTarget);
  });
}

/**
 * @param {SubmitEvent} event
 */
function handleSubmit(event) {
  /** @type {HTMLFormElement} */
  // @ts-ignore
  const form = event.currentTarget;

  const previousController = form.__controller;
  if (previousController) {
    previousController.abort();
  }

  const controller = new AbortController();
  form.__controller = controller;

  if (!form.checkValidity()) {
    // form.reportValidity();
    const inputs = form.querySelectorAll(FORM_CONTROLS);
    for (const input of inputs) {
      validateInput(input);
    }
    form.querySelector(':invalid:not(fieldset)')?.focus();
    event.preventDefault();
    return;
  }

  const url = new URL(form.action);
  const formData = new FormData(form);
  const searchParameters = new URLSearchParams(formData);

  /** @type {RequestInit} */
  const options = {
    method: form.method,
    signal: controller.signal,
  };

  if (form.method.toLowerCase() === 'post') {
    if (form.enctype === 'multipart/form-data') {
      options.body = formData;
    } else {
      options.body = searchParameters;
    }
  } else {
    url.search = searchParameters;
  }

  fetch(url, options).then(() => {
    delete form.__controller;
  });
  event.preventDefault();
}

/**
 * @param {HTMLFormElement} form
 * @param {{}} [options]
 */
export function enhanceForm(form, options = {}) {
  form.noValidate = true;
  form?.addEventListener('submit', handleSubmit);

  const inputs = form.querySelectorAll(FORM_CONTROLS);
  for (const input of inputs) {
    enhanceInput(input);
  }
}
