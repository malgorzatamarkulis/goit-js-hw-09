import Notiflix from 'notiflix';

let amount;
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        resolve();

        // Fulfill
      } else {
        return Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
};
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const amount = parseInt(document.querySelector("[name = 'amount']").value);
  const delay = parseInt(document.querySelector("[name = 'delay']").value);
  const step = parseInt(document.querySelector("[name = 'step']").value);

  let currentDelay = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay);
    currentDelay += step;
  }
});