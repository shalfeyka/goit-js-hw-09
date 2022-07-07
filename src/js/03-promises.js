import Notiflix from 'notiflix';
const references = {
  inputStep: document.querySelector('[name="step"]'),
  inputDelay: document.querySelector('[name="delay"]'),
  btnSubmit: document.querySelector('button'),
  inputAmount: document.querySelector('[name="amount"]'),
  form: document.querySelector('form')
}

references.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let user = parseInt(references.inputDelay.value);
  const userAmount = parseInt(references.inputAmount.value);
  const userStep = parseInt(references.inputStep.value);

  if(user >= 0 && userAmount >= 0 && userStep >= 0) {
    for(let position = 1; position <= userAmount; position += 1) {
      createPromise (position, user)
        .then(value => {Notiflix.Notify.success(value);;})
        .catch(error => {
          Notiflix.Notify.warning(error);
        });
      user +=userStep;
  }}
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);          
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    })
  })
}
