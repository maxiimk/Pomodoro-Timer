// array con frasette come Time to Work!/Time for Break
const container = document.querySelector('#container');
const timer = document.querySelector('#timer')
const buttons = document.querySelector('#buttons').children
const start = document.querySelector('#start')
const startBtn = document.querySelector('#start button')
const title = document.querySelector('title')
const pauseBtn = document.createElement('button')
start.appendChild(pauseBtn)
pauseBtn.innerText = 'Pause'
pauseBtn.style.display = 'none'
const btnVal = {
    'Pomodoro': {
        seconds: 1500,
    },
    'Short Break': {
        seconds: 300,
    },
    'Long Break': {
        seconds: 900,
    }
}
const btnArray = Array.from(buttons)
const mapArray = btnArray.map(button => button.textContent)

let isClockRunning = false;
// valore di default di 25 min per displayTime
let sessionTime = 1500;
let timeLeftInSession = 1500;

function convertTime(el) {
    let sec = el % 60
    let min = parseInt(el / 60) % 60;

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }

    let res = `${addLeadingZeroes(min)}:${addLeadingZeroes(sec)}`
    return res.toString()
}
// per ogni button ci aggiungo un evento che cambiera i due valori di sopra con il match in btnVal, cambiera lo stile / funzioni btnEvent e btnClick da rifare.
const btnLoop = () => {
    btnArray.forEach((button,index) => {
        button.addEventListener('click', () => {
            if (isClockRunning == false) {
                timer.innerText = convertTime(btnVal[button.textContent].seconds)
                timeLeftInSession = btnVal[button.textContent].seconds
                sessionTime = btnVal[button.textContent].seconds
                title.innerText = convertTime(btnVal[button.textContent].seconds) + ' - Pomodoro-Timer.✔'
            } else {
                let confirm = window.confirm(`Do you want to take a ${button.textContent.toLowerCase()}?`)
                if (confirm == true) {
                    stopClock()
                }
            }
        });
    })
}

btnLoop()
// questa funzione inizia o ferma il timer in base allo stato di isClockRunning. 
const toggleClock = (reset) => {
    if (reset === false) {
        //stop timer
        stopClock()
    } else {
        //start timer 
        clockTimer = setInterval(() => {
            timeLeftInSession--
            displayTime();
        }, 1000)
    }
}
// creo le variabili per i secondi e i minuti usando il % e metto sul display il tempo || questa funzione e fondamentale, funziona alla grande nel mio caso. Non posso eliminarla in nessun modo 
const displayTime = () => {
    // convert time and handling the result 
    let result = convertTime(timeLeftInSession)
    // setting title and timer innerText
    title.innerText = `${result} - Pomodoro-Timer.✔`
    timer.innerText = result
    // handle result when reach end
    if (result === '00:00') {

        setTimeout(() => {
            container.style.backgroundColor = 'rgb(150, 189, 103)';
            startBtn.style.color = 'rgb(150, 189, 103)';
            pauseBtn.style.display = 'none';
        }, 50)

        setTimeout(() => {
            alert(`Timer finished✔`)
            stopClock()
        }, 500)
    }
}
const stopClock = () => {
    clearInterval(clockTimer)
    isClockRunning = false
    // 
    timeLeftInSession = sessionTime;
    // styling
    startBtn.innerText = 'Start'
    container.style.backgroundColor = 'rgba(233, 42, 29, 0.8)';
    startBtn.style.color = 'rgba(233, 42, 29, 0.8)';
    pauseBtn.style.display = 'none'
    // displayTime
    displayTime();
}
startBtn.addEventListener('click', () => {
    if (startBtn.innerText === 'Start') {
        // styling
        startBtn.innerText = 'Stop'
        container.style.backgroundColor = 'rgb(247,122,96)';
        startBtn.style.color = 'rgb(247,122,96)';
        pauseBtn.style.display = 'inline';
        pauseBtn.style.color = 'rgb(247,122,96)';
        // setting clock and passing in to toggleClock
        isClockRunning = true
        toggleClock(isClockRunning)
    } else if (startBtn.innerText === 'Restart') {
        // styling
        startBtn.innerText = 'Stop'
        pauseBtn.style.color = 'rgb(247,122,96)';
        container.style.backgroundColor = 'rgb(247,122,96)'
        startBtn.style.color = 'rgb(247,122,96)'
        // setting clock and passing in to toggleClock
        isClockRunning = true
        toggleClock(isClockRunning)
    } else {
        let confirm = window.confirm('Do you really want to stop?')
        if (confirm == true) {
            // styling
            startBtn.innerText = 'Start'
            container.style.backgroundColor = 'rgba(233, 42, 29, 0.8)';
            startBtn.style.color = 'rgba(233, 42, 29, 0.8)';
            pauseBtn.style.display = 'none';
            // setting clock and passing in to toggleClock
            isClockRunning = false
            toggleClock(isClockRunning)
        }
    }

})
pauseBtn.addEventListener('click', () => {
    if (isClockRunning == true) {
        // clear the Interval
        clearInterval(clockTimer);
        // styling
        startBtn.innerText = 'Restart'
        pauseBtn.style.color = 'rgba(57, 106, 214, 0.658)'
        startBtn.style.color = 'rgba(57, 106, 214, 0.658)';
        container.style.backgroundColor = 'rgba(57, 106, 214, 0.658)'
    }
})
window.onbeforeunload = function() {
    return 'Are you sure you want to leave?';
}