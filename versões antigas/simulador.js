//DEFINIR A CENA DE ESTATÍSTICA E AJEITAR O HTML PRA A VERSÃO BÁSICA, 


function setup() {
   var canvas = createCanvas(600, 600);
   background(252, 252, 252);
   canvas.parent('canva');
}

var totaldias = 0
var signalEnding = 0;
var movProbability = 1;

startscene();

function startscene(){
	//console.log("startscene");
	draw = function() {
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


function iniciar(){
	//console.log("iniciar");
	signalEnding = 0;
	loop(); // é importante por causa do pause
	init(); 
}

/* função init - recebe variáveis e seta o cronômetro */
	
function init (){
//variáveis a serem inseridas
	var limitPop = 500;	
	var fP = 0.5;
	var selecao11 = 0;
	var selecao12 = 0;
	var selecao22 = 0;
 	var numIndividuos = constrain(parseInt(document.getElementById('numIndividuos1').value), 2, 400);
	var limitPop = constrain(parseInt(document.getElementById('MaxPop').value), 2, 800);
	var fP = constrain(parseFloat(document.getElementById('freqP').value), 0, 1);
	var selecao11 = constrain(parseInt(document.getElementById('selxAA').value), 0, 100);
	var selecao12 = constrain(parseInt(document.getElementById('selxAa').value), 0, 100);
	var selecao22 = constrain(parseInt(document.getElementById('selxaa').value), 0, 100);
	if (isNaN(numIndividuos) === true) {console.log(numIndividuos); numIndividuos = 100;}
	if (isNaN(limitPop) === true) {limitPop = 300;}
	if (isNaN(fP) === true) {fP = 0.5;}
	if (isNaN(selecao11) === true) {selecao11 = 0;}
	if (isNaN(selecao12) === true) {selecao12 = 0;}
	if (isNaN(selecao22) === true) {selecao22 = 0;}
	// variáveis básicas
	let larguraSet = 600;
	let alturaSet = larguraSet;
	var numRemovidos = 0; 
	var numMortos = 0; 
	var limitMovement = 3;
	var socialDistance = 0;
	var saudaveis = [];
	var time = 0;
	var homozigotos11 = 0;
	var heterozigotos = 0;
	var homozigotos22 = 0;
	var fPini = fP;



	
	//var fatorCrescimento = 0;


/*-----------------Função Pause e Parar ------------*/
	var pause = -1;	
	var varStop = document.getElementById("abort");
	varStop.addEventListener("click",parar);
	
	function parar(){
		console.log("parar");
		signalEnding = 1;
	}


	var varPause = document.getElementById("pause");
	varPause.addEventListener("click",pausar);

	function pausar(){
		console.log("pausar");
		pause = pause * -1;
	    if (pause === 1){noLoop();}
	    else {loop();}
	}	

/*-----------------Função Iniciar Simulação ------------*/

	draw = function() {
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


	mouseClicked = function() {
	    if (mouseX >= 248 && mouseX <= 355 & mouseY >= 290 && mouseY <=315 && time === 0){time = 0;startTime();}
	};

	function startTime (){ 
		console.log("startTime"); 
		startSim();
	}
	
	var ProbP = fP*100;

/* -----------------------------------Cria a Classe para os Indivíduos--------------------------------------------- */
	class Individuo {
		constructor(){
		ProbP = fP*100;
		var setAlelo1 = floor(random(1,101));
		var setAlelo2 = floor(random(1,101));
		if (setAlelo1 <= ProbP) {this.alelo1 = 1;}; 
	    if (setAlelo1 > ProbP) {this.alelo1 = 2;};
	    if (setAlelo2 <= ProbP) {this.alelo2 = 1;}; 
	    if (setAlelo2 > ProbP) {this.alelo2 = 2;};
	    if(this.alelo1 === 1 && this.alelo2 === 1){homozigotos11++;}
		if(this.alelo1 === 2 && this.alelo2 === 2){homozigotos22++;}
		if(this.alelo1 != this.alelo2){heterozigotos++;}
		this.positionx = random(15, larguraSet - 20);
		this.positiony = random(25, alturaSet - 20);
		this.velocityx = cos(millis()/limitMovement)
		this.velocityy = cos(millis()/limitMovement)
		this.infectado = false;
	    this.diazero = false;
	    this.color = 0;
	    this.size = 5;
	    this.idade = 0;
		this.tempoExtra = floor(random (-9, 11)); //determina o número de gerações que o animal vive a menos ou a mais que o valor base.
		}

		update () {
	    this.positionx = this.positionx + this.velocityx;
	    this.positiony = this.positiony + this.velocityy;
	   	}

	   	localizar(){
	   		var posicaoX = this.positionx;
	   		var posicaoY = this.positiony;
	   		//depois criar vetor vai ajudar a dividir em mais áreas.
	   		return posicaoY;
	   	}

		envelhecer () {
		this.idade++;
		}

		tempoextra (){
		var tempoIncr = this.tempoExtra;
		return tempoIncr;
		}

		verDominancia (){
		var dominancias = 0;
		if(this.alelo1 === 1 && this.alelo2 === 1){dominancias = 11;}
		if(this.alelo1 === 2 && this.alelo2 === 2){dominancias = 22;}
		if(this.alelo1 != this.alelo2){dominancias = 12;}
		return dominancias;
		}
	
		display () {
			if(this.alelo1 === 1 && this.alelo2 === 1){this.color = 252; stroke(252,0,0)}
			if(this.alelo1 === 2 && this.alelo2 === 2){this.color = 0; stroke(0,0,0)}
			if(this.alelo1 != this.alelo2){this.color = 252; stroke(0,0,0);}
	 		fill(this.color, 0, 0);
	  		ellipse(this.positionx, this.positiony, this.size, this.size);
		}

		calculateDistance(other) {
		let d = dist(this.positionx, this.positiony, other.positionx, other.positiony);
	    return d;
		}

		veridade () {
	    	var idadeInd = this.idade;
	    	return idadeInd;
		}

		reproduzir(outro, alelo1, alelo2){
			var alelo1Rep = 23;
			var alelo2Rep = 53;
			var aleloP1 = floor(random(0,2));
			var aleloP2 = floor(random(0,2));
			if (aleloP1 === 0) {alelo1Rep = this.alelo1}; 
	    	if (aleloP1 === 1) {alelo1Rep = this.alelo2};
	    	if (aleloP2 === 0) {alelo2Rep = outro.alelo1}; 
	    	if (aleloP2 === 1) {alelo2Rep = outro.alelo2};
	    	var genotipo = createVector(alelo1Rep, alelo2Rep)
			return genotipo;
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
	    	this.velocityx = (cos(millis()) + floor(random(-2, 3)))/limitMovement;
	    	this.velocityy = (cos(millis())+ floor(random(-2, 3)))/limitMovement;
		}


	}

	for (var i = 0; i < numIndividuos; i++) {
	saudaveis[i] = new Individuo(); 
	}
	
/* -----------------------------------Estatística Final--------------------------------------------- */

	function endscene(){
    	draw = function() {
	      	background(255, 255, 255); 
	      	noStroke();
			textSize(20);
	      	fill(155, 155, 155);
	      	rect(0, 0, 599, 599);
	      	fill(0, 0, 0);
            noStroke();
	      	text("Simulação Finalizada", 199, 30);
	      	text("Estatísticas", 245, 160);
	      	textSize(18);
	      	text("Configurações", 110, 230);
	      	textSize(12);
	      	text("Número de Pessoas", 110, 245);
	      	text(numIndividuos, 240, 245);
	      	text("Limite Populacional", 110, 260);
	      	text(limitPop, 240, 260);
	      	text("f(p) inicial", 110, 275);
		    text(fPini, 240, 275);
		    text("Seleção contra AA", 110, 290);
		    text(selecao11, 240, 290);
		    text("Seleção contra Aa", 110, 305);
		    text(selecao12, 240, 305);
		    text("Seleção contra aa", 110, 320);
		    text(selecao22, 240, 320);
		    textSize(18);
		    text("Resultados", 335, 230);
		    textSize(12);
		    text("f(p)", 335, 245);
		    text(round(fP,2), 425, 245);
		    text("f(q)", 335, 260);
		    text(round(1-fP, 2), 425, 260);
		    text("Nº de Gerações", 335, 275);
		    text(totaldias, 425, 275);
		};
	}

/* -----------------------------------Função do movimento--------------------------------------------- */
	function startSim () {
		var totalnormal = saudaveis.length;
			function calcFreq (){
			var fH11 = homozigotos11;
			var fHet = heterozigotos;
			fP = (((2*fH11) + fHet)/(saudaveis.length*2)); 
			//console.log(fP);
		}

        var areaSelecaoY = alturaSet/2;

// seleção natural sem área
			function selecaoNatural (){
					for (var i = 0; i < saudaveis.length; i++) {
					var probMorrer = floor(random(0,101));
					var dominancias = saudaveis[i].verDominancia(saudaveis[i]);
					if (dominancias === 11 && probMorrer < selecao11) {saudaveis.splice(i,1); homozigotos11--;};
					if (dominancias === 12 && probMorrer < selecao12) {saudaveis.splice(i,1); heterozigotos--;};
					if (dominancias === 22 && probMorrer < selecao22) {saudaveis.splice(i,1); homozigotos22--;};
				}
			}
/* Funciona mas deixa mto lento
			function selecaoNatural (){
				for (var i = 0; i < saudaveis.length; i++) {
					var posicaoY = saudaveis[i].localizar(saudaveis[i]);
					if (posicaoY <= areaSelecaoY) {
						var probMorrer = floor(random(0,101));
						var dominancias = saudaveis[i].verDominancia(saudaveis[i]);
						if (dominancias === 11 && probMorrer < selecao11) {saudaveis.splice(i,1); homozigotos11--;};
						if (dominancias === 12 && probMorrer < selecao12) {saudaveis.splice(i,1); heterozigotos--;};
						if (dominancias === 22 && probMorrer < selecao22) {saudaveis.splice(i,1); homozigotos22--;};
								
							
						}
					}
				}
*/
			function controlePop(){
				if(saudaveis.length > limitPop){
				for (var i = 0; i < totalnormal - limitPop; i++){
					saudaveis.splice(i, 1);
						if (genotipo.x != genotipo.y) {heterozigotos--};
						if (genotipo.x === genotipo.y && genotipo.x === 1) {homozigotos11--};
						if (genotipo.x === genotipo.y && genotipo.x === 2) {homozigotos22--};
					}
				}
			}

			/* --- FUNÇÃO INUTIL (''SÓ PRA CENARIO DE PANMIXIA ESTRITA'')
			function crescimento(){
				fatorCrescimento = saudaveis.length*0.4;
				if(fatorCrescimento < limitPop - totalnormal) {
					calcFreq ();
					for (var i = 0; i < (fatorCrescimento); i++) {saudaveis.push(new Individuo); totalnormal++; }
				} 
				else {
					calcFreq ();
					for (var i = 0; i < (fatorCrescimento/2) && totalnormal < limitPop; i++) {saudaveis.push(new Individuo); totalnormal++;}
				} 

				if(totalnormal > limitPop){
					for (var i = 0; i < totalnormal - limitPop; i++){saudaveis.splice(i, 1); totalnormal--}}
			}
		*/

			function envelhecimento(){
				calcFreq ();
				for (var i = 0; i < saudaveis.length; i++){saudaveis[i].envelhecer();}
			}	
        
            function move(){
                for (var i = 0; i < saudaveis.length; i++){
                    let sort = floor(random(0,4));
                    if (movProbability == sort){saudaveis[i].mov();}
                 }
                
			}
        
		setInterval(function(){{if(pause === -1) {time++}}; envelhecimento(); selecaoNatural();}, 1000);
		setInterval(function(){move();}, 1600);
		
		function calcTotalDias (){totaldias = time;} 
		draw = function() {
			controlePop();
			totalnormal = saudaveis.length;
		    background(255, 255, 255);
		    fill(255,255,255);
		    stroke(255, 0, 0);
		    rect(1, 15, larguraSet -2, alturaSet - 18); 
		    fill(0, 0, 0);
		    noStroke();
		    textSize(13);
		    text("Indivíduos",2, 12);
		    text(totalnormal+"|",68, 12);
		    text("AA",100, 12);
		    text(homozigotos11,125, 12);
		    text("Aa",150, 12);
		    text(heterozigotos,170, 12);
		    text("aa",200, 12);
		    text(homozigotos22,220, 12);
		    text("f(p).",390, 12);
		    text(round(fP, 2),415, 12);
		    text("f(q)",450, 12);
		    text(round((1-fP), 2),475, 12);
		    text("Geração",520, 12);
		    text(time, 579, 12);
		    if (signalEnding === 1) {calcTotalDias(); endscene();} //sinaliza on off por meio do botão abortar
		    
/* -----------------------------------Função chamar estatística final--------------------------------------------- 	*/	    
		   // if (time > 50 && fP === 1 || time > 50 && fP === 0) {calcTotalDias(); endscene();} 
			


/* ----------------------------------- Morte por idade --------------------------------------------- 		 */	

			 //tem q ter um loop unico pro splice
		    for (var i = 0; i < saudaveis.length; i++){
		        var idadeInd = saudaveis[i].veridade(saudaveis[i]);
		        var tempoIncr = saudaveis[i].tempoextra(saudaveis[i]);
		        //var vaimorrer = random(-1, 1);
		        if (idadeInd === 10+tempoIncr){
		        	var dominancias = saudaveis[i].verDominancia(saudaveis[i]);
		        	saudaveis.splice(i, 1);
	        		if (dominancias === 11) {homozigotos11--; /*console.log(homozigotos11 + "pau");*/};
					if (dominancias === 12) {heterozigotos--};
					if (dominancias === 22) {homozigotos22--};
					totalnormal = saudaveis.length;
					//totalnormal = homozigotos11 + homozigotos22 + heterozigotos;
	      		}
			}
	


			
/* -----------------------------------Calcula distância entre individuos--------------------------------------------- */		    
		    for (var i = 0; i < saudaveis.length; i++) {
		        saudaveis[i].update();
		        //saudaveis[i].mov();
		        saudaveis[i].checkEdges();
		        saudaveis[i].display();

		        if (saudaveis.length < limitPop) {
		            for (var j = 0; j < saudaveis.length; j++) {
		                if (i !== j) {
		                    var distanceRep = saudaveis[j].calculateDistance(saudaveis[i]);
		                    var genotipo = saudaveis[j].reproduzir(saudaveis[i]);
		                    if (distanceRep <= 3) {
		                        if (saudaveis.length < limitPop) {
		                            saudaveis.push(new Individuo(genotipo.x, genotipo.y));
		                            controlePop();
		                        }
		                    }
		                }

		            }
		        }
		    }
		
           	

		}; //draw

	}; //starsim
	
}; //init



/*	TEM QUE MODIFICAR PRO SIMULADOR

*/