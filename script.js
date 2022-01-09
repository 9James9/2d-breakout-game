let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
let x = canvas.width/2
let y = canvas.height-30
let dx = 2
let dy = -2
let ballRadius = 10
let color = 'black'
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall()
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
}function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
setInterval(draw, 10)
function random(num){
    return Math.floor(Math.random() * num)
}
function randomColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`
}
