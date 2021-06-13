const startBtn = document.getElementById('startBtn')
const grid = document.querySelector('.grid-box')
let scoreDisplay = document.getElementById('score')
let squares = []
let snake = [2, 1, 0]
let direction = 1;
let timer
let width = 10
let appleIndex = 0
let score = 0
let timeInterval = 1000
const speed = 0.9

timer = setInterval(move, 1000)

function startGame() {
    //remove styling of the last snake
    snake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    //reset everything
    snake = [2, 1, 0]
    direction = 1
    appleIndex = 0
    score = 0
    scoreDisplay.textContent = score
    timeInterval = 1000
    //add the styling for the new snake
    snake.forEach(index => squares[index].classList.add('snake'))
    //generate a new apple
    generateApple()
    //call timer again
    timer = setInterval(move, timeInterval)
}

function createSquares() {
    //make a forloop to create 100 squares
    for (let i = 0; i < 100; i++) {
        //create element of div 100x
        let square = document.createElement('div')
        //add the square class on each of the div
        square.classList.add('square')
        //append the squares in the grid
        grid.appendChild(square)
        //make a separate array and push the elements in there
        squares.push(square)
    }
}
createSquares()

snake.forEach(index => squares[index].classList.add('snake'))


//function to animate our snake to move
function move() {
    if (
        (snake[0] + width >= 99 && direction === width) || //reaction when we hit the up wall
        (snake[0] % width === 9 && direction === 1) || //reaction when we hit the right wall
        (snake[0] % width === 0 && direction === -1) || //reaction when we hit the left wall
        (snake[0] - width < 0 && direction === -width) || //reaction when we hit the down wall
        squares[snake[0] + direction].classList.contains('snake')
    ) 
    return clearInterval(timer)
    
    
    
    //we first need to remove the first element
    const tail = snake.pop()
    //remove the class 'snake' as well to remove the styling
    squares[tail].classList.remove('snake')
    //add square to the end of the array
    snake.unshift(snake[0] + direction)
    
    
    if (squares[snake[0]].classList.contains('apple')) {
        //remove the apple and it's styling
        squares[snake[0]].classList.remove('apple')
        //add styling to our square
        squares[tail].classList.add('snake')
        //push a square in our array
        snake.push(tail)
        //add score
        score++
        //show score in the scoreboard
        scoreDisplay.textContent = score
        //generate another apple
        generateApple()
        //make the snake go faster
        clearInterval(timer)
        timeInterval = timeInterval * speed
        timer = setInterval(move, timeInterval)
    }

    
    //add styling to the end square
    squares[snake[0]].classList.add('snake')
}
move()


//generate apple
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * 100)
    } while (squares[appleIndex].classList.contains('snake') &&
             squares[appleIndex].classList.contains('rodent'))
        squares[appleIndex].classList.add('apple')
}
generateApple()


//giving arrow keys ability to control our snake
function control(e) {
    if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 38){
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    } 
}

document.addEventListener('keyup', control)


startBtn.addEventListener('click', startGame)