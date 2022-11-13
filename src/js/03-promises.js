import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const { delay, amount, step } = e.target.elements;

  let delayValue = Number(delay.value);
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          opacity: 0.8,
          timeout: 500,
          cssAnimationDuration: 500,
          backOverlay: true,
          backOverlayColor: 'rgba(50,198,130,0.2)',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          opacity: 0.8,
          timeout: 500,
          backOverlay: true,
          cssAnimationDuration: 500,
          backOverlayColor: 'rgba(255,85,73,0.2)',
        });
      });
    delayValue += Number(step.value);
  }
  e.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}