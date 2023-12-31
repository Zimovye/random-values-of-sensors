const $values__select = document.getElementById('values__select')
const $values__img = document.querySelector('.values-header__img img') // сама картинка, — не контейнер
var IsWorkerCanvasActive = true
let groupAmount = 4 // количество групп в поле с которым мы сейчас работаем
let stringInGroupAmount = 2 // количество строк в каждой группе в поле с которым мы сейчас работаем


let outputWorkerPattern = {
    1: {
        PULS: 88,
        TEMP: 36
    }
}
var outputWorker = {}


// ========== change the image to a worker/transport ==========
$values__select.addEventListener('change', () => {
    $values__img.setAttribute('src', $values__select.value)
})
// //======== change the image to a worker/transport ==========

// ========== open list worker or transport ==========
const $values__container__worker = document.querySelector('.values__container__worker')
const $values__container__transport = document.querySelector('.values__container__transport')

$values__select.addEventListener('change', () => {
    $values__container__worker.classList.toggle('hide')
    $values__container__transport.classList.toggle('hide')
    if ([...$values__container__worker.classList].indexOf('hide') == '1') {
        IsWorkerCanvasActive = false
        groupAmount = 1
        stringInGroupAmount = 2
    } else {
        IsWorkerCanvasActive = true
        groupAmount = 4
        stringInGroupAmount = 2
    }
})
// //======== open list worker or transport ==========

// ========== generate numbers ==========
const $startBtn = document.getElementById('start-btn')
const $stopBtn = document.getElementById('stop-btn')
const $intervalInput = document.getElementById('intervalInput')
const $keys = Array.from(document.getElementsByClassName('values__container__key'))
let rangenIntervalID

$startBtn.addEventListener('click', startGenerate)
$stopBtn.addEventListener('click', stopGenerate)

function randomNum(min, max) {
    min = Math.ceil(min)
    max = Math.floor(++max)
    return Math.floor(Math.random() * (max - min)) + min // Максимум включается, минимум включается
}

// ===== при нажатии на кнопку "Start" =====
// ----- функция, которая запускает Interval
function startGenerate() {
    $startBtn.setAttribute('disabled', '')
    $intervalInput.setAttribute('disabled', '')
    $stopBtn.removeAttribute('disabled')

    $keys.forEach($el => {
        Array.from($el.getElementsByTagName('input')).forEach($input => {
            $input.setAttribute('disabled', '')
        })
    })

    // -- функция определяющая сколько времени будет интрвал
    const getAmountOfInterval = function() {
        if ($intervalInput.value.trim().length > 0) {
            return $intervalInput.value.trim() * 1000
        } else {
            return 1000
        }
    }
    // // функция определяющая сколько времени будет интрвал
    setEnterValue() // вызываем функцию, чтобы отсчёт пошёл сразу же после нажатия кнопки
    rangenIntervalID = setInterval(setEnterValue, getAmountOfInterval()) // определяем Interval
}
// //--- функция, которая запускает Interval
// ----- функция, изменяет строку со значением
function setEnterValue() {
    var randomEnter = 0

    $keys.forEach($el => {
        randomEnter = randomNum($el.querySelector('.input-from').value, $el.querySelector('.input-to').value)
        $el.querySelector('.enter-num').textContent = randomEnter
    })

    conLogOject() // добавляем в массив, выводящийся в консоль
}
// //--- функция, изменяет строку со значением
// //=== при нажатии на кнопку "Start" =====

// ===== при нажатии на кнопку "Stop" =====
function stopGenerate() {
    $startBtn.removeAttribute('disabled')
    $intervalInput.removeAttribute('disabled')
    $stopBtn.setAttribute('disabled', '')

    $keys.forEach($el => {
        Array.from($el.getElementsByTagName('input')).forEach($input => {
            $input.removeAttribute('disabled')
        })
    })

    clearInterval(rangenIntervalID) // очищаем Interval
    rangenIntervalID = null
}
// //=== при нажатии на кнопку "Stop" =====
// //======== generate numbers ==========

// ========== output to console log ==========
function conLogOject() {
    outputWorkerPattern = {
        1: {
            PULS: 88,
            TEMP: 36
        }
    }
    var enterField


    if (IsWorkerCanvasActive) {
        enterField = [...document.querySelector('.values__container__worker').getElementsByClassName('enter-num')]
    } else {
        enterField = [...document.querySelector('.values__container__transport').getElementsByClassName('enter-num')]
    }

    for (let groupI = 0; groupI < groupAmount * (stringInGroupAmount - 1); groupI++) {
        for (let stringI = 0; stringI < stringInGroupAmount; stringI++) {
            // console.log('groupI', groupI)
            // console.log('stringI', stringI)
            // console.warn(outputWorkerPattern[groupI + 1])
            // console.log(outputWorkerPattern[groupI + 1][enterField[groupI * stringInGroupAmount + stringI].getAttribute('data-keyname')] = enterField[groupI * stringInGroupAmount + stringI].textContent)
            // console.log(outputWorkerPattern)

            outputWorkerPattern[groupI + 1][enterField[groupI * stringInGroupAmount + stringI].getAttribute('data-keyname')] = enterField[groupI * stringInGroupAmount + stringI].textContent
        }
        outputWorker[groupI + 1] = outputWorkerPattern[groupI + 1]
        outputWorkerPattern = {
            [groupI + 2]: {
                PULS: 88,
                TEMP: 36
            }
        }

    }
    console.log('outputWorker: ', outputWorker)

}
// //======== output to console log ==========
