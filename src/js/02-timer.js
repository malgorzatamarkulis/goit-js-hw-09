import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let differenceTime;
let intervalCount;
const currentTime = new Date();
let countdown = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        handleDate(selectedDates[0]);
    },
};

flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('[data-start]');

const countedElem = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

startBtn.addEventListener('click', () => {
    if (countdown) return;
    countdown = true;
    startBtn.disabled = true;
    intervalCount = setInterval(update, 1000);
});

// Define the update function before using it
function update() {
    const { days, hours, minutes, seconds } = convertMs(differenceTime);
    if (
        countedElem.days &&
        countedElem.hours &&
        countedElem.minutes &&
        countedElem.seconds
    ) {
        countedElem.days.textContent = addLeadingZero(days);
        countedElem.hours.textContent = addLeadingZero(hours);
        countedElem.minutes.textContent = addLeadingZero(minutes);
        countedElem.seconds.textContent = addLeadingZero(seconds);
    }

    if (differenceTime <= 0) {
        clearInterval(intervalCount);
        countdown = false;
        startBtn.disabled = false;
    } else {
        differenceTime -= 1000;
        //stopped when is 00:00:00
        if (differenceTime <= 0) {
            clearInterval(intervalCount);
            countdown = false;
            startBtn.disabled = false;
        }
    }
}

function handleDate(selectedDate) {
    differenceTime = selectedDate.getTime() - currentTime.getTime();
    if (differenceTime < 0) {
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;
        clearInterval(intervalCount);
    } else {
        startBtn.disabled = false;
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}