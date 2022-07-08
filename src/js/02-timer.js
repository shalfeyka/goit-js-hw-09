import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";



const references = {
  buttonStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
}

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDate = selectedDates[0].getTime();
      if (selectedDate <= Date.now()) {
          Notify.failure('Please choose a date in the future');
      }
      else {
         references.buttonStart.disabled = false;
      }
  },
};

let selectedDate;
flatpickr("#datetime-picker", options);

references.buttonStart.disabled = true;
references.buttonStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  const interval = setInterval(() => {
      const difTime = selectedDate - Date.now();
      const date = convertMs(difTime);
      if (date.seconds < 0) {
          clearInterval(interval);
          return;
      }
      updateTimerFace(date);  
  }, 1000)
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  references.timer.querySelector('[data-days]').textContent = pad(days);
  references.timer.querySelector('[data-hours]').textContent = pad(hours);
  references.timer.querySelector('[data-minutes]').textContent = pad(minutes);
  references.timer.querySelector('[data-seconds]').textContent = pad(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return value.toString().padStart(1, '0');
}