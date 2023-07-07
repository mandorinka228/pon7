let canvas = document.getElementById("canv")
let dim = canvas.getContext("2d")

let bg = new Image();
let bird = new Image();
let fg = new Image();
let heart = new Image();
let pipeB = new Image();
let pipeU = new Image();

bg.src = "../img/bg.png"
fg.src = "../img/fg.png"
bird.src = "../img/bird.png"

pipeB.src = "../img/pipeB.png"
pipeU.src = "../img/pipeU.png"

let fly = new Audio ()
let count = new Audio ()

fly.src = "/audio/fly.mp3"
count.src = "/audio/score.mp3"

let pipe = []
pipe[0] = {
	x: canvas.width, y: 0
}
let birdX = 15;
let birdY = 150;
let gap = 125;
let gravity = 1.1;
document.addEventListener( "keydown", moveUp)
function moveUp()
{
	birdY -= 45
	fly.play()
}
let score = 0;
function draw()
{
	dim.drawImage(bg,0,0)
	for(let i=0; i<pipe.length; i++)
	{
		dim.drawImage(pipeU, pipe[i].x,pipe[i].y)
		dim.drawImage(pipeB, pipe[i].x,pipe[i].y + pipeU.height+gap)
		pipe[i].x--;
	if(pipe[i].x == 90)
	{
		pipe.push(
				{
					x:canvas.width,
					y:Math.floor( Math.random() * pipeU.height ) - pipeU.height
				}
			)
	}
	if( birdX + bird.width >= pipe[i].x
		&& birdX <= pipe[i].x + pipeU.width
		&& (birdY <= pipe[i].y + pipeU.height
				|| birdY + bird.height >= pipe[i].y + pipeU.height + gap
			)
			|| birdY + bird.height >= canvas.height - fg.height
		)
		{
			location.reload()
		}
	if(pipe[i].x == 5)
	{
		score++
		count.play()
	}
	}
	if(birdY<=0)
	{
		location.reload()
	}
dim.drawImage(bird, birdX, birdY)
dim.drawImage(fg,0,canvas.height - fg.height)
birdY += gravity
dim.fillStyle="#000"
dim.font="24px Arial"
dim.fillText("Счет:"+score,10,canvas.height-20)
requestAnimationFrame(draw)
}
pipeB.onload = draw