let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {

    //when we start a timer clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    // console.log({ now, then });
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //console.log(secondsLeft);

        //how do you stop it before displaying

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        //display it
        //console.log(secondsLeft);
        displayTimeLeft(secondsLeft);

    }, 1000)

} //simply using set interval is not ideal as when you scrol the browser stops the set interval function
//due to performance issue and in case of long absence of activity also browser stops it
//so new way used

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds <10 ? '0':''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    //console.log({ minutes, remainderSeconds });
    document.title = display;

}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `BE BACK AT ${hours > 12?hours-12:hours}:${minutes <10 ? '0':''}${
        minutes
    }`;
}

function startTimer(e) {
    const seconds = parseInt(this.dataset.time);
    console.log(seconds);
    timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
//if you have name attribute you can directly fetch it from dom like below
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})