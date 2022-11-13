import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let setTimerId = null;
let dateDiff = null;

const refs = {
  inputCalendar: document.querySelector('input[type="text"]'),
  startBtnRef: document.querySelector('button[data-start]'),
  timerDaysRef: document.querySelector('[data-days]'),
  timerHoursRef: document.querySelector('[data-hours]'),
  timerMinutesRef: document.querySelector('[data-minutes]'),
  timerSecondsRef: document.querySelector('[data-seconds]'),
};

refs.startBtnRef.addEventListener('click', onClickTimer);
function onClickTimer() {
  Notify.success('Start', {
    opacity: 0.8,
    position: 'center-top',
    timeout: 300,
    cssAnimationDuration: 800,
    backOverlay: true,
    backOverlayColor: 'rgba(50,198,130,0.2)',
    cssAnimationStyle: 'zoom',
  });
  const setTimerId = setInterval(() => {
    if (dateDiff > 0) {
      const { days, hours, minutes, seconds } = convertMs(dateDiff);

      refs.timerDaysRef.textContent = `${days}`;
      refs.timerHoursRef.textContent = `${hours}`;
      refs.timerMinutesRef.textContent = `${minutes}`;
      refs.timerSecondsRef.textContent = `${seconds}`;
    }
    if (dateDiff <= 0) {
      clearInterval(setTimerId);
    }
  }, 1000);
  refs.startBtnRef.disabled = true;
  refs.inputCalendar.disabled = true;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(setTimerId);
    const setId = setInterval(() => {
      dateDiff = selectedDates[0].getTime() - new Date().getTime();
      if (dateDiff <= 0) {
        clearInterval(setId);
        refs.startBtnRef.disabled = true;
        Notify.failure('Please choose a date in the future', {
          opacity: 0.8,
          position: 'center-top',
          timeout: 300,
          backOverlay: true,
          cssAnimationDuration: 800,
          backOverlayColor: 'rgba(255,85,73,0.2)',
          cssAnimationStyle: 'zoom',
        });
        return;
      }
    }, 1000);

    refs.startBtnRef.disabled = false;
  },
};
refs.startBtnRef.disabled = true;

// init flatpickr
const timer = flatpickr(refs.inputCalendar, options);

// format date
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}