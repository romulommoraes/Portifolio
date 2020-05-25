function setup() {
	var canvas = createCanvas(600, 600);
	background(252, 252, 252);
	canvas.parent('canvas');
}

var totaldias = 0;
var signalEnding = 1;
var movProbability = 1;
let larguraSet = 600;
let alturaSet = larguraSet;
var graphSus = [];
var graphInf = [];
var graphRem = [];
var graphMor = [];
var graphTime = [];
var infectados = 0;

startscene();

function startscene() {
	//console.log("startscene");
	draw = function () {
		background(252, 252, 252);
		textSize(20);
		fill(252, 252, 252);
		rect(0, 0, 600, 600);
		fill(0, 0, 0);
		text("Rômulo Maciel de Moraes Filho", 158, 285);
		text("Análise e Desenvolvimento de Sistemas", 116, 310);
		text("Faculdade Imaculada Conceição do Recife", 110, 435);
	};
}

var simular = document.getElementById("Alterar");
simular.addEventListener("click", iniciar);


function iniciar() {
	if (signalEnding == 1) {

		signalEnding = 0;
		loop();
		init();
	}
}



function init() {
	//console.log("init");
	var time = 0;

	var numIndividuos = parseInt(document.getElementById('numIndividuos1').value);
	var socialDistance = parseInt(document.getElementById('socialDistance1').value);
	var limitMovement = parseInt(document.getElementById('limitMovement1').value);
	var virulencia = parseInt(document.getElementById('virulencia1').value);
	var mortalidade = parseInt(document.getElementById('mortalidade1').value);
	var diasRemocao = parseInt(document.getElementById('diasRemocao1').value);
	if (isNaN(numIndividuos) === true) {
		console.log(numIndividuos);
		numIndividuos = 100;
	}
	if (isNaN(socialDistance) === true) {
		socialDistance = 0;
	}
	if (isNaN(limitMovement) === true) {
		limitMovement = 3;
	}
	if (isNaN(movProbability) === true) {
		movProbability = 1;
	}
	if (isNaN(virulencia) === true) {
		virulencia = 75;
	}
	if (isNaN(mortalidade) === true) {
		mortalidade = 5;
	}
	if (isNaN(diasRemocao) === true) {
		diasRemocao = 10;
	}


	var pause = -1;
	var varStop = document.getElementById("abort");
	varStop.addEventListener("click", parar);

	function parar() {
		//console.log("parar");
		signalEnding = 1;
		pause = 1;
	}


	var varPause = document.getElementById("pause");
	varPause.addEventListener("click", pausar);

	function pausar() {
		//console.log("pausar");
		pause = pause * -1;
		if (pause === 1) {
			noLoop();
		} else {
			loop();
		}
	}

	draw = function () {
		background(252, 252, 252);
		textSize(20);
		stroke(0, 0, 0);
		fill(255, 255, 255);
		rect(0, 0, 600, 600);
		fill(252, 0, 0);
		rect(250, 290, 95, 25);
		fill(0, 0, 0);
		noStroke();
		text("INICIAR", 262, 310);
	
	};



	mouseClicked = function () {
		if (mouseX >= 248 && mouseX <= 355 & mouseY >= 290 && mouseY <= 315 && time === 0) {
			time = 0;
			startTime();
		}
	};

	function startTime() {
		graphTime.splice(0, graphTime.length);
		//console.log(graphTime.length);
		graphSus.splice(0, graphSus.length);
		graphRem.splice(0, graphRem.length);
		graphMor.splice(0, graphMor.length);
		graphInf.splice(0, graphInf.length);
		criarGrafLinha2();
		startSim();
	}

	var movProbability = 1;
	var numRemovidos = 0;
	var numMortos = 0;
	var totalnormal = numIndividuos;
	var saudaveis = [];

	function criarGrafLinha2() {
		var ctxLine = document.getElementById('graficow').getContext('2d');
		var chartLine = new Chart(ctxLine, {
			type: 'line',

			data: {
				labels: graphTime,
				datasets: [{
						label: 'Suscetiveis',
						backgroundColor: 'rgb(0, 0, 250)',
						borderColor: 'rgb(0, 0, 250)',
						fill: false,
						lineTension: 0,
						data: graphSus,
						borderWidth: 1,
						pointRadius: 2

					},
					{
						label: 'Infectados',
						backgroundColor: 'rgb(250, 0, 0)',
						borderColor: 'rgb(250, 0, 0)',
						fill: false,
						lineTension: 0,
						data: graphInf,
						borderWidth: 1,
						pointRadius: 2
					},
					{
						label: 'Mortos',
						backgroundColor: 'rgb(0, 0, 0)',
						borderColor: 'rgb(0, 0, 0)',
						fill: false,
						lineTension: 0,
						data: graphMor,
						borderWidth: 1,
						pointRadius: 2
					},
					{
						label: 'Removidos',
						backgroundColor: 'rgb(150, 0, 150)',
						borderColor: 'rgb(150, 0, 150)',
						fill: false,
						lineTension: 0,
						data: graphRem,
						borderWidth: 1,
						pointRadius: 2
					}

				],


			},

			options: {
				scales: {
					xAxes: [{
						ticks: {
							fontSize: 8
						}
					}],
					yAxes: [{
						display: true,
						ticks: {
							beginAtZero: true,
							steps: 50,
							fontSize: 8,


							max: numIndividuos
						}
					}]
				},
			}
		});

	}

	class Individuo {
		constructor() {
			this.positionx = random(15, larguraSet - 20);
			this.positiony = random(25, alturaSet - 20);
			this.velocityx = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
			this.velocityy = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
			this.infectado = false;
			this.diazero = false;
			this.colorA = 252;
			this.colorV = 0;
			this.size = 4;
		}

		update() {
			this.positionx = this.positionx + this.velocityx;
			this.positiony = this.positiony + this.velocityy;
		}

		display() {
			noStroke();
			fill(this.colorV, 0, this.colorA);
			ellipse(this.positionx, this.positiony, this.size, this.size);
		}

		calculateDistance(other) {
			let d = dist(this.positionx, this.positiony, other.positionx, other.positiony);
			return d;
		}

		infect() {
			if (this.infectado === false) {
				totalnormal--;
				this.colorV = 252;
				this.colorA = 0;
				this.diazero = floor(millis() / 1000);
				this.infectado = true;
			}
		}

		calctempoinf(mover, i) {
			var diazero = this.diazero;
			return diazero;
		}

		verestado(mover, i) {
			var estado = this.infectado;
			return estado;
		}

		applyForce() {
			this.velocityx = this.velocityx * -0.90;
			this.velocityy = this.velocityy * -0.90;
			//this.velocityx = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
			//this.velocityy = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
			
		}

		//cria repulsão dos individuos em relação às paredes
		checkEdges() {
			if ((this.positionx > larguraSet - 5) || (this.positionx < 5)) {
				this.velocityx = this.velocityx * -1;
			}
			if ((this.positiony > alturaSet - 5) || (this.positiony < 18)) {
				this.velocityy = this.velocityy * -1;
			}
		}

		mov() {
			this.velocityx = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
			this.velocityy = (cos(millis()) + floor(random(-1, 2))) / limitMovement;
		}


	}
	for (var i = 0; i < numIndividuos; i++) {
		saudaveis[i] = new Individuo();
	}





	function endscene() {
		criarGrafLinha2();
		draw = function () {
			infectados = numIndividuos - totalnormal;
			background(255, 255, 255);
			textSize(20);
			fill(255, 255, 255);
			rect(0, 0, 599, 599);
			fill(0, 0, 0);
			text("Simulação Finalizada", 99, 30);
			text("Estatísticas", 145, 160);
			textSize(15);
			text("Configurações", 10, 230);
			textSize(9);
			text("Número de Pessoas", 10, 245);
			text(numIndividuos, 105, 245);
			text("Distância Social", 10, 255);
			text(socialDistance, 105, 255);
			text("Movimentação", 10, 266);
			text(limitMovement, 105, 266);
			text("Virulência", 10, 277);
			text(virulencia, 105, 277);
			text("Mortalidade", 10, 288);
			text(mortalidade, 105, 288);
			text("Dias até Remoção", 10, 299);
			text(diasRemocao, 105, 299);
			textSize(15);
			text("Resultados", 155, 230);
			textSize(9);
			text("Número de Removidos", 155, 245);
			text(numRemovidos, 253, 245);
			text("Número de Mortos", 155, 255);
			text(numMortos, 253, 255);
			text("Não infectados", 155, 266);
			text(totalnormal, 253, 266);
			text("Infectados", 155, 277);
			text(infectados, 253, 277);
			text("Dias simulados", 155, 288);
			text(totaldias, 253, 288);
		};

	}

	function startSim() {
		//totalnormal = saudaveis.length;
		setInterval(function () {
			if (pause === -1) {
				time++;
				move();

				graphTime.push(time);
				graphSus.push(totalnormal);
				graphRem.push(numRemovidos);
				graphInf.push(numIndividuos - totalnormal - numRemovidos);
				graphMor.push(numMortos);
			}
		}, 1000);

		setInterval(function () {
			if (pause === -1) {
				distInfect();
			}
		}, 100);
	
		if (socialDistance > 0) {

		setInterval(function () {
			if (pause === -1) {
				distanciaSocial();
			}
		}, 250);

	}

		setInterval(function () {
			if (pause === -1) {
				if (time >= diasRemocao) {
					remove();
				}
			}
		}, 1000);

		function calcTotalDias() {
			totaldias = time;
		}

		function move() {
			if (pause === -1) {
				for (var i = 0; i < saudaveis.length; i++) {
					let sort = floor(random(4));
					if (1 == sort) {
						saudaveis[i].mov();
					}

				}
			}

		}

		function remove() {
			for (var i = 0; i < saudaveis.length; i++) {
				var estado = saudaveis[i].verestado(saudaveis[i]);
				var diazero = saudaveis[i].calctempoinf(saudaveis[i]);
				if (floor(millis() / 1000) - floor(diazero) >= diasRemocao && estado === true) {
					saudaveis.splice(i, 1);
					numRemovidos++;
					var morts = floor(random(0, 100));
					if (morts <= mortalidade) {
						numMortos++;
					}
				}
			}
		}

		function distInfect() {
			for (var i = 0; i < saudaveis.length; i++) {
				var estado = saudaveis[i].verestado(saudaveis[i]);
				if (estado === true) { // garante que os outros loops só aconteçam caso o individuos esteja infectado
					//console.log(estado);
					for (var j = 0; j < saudaveis.length; j++) {
						if (i != j) {
							var distance = saudaveis[j].calculateDistance(saudaveis[i]);
							var est = saudaveis[j].verestado(saudaveis[i]); // garante que a função de infecção so seja chamada se o alvo nao estiver infectado
							//console.log(est);
							var distInfec = floor(random(0, 13));
							//infecção
							var infects = floor(random(0, 100));
							if (distance <= distInfec && est === false && infects < virulencia) { 
								saudaveis[j].infect();
								//console.log(distance);
							}
						}
					}
				}
			}
		}

function distanciaSocial() {
	var len = saudaveis.length;
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < saudaveis.length; j++) {
			if (i != j) {
				var distance = saudaveis[j].calculateDistance(saudaveis[i]);
				
					//distancia social
					//distance = saudaveis[j].calculateDistance(saudaveis[i]);
					if (distance <= socialDistance) {
						saudaveis[i].applyForce();
					}
				
			}
		}
	}
}

		draw = function () {
			background(255, 255, 255);
			fill(255, 255, 255);
			stroke(255, 0, 0);
			rect(1, 15, 598, 582);
			fill(0, 0, 0);
			noStroke();
			textSize(11);
			text("Saudáveis", 2, 12);
			text(totalnormal + "|", 58, 12);
			text("Mortos", 233, 12);
			text(numMortos + "|", 269, 12);
			text("Infectados", 82, 12);
			text(numIndividuos - totalnormal + "|", 135, 12);
			text("Removidos", 156, 12);
			text(numRemovidos + "|", 213, 12);
			text("Dist.", 289, 12);
			text(socialDistance + "|", 312, 12);
			text("Mov", 325, 12);
			text(limitMovement + "|", 347, 12);
			text("Dia", 360, 12);
			text(time, 379, 12); // timer
			if (time === 1) {
				saudaveis[0].infect();
			}
			if (time === 130 || numIndividuos - totalnormal - numRemovidos === 0 && time > 0) {
				parar();
			} //DEFINE O NUMERO DE DIAS MAXIMO DA SIMULAÇÃO - MEXER AQUIII
			if (signalEnding === 1) {
				calcTotalDias();
				endscene();
	
			} //sinaliza on off por meio do botão abortar
			//tem q ter um loop unico pro splice

			var len = saudaveis.length;
			for (var i = 0; i < len; i++) {

				saudaveis[i].update();
				saudaveis[i].checkEdges();
				saudaveis[i].display();


			}
		};

	}

}