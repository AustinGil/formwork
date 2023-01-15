/**
 * @typedef {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} HTMLFormControl
 */

const FORM_CONTROLS = 'input,select,textarea';

/**
 * @param {SubmitEvent} event
 */
function handleSubmit(event) {
  /** @type {HTMLFormElement} */
  // @ts-ignore
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();

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
