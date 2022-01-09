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
let brickRowCount = 2
let brickWidth = 100
let brickHeight = 20
let brickPadding = 5
let brickOffsetTop = 10
let brickOffsetLeft = 30
let bricks = []
let brickColumnCount = 4
let interval = setInterval(draw, 10)
let score = 0
let lives = 3
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, Y: 0, status: 1}
    }
}
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
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
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
    collisionDetection()
    drawLives()
    x += dx;
    y += dy;
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            lives--
            if (!lives) {
                alert('GAME OVER')
                document.location.reload()
                clearInterval(interval)
            } else {
                dy = -dy
            }
            // alert("GAME OVER")

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
document.addEventListener('mousemove', mouseMoveHandler, false)
function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft
    let relativeY = e.clientY - canvas.offsetTop
    //only move paddle if mouse is inside canvas
    if(relativeX > 0 && relativeX < canvas.width && relativeY < canvas.height && relativeY > 0) {
        paddleX = relativeX - paddleWidth/2
    }
}
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
function collisionDetection(){
    for(let c =0; c < brickColumnCount;c++) {
        for (let r = 0; r < brickRowCount;r++) {
            let b = bricks[c][r]
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y+brickHeight&&b.status == 1) {
                dy = -dy
                b.status = 0
                score += 1
                color = randomColor()
                if (score == brickRowCount * brickColumnCount) {
                    alert('YOU WIN!')
                    document.location.reload()
                    clearInterval(interval)
                }
            }
        }
    }
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" +score,canvas.width - 100,canvas.height - 50);
}
function drawLives(){
    ctx.font = "16px Arial"
    ctx.fillStyle = '#696969'
    ctx.fillText(`Lives: ${lives}`, canvas.width - 100,canvas.height - 20)
}
function random(num){
    return Math.floor(Math.random() * num)
}
function randomColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`
}

