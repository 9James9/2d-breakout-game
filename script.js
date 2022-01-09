let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let x = canvas.width/2
let y = canvas.height-30
let dx = 2
let dy = -2
let ballRadius = 10
let color = 'black'
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width-paddleWidth) / 2
let rightPressed = false
let leftPressed = false
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    x += dx;
    y += dy;
    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy
        color = randomColor()
    }
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
        color = randomColor()
    }
    if(rightPressed) {
        paddleX += 7
        drawPaddle()
    } else if (leftPressed) {
        paddleX -= 7
        drawPaddle()
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
function keyDownHandler(e) {
    if(e.key == 'right' || e.key == "ArrowRight") {
        rightPressed = true

    } else if (e.key == 'left' || e.key == "ArrowLeft") {
        leftPressed = true
    }
}
function keyUpHandler(e) {
    if(e.key == 'right' || e.key == 'ArrowRight') {
        rightPressed = false
    } else if (e.key == 'left' || e.key == 'ArrowLeft') {
        leftPressed = false
    }
}
setInterval(draw, 10)
function random(num){
    return Math.floor(Math.random() * num)
}
function randomColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`
}

