const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let direction

const size = 30

const randomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(canvas.width - size, 0)
    return Math.round(number / 30) * 30
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: 'red'
}

const snake = [
    {x: 270, y: 180},
    {x: 300, y: 180}
]

const drawFood = () => {
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
}

const drawSnake = () => {
    ctx.fillStyle = '#ddd'

    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if(!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y });
    }else if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y });
    }else if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size });
    }else if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size });
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#191919'

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        let x = randomPosition() 
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }
        
        food.x = x
        food.y = y
    }
}

const gameOver = () => {
    direction = undefined
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const neckIndex = snake.length - 2

    const wallCollision = head.x < -30 || head.x > (canvas.width) || head.y < -30 || head.y > (canvas.width)
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })


    if (wallCollision || selfCollision) {
        alert('você perdeu')
    }

}

const gameLoop = () => {
    ctx.clearRect(0, 0, 600, 600)
    drawSnake()
    drawGrid()
    moveSnake()
    drawFood()
    checkEat()
    checkCollision()
    setTimeout(() => {
        gameLoop()
    }, 200)
}

gameLoop()


document.addEventListener("keydown", ({key}) =>  {
    if (key == "ArrowRight" && direction != 'left') {
        direction = "right"
    }else if (key == "ArrowLeft" && direction != 'right') {
        direction = "left"
    }else if (key == "ArrowUp" && direction != 'down') {
        direction = "up"
    }else if(key == "ArrowDown" && direction != 'up') {
        direction = "down"
    }
})