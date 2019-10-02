var p1y = p2y = 40; //posição inicial em y
var pt = 10; //largura das barrinhas
var ph = 100; // altura das barrinhas
var bx = by = 50; //posição inicial da bolinha
var bd = 6; //dimensão da bolinha
var xv = yv = 4; //velocidade nos eixos x e y
var score1 = score2 = 0; //pontuação
var aiv = 2; //velocidade da inteligencia artificial
var canvas = document.getElementById('canvas');
var game = document.querySelector('.game');
var body = document.querySelector('body');
var cc = canvas.getContext('2d');

window.onload = function(){
	canvas.width = game.offsetWidth; //coloca a largura da div .game
	canvas.height = game.offsetHeight; //coloca a altura da div .game

	body.addEventListener('mousemove', function(event){
		p1y = event.clientY - ph / 2; //50
	})
	
	setInterval(update, 1000/30); // chama a função 30 frames por segundo
}

function update(){
	bx += xv;
	by += yv;
	//o trecho acima faz a bolinha se mover

	//abaixo vamos verificar as limitações

	if(by < 0 && yv <0){
		yv = -yv;
	}

	if(by > canvas.height && yv > 0){
		yv = -yv;
	}

	if(bx < 0){
		if(by > p1y && by < p1y + ph){
			xv = -xv;
			var dy = by - (p1y + ph / 2);

			yv = dy * 0.3;
		} else {
			score2++;
			reset();
		}
	}

	if(bx > canvas.width){
		if(by > p2y && by < p2y + ph){
			xv = -xv;
			var dy = by - (p2y + ph / 2)

			yv = dy * 0.3;
		} else {
			score1++;
			reset();
		}
	}

	if(p2y + ph / 2 < by){
		p2y += aiv;
	} else{
		p2y -= aiv;
	}

	//desenha o quadro geral

	cc.fillStyle = '#222';
	cc.fillRect(0,0, canvas.width, canvas.height); //background do jogo
	cc.fillStyle = 'white';
	cc.fillRect(0, p1y, pt, ph); //player1
	cc.fillRect(canvas.width - pt, p2y, pt, ph); //player2
	cc.fillRect(bx - bd / 2, by - bd / 2, bd, bd); //bolinha
	cc.fillText(score1, 100, 100); //desenha pontos player1
	cc.fillText(score2, canvas.width - 100, 100); //desenha pontos player2
}


function reset(){
	bx = canvas.width / 2;
	by = canvas.height / 2;
	xv = -xv;
	yv = 3;
}