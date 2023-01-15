/**
 * @typedef {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} HTMLFormControl
 */

const FORM_CONTROLS = 'input,select,textarea';

/**
 * @param {HTMLInputElement} input
 */
function validateInput(input) {
  const { validity } = input;
  if (validity.valid) return;

  input.id = input.id || Math.random().toString(36).slice(2);
  const id = input.id;

  input.ariaInvalid = 'true';
  const errorContainer = document.createElement('div');
  errorContainer.id = `${id}__errors`;
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
  if (errors.length) {
    errorContainer.innerHTML = errors.join(' ');
    input.parentElement?.after(errorContainer);
    descriptors.push(errorContainer.id);
  }

  if (descriptors?.length) {
    input.setAttribute('aria-describedby', descriptors.join(' '));
  }
}

/**
 * @param {SubmitEvent} event
 */
function handleSubmit(event) {
  /** @type {HTMLFormElement} */
  // @ts-ignore
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    // form.reportValidity();
    const inputs = form.querySelectorAll(FORM_CONTROLS);
    for (const input of inputs) {
      validateInput(input);
    }
    event.preventDefault();
    return;
  }

  const url = new URL(form.action);
  const formData = new FormData(form);
  const searchParameters = new URLSearchParams(formData);
  const options = {
    method: form.method,
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

  fetch(url, options);
  event.preventDefault();
}

/**
 * @param {HTMLFormElement} form
 * @param {{}} [options]
 */
export function enhanceForm(form, options = {}) {
  form.noValidate = true;
  form?.addEventListener('submit', handleSubmit);
}
