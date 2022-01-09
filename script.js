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
let brickRowCount = 4

let brickWidth = 50
let brickHeight = 20
let brickPadding = 5
let brickOffsetTop = 30
let brickOffsetLeft = 30
let bricks = []
let brickColumnCount = 7
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, Y: 0}
    }
}
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = (c*(brickWidth + brickPadding))+brickOffsetLeft
            let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath()
            ctx.rect(brickX,brickY,brickWidth,brickHeight)
            ctx.fillStyle = 'red'
            ctx.fill()
            ctx.closePath()
        }
    }
}
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawBricks()
    x += dx;
    y += dy;
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            // alert("GAME OVER")
            document.location.reload()
            clearInterval(interval)
        }

    }
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
        color = randomColor()
    }
    if(rightPressed) {
        paddleX += 7
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
        }
    } else if (leftPressed) {
        paddleX -= 7
        if (paddleX < 0) {
            paddleX = 0
        }
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
let interval = setInterval(draw, 10)
function random(num){
    return Math.floor(Math.random() * num)
}
function randomColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`
}

