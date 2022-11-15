// const refs = {
//     startButtonShengeColor: document.querySelector('[data-start]'),
//     stopButtonShengeColor: document.querySelector('[data-stop]'),
//     bodyRef: document.body
// };

// refs.startButtonShengeColor.addEventListener('click', onSwitcher);
// refs.stopButtonShengeColor.addEventListener('click', offSwitcher);

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// let setId = null;
// let activeBtn = true;


// function onSwitcher() {
//     if (activeBtn) {
//         setId = setInterval(() => {
//             refs.bodyRef.style.backgroundColor = `${getRandomHexColor()}`
//         }, 1000);
//         refs.startButtonShengeColor.setAttribute('offBtn', true);
//     }
//     activeBtn = false;
// }

// function offSwitcher() {
//   clearInterval(setId);
//   if (!activeBtn) {
//     refs.startButtonShengeColor.removeAttribute('disabled', true);
//   }
//   activeBtn = true;
// }


// переробляю ДЗ 
// Функція рандомного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// змінні з якими ми взаємодіємо
const startBatton = document.querySelector('[data-start]');
const stopBatton = document.querySelector('[data-stop]');
const bodySelector = document.body;

// за замовчуванням кнопка стоп не активна
stopBatton.disabled = true;

// Слухачі кліку на кнопки
startBatton.addEventListener('click', onRandomColor);
stopBatton.addEventListener('click', offRandomColor);

// премінна для збереження ід інтервалу
let timerId = null

// Функція для вмикання та вимикання зміни кольору та підключення та відключення інтервалу

function onRandomColor() {
  bodySelector.style.backgroundColor = getRandomHexColor(); //для того щоб запускалась зміна одразу після нажаття на кнопку старт
  timerId = setInterval(() => {
    bodySelector.style.backgroundColor = getRandomHexColor();
  }, 1000);
  //дісейблем кнопки під час нажаття кнопки старт 
  stopBatton.disabled = false;
  startBatton.disabled = true;
};


function offRandomColor() {
  clearInterval(timerId);
  //дісейблем кнопки під час нажаття кнопки стоп
  stopBatton.disabled = true;
  startBatton.disabled = false;
};