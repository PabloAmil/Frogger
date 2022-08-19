const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div') // toma todos los divs que esten dentro del grid, estan TODOS los cuadros del juego seleccionados
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const messege = document.querySelector('.messege')





let currentIndex = 73 // cada cuadro tiene un indice, al seleccionar con querySelector, se devuelve un nodelist que es como un array
const width = 9; // como el largo de la grilla es siempre 9 para subir al currentIndex solo hay que sumarle o restarle esos 9 
let timerId;
let currentTime = 5;
let checkWinOrLose = setInterval(winOrLose, 5)

// frog 

function moveFrog(e) { // se pasa el evento que devuelve el event listener como parametro de la funcion

    // agregar y mover la rana
    squares[currentIndex].classList.remove('frog') // cada vez que la rana se mueva, hay que sacarle al cuadro en el que esta la clase 'frog'

    switch (e.key) { // recordar que la palabra key es para referirse al teclado
        case 'ArrowLeft':
            console.log('move left')
            if (currentIndex % width !== 0) currentIndex -= 1 // para limitar el perimetro: si currentIndex % width == 0, osea que es 0 o un multiplo de 9, sabemos que estamos parados en una de esas casillas. ahora, si no fuese asi, si la ecuacion es: currentIndex % width !== 0, entonces SI tiene que poder moverse a la izquierda. es decir que para que se pueda mover a la izquierda, la casilla NO tiene que ser multiplo de 9 
            console.log(currentIndex)
            break
        case 'ArrowRight':
            console.log('move right')
            if (currentIndex % width < width - 1) currentIndex += 1 // de esta manera el currentIndex se actualiza, y no suma numeros. Si el resto de currentindex/9 es menor que 8 entonces SI se puede mover // volver a leer este
            console.log(currentIndex)
            break
        case 'ArrowUp':
            console.log('move Up')
            if (currentIndex - width >= 0) currentIndex -= width // si el currentIndex - 9 es igual o mayor a 0 puede subir
            console.log(currentIndex)
            break
        case 'ArrowDown':
            console.log('move Down')
            if (currentIndex + width < width * width) currentIndex += width // si el currentIndex + 9 es menor que 81, puede bajar
            console.log(currentIndex)
            break
    }

    squares[currentIndex].classList.add('frog') // al cuadro al que se desplace le agrega la clase 'frog'

}

function autoMoveElements() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft)) // por cada log con la clase log-left  y log-right  y car-left y car-right los va a pasar por la funcion correspondiente
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))

}

function moveLogLeft(logLeft) {

    switch (true) { // lo que va a hacer es checkear si los logs tienen la clase
        case logLeft.classList.contains('l1'): // se fija si tiene la clase 'li'
            logLeft.classList.remove('l1') // si la tiene, la remueve
            logLeft.classList.add('l2') // y la cambia por la que sigue. todo esto va generando la sensacion de movimiento
            break
        case logLeft.classList.contains('l2'): // se fija si tiene la clase 'l2'
            logLeft.classList.remove('l2') // si la tiene, la remueve
            logLeft.classList.add('l3') // y la cambia por la que sigue. 
            break
        case logLeft.classList.contains('l3'): // se fija si tiene la clase 'li'
            logLeft.classList.remove('l3') // si la tiene, la remueve
            logLeft.classList.add('l4') // l4 ya es el agua
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) { // no se si es necesario ponerlo de vuelta...

    switch (true) { // lo que va a hacer es checkear si los logs tienen la clase
        case logRight.classList.contains('l1'): // se fija si tiene la clase 'li'
            logRight.classList.remove('l1') // si la tiene, la remueve
            logRight.classList.add('l5') // y la cambia por la que sigue. todo esto va generando la sensacion de movimiento
            break
        case logRight.classList.contains('l2'): // se fija si tiene la clase 'l2'
            logRight.classList.remove('l2') // si la tiene, la remueve
            logRight.classList.add('l1') // y la cambia por la que sigue. 
            break
        case logRight.classList.contains('l3'): // se fija si tiene la clase 'li'
            logRight.classList.remove('l3') // si la tiene, la remueve
            logRight.classList.add('l2') // l4 ya es el agua
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}


function moveCarLeft(carLeft) {

    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}


function moveCarRight(carRight) {

    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function lose() { // fijarse si esto no podemos hacerlo un poco mas rapido
    if (squares[currentIndex].classList.contains('c1') || (squares[currentIndex].classList.contains('l4') || (squares[currentIndex].classList.contains('l5')))) {
        resultDisplay.textContent = 'you lose!'
        clearInterval(timerId)
        clearInterval(timeLeft)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keydown', moveFrog)
        messege.textContent = 'Press Enter to play again'
        document.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {
                location. reload()
            }
        })
    }
}

function win() {

    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'you win!!!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveFrog)
        clearInterval(timeLeft)
        messege.textContent = 'Press Enter to play again'
        document.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {
                location. reload()
            }
        })

    }
}

function checkTime() {

    currentTime--
    timeLeftDisplay.textContent = currentTime
    if (currentTime == 0) {
        resultDisplay.textContent = 'you lose!'
        clearInterval(timeLeft)
        clearInterval(timerId)
        document.removeEventListener('keydown', moveFrog)
    }
}

document.addEventListener('keydown', (e) => {

    if (e.key === "Enter") { // ver por que no funciona el Enter

        if (timerId) { // si el timerId existe... 
            clearInterval(timerId) // lo detiene, es la variable que mueve los autos
            clearInterval(timeLeft) // tamb detiene el tiempo 
            document.removeEventListener('keydown', moveFrog)
            timerId = null // timerId tiene que volver a ser null para que quede vacio y vaya al else, sino siempre queda en el if
        } else { // si "dejo de existir" los reanuda
            timerId = setInterval(autoMoveElements, 500); // es importante asignarlo a una variable porque es despues la que se toma para detenerlo
            timeLeft = setInterval(checkTime, 1000);
            document.addEventListener('keydown', moveFrog)
        }
    }
})

function winOrLose() {
    lose()
    win()
}

