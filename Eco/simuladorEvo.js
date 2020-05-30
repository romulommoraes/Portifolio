function setup() {
    var canvas = createCanvas(600, 600);
    background(252, 252, 252);
    canvas.parent('canva');
}


var idadeReprodutiva = 3;
var longevidadeZoo = 4;
var pontos = 18;

var zooPop;
var fitoPop;
var limiteAmbiental;

var movProbability = 3;
var duracaoSim;
var mutacaoTx;

// variaveis pra composição populacional
var range;
var range1 = 2;
var range2 = 6;
var timer1;
var timer2;
var timer3;
var timer4;
var timer5;


var chartLine = null;
var chartLine2 = null;


var totaldias = 0;
var signalEnding = 1;
var pause = -1;




var varPause = document.getElementById("pause");
varPause.addEventListener("click", pausar);

function pausar() {
    //console.log("pausar");
    if (pause === -1) {
        pause = 1;
        noLoop();
    } else {
        pause = -1;
        loop();
    }
}



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
        //console.log("iniciar");
        signalEnding = 0;
        loop(); // é importante por causa do pause
        init();
    }
}

/* função init - recebe variáveis e seta o cronômetro */

function init() {
    var numTam2 = 0;
    var numTam3 = 0;
    var numTam4 = 0;
    var numTam5 = 0;
    var numZoo = 0;

    var arrayincr = floor(random(0, 14)); // seta ponto aleatorio pra o começo da curva de recursos

    limiteAmbiental = constrain(parseInt(document.getElementById('limitAm').value), 2, 600);
    zooPop = constrain(parseInt(document.getElementById('zooPop').value), 0, 500);
    fitoPop = constrain(parseInt(document.getElementById('fitoPop').value), 2, 600);

    //     pontos = constrain(parseInt(document.getElementById('pontos').value), 5, 45); TAMBÉM DESNECESSÁRIO

    duracaoSim = constrain(parseInt(document.getElementById('long').value), 1, 250); //DESNECESSARIO

    mutacaoTx = parseInt(document.getElementById('mutacaoTx').value); // ADICIONAR TAXA MUTACIONAL AQUI
    range = parseInt(document.getElementById('range').value);

    if (isNaN(fitoPop) === true) {
        fitoPop = 500;
    }
    if (isNaN(limiteAmbiental) === true) {
        limiteAmbiental = fitoPop;
    }

    if (isNaN(zooPop) === true) {

        zooPop = (fitoPop / 5);
    }

    if (isNaN(duracaoSim) === true) {
        duracaoSim = 250;

    }

    if (isNaN(mutacaoTx) === true) {
        mutacaoTx = false;
    }

    if (isNaN(range) === true || range === 0) {
        range = 0;
        range1 = 2;
        range2 = 6;
    } else if (range === 2) {
        range1 = 2;
        range2 = 2;
    } else if (range === 3) {
        range1 = 3;
        range2 = 3;
    } else if (range === 4) {
        range1 = 4;
        range2 = 4;
    } else if (range === 5) {
        range1 = 5;
        range2 = 5;
    }



    // variáveis básicas
    var larguraSet = 600;
    var alturaSet = larguraSet;


    var planctons = [];
    var zplanctons = [];


    var graphPL2 = [];
    var graphPL3 = [];
    var graphPL4 = [];
    var graphPL5 = [];
    var arrayZoo = [];
    var arrayFito = [];
    var arrayTotal = [];
    var graphTime = [];


    function clearTimer1() {
        console.log("euuuu");
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        clearInterval(timer5);

    }


    /*-----------------Função Pause e Parar ------------*/

    var varStop = document.getElementById("abort");
    varStop.addEventListener("click", parar);

    function parar() {
        //console.log("parar");
        signalEnding = 1;
        pause = 1;
        clearTimer1();
    }

    /*-----------------Função Iniciar Simulação ------------*/

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
        if (mouseX >= 248 && mouseX <= 355 & mouseY >= 290 && mouseY <= 315) {
            pause = -1;
            startTime();
        }
    };

    function startTime() {
        //console.log("startTime");
        if (chartLine != null) {
            chartLine.destroy();
            chartLine2.destroy();
        }
        graphTime.splice(0, graphTime.length);
        graphPL2.splice(0, graphPL2.length);
        graphPL3.splice(0, graphPL3.length);
        graphPL4.splice(0, graphPL4.length);
        graphPL5.splice(0, graphPL5.length);
        arrayTotal.splice(0, arrayTotal.length);
        arrayZoo.splice(0, arrayZoo.length);
        arrayFito.splice(0, arrayFito.length);


        startSim();
    }



    /* -----------------------------------Cria a Classe para os Indivíduos--------------------------------------------- */
    class Plancton {
        constructor(gene, local) {

            this.geneTamanho = gene;
            if (local === false) {
                this.positionx = random(15, larguraSet - 20);
                this.positiony = random(25, alturaSet - 20);
            } else {
                this.positionx = local.x;
                this.positiony = local.y;
            }
            // this.positionx = random(15, larguraSet - 20);
            // this.positiony = random(25, alturaSet - 20);
            this.agilidade = this.geneTamanho * 1.2;
            this.velocityx = (cos(millis()) + floor(random(-2, 3))) / (this.agilidade);
            this.velocityy = (cos(millis()) + floor(random(-2, 3))) / (this.agilidade);
            this.color = 0;

            this.predador = false;
            this.idade = 0;
            this.tempoExtra = (this.geneTamanho) + round(random(-4, 6), 1); //determina o número de gerações que o animal vive a menos ou a mais que o valor base.
            this.killPlanc = false;
            this.size = this.geneTamanho;
            //this.geneVelocidade = 5;
        }

        update() {
            this.positionx = this.positionx + this.velocityx;
            this.positiony = this.positiony + this.velocityy;
        }

        predado() {
            this.killPlanc = true;
            //return this.killPlanc;
        }

        verKill() {
            var podematar = this.killPlanc;
            return podematar;
        }

        envelhecer() {
            this.idade = this.idade + 0.2;
        }

        tempoextra() {
            var tempoIncr = this.tempoExtra;
            return tempoIncr;
        }

        verGenes() {
            var gene = this.geneTamanho;
            return gene;

        }

        display() {
            if (this.predador === true) {
                this.color = 252;
                this.size = 7;
                stroke(120, 20, 0);

            }
            if (this.predador === false) {
                this.color = 0;
                stroke(0, 15, 0);
            }

            fill(this.color, 0, 0, 180);
            ellipse(this.positionx, this.positiony, this.size, this.size);
        }

        calculateDistance(other) {
            var d = dist(this.positionx, this.positiony, other.positionx, other.positiony);
            return d;
        }

        veridade() {
            var idadeInd = this.idade;
            return idadeInd;
        }

        rejuvenescer() {
            if (this.predador === true) {
                this.repContador = 0;
                this.idade = 0;
            } else {
                this.idade = 0;
            }
        }

        reproduzir() {
            var genes = this.geneTamanho;
            if (mutacaoTx === 0) {
                genes = this.geneTamanho;

            } else {
                // console.log("mutei");
                var sortMutacao = floor(random(0, mutacaoTx));
                if (sortMutacao === 0 && this.geneTamanho > 2) {
                    genes = this.geneTamanho - 1;
                    if (genes === 1) {
                        genes = 2;
                    }

                }
                if (sortMutacao === (mutacaoTx - 1) && this.geneTamanho < 5) {
                    genes = this.geneTamanho + 1;
                    if (genes === 6) {
                        genes = 4;
                    }

                }
            }
            //    console.log(genes);
            return genes;
        }

        //cria repulsão dos individuos em relação às paredes
        checkEdges() {
            if ((this.positionx >= larguraSet - 7) || (this.positionx <= 7)) {
                this.velocityx = this.velocityx * -1;
            }
            if ((this.positiony >= alturaSet - 6) || (this.positiony <= 21)) {
                this.velocityy = this.velocityy * -1;
            }
        }


        mov() {
            this.velocityx = (cos(millis()) + floor(random(-2, 3))) / (this.agilidade);
            this.velocityy = (cos(millis()) + floor(random(-2, 3))) / (this.agilidade);
        }

        verSentido() {
            var sentidoPlanc = createVector(this.positionx, this.positiony);
            //var sentidoPlanc = createVector(this.velocityx, this.velocityy);
            return sentidoPlanc;
        }

    }

    class ZooPlancton extends Plancton {
        setPredacao(posicao) {
            this.predador = true;
            this.repContador = 0;
            this.tempoExtra = longevidadeZoo + round(random(-4, 6), 1);
            if (posicao === false) {
                this.positionx = random(20, larguraSet - 25);
                this.positiony = random(25, alturaSet - 25);
            } else {
                this.positionx = posicao.x;
                this.positiony = posicao.y;
            }
            this.agilidade = this.geneTamanho * 0.8;
        }


        reproduzirZoo() {

            //incluir idade reprodutiva
            if (this.repContador >= pontos) {
                var resultado = createVector(this.positionx, this.positiony);
                return resultado;
            } else {
                return false;
            }
        }

        engordar(tamanhoPresa) {
            this.repContador = this.repContador + tamanhoPresa;
        }

        movPredador(sentido) {
            this.positionx = sentido.x;
            this.positiony = sentido.y;
            this.velocityx = (cos(millis()) + floor(random(-2, 3))) / (this.geneTamanho * 1.2);
            this.velocityy = (cos(millis()) + floor(random(-2, 3))) / (this.geneTamanho * 1.2);
        }

    }




    for (var i = 0; i < fitoPop; i++) {
        var size = floor(random(range1, range2));
        planctons[i] = new Plancton(size, false);
        if (size == 2) {
            numTam2++;
        }
        if (size == 3) {
            numTam3++;
        }
        if (size == 4) {
            numTam4++;
        }
        if (size == 5) {
            numTam5++;
        }


    }

    for (var j = 0; j < zooPop; j++) {
        zplanctons[j] = new ZooPlancton(6, false);
        zplanctons[j].setPredacao(false);
        numZoo++;

    }



    /* -----------------------------------Estatística Final--------------------------------------------- */

    function endscene() {

        criarGrafLinha();
        criarGrafLinha2();
        //console.log(numZoo);
        function criarGrafLinha() {
            var ctxLine = document.getElementById('grafico').getContext('2d');
            chartLine = new Chart(ctxLine, {
                type: 'line',

                data: {
                    labels: graphTime,
                    datasets: [{
                            label: 'Zooplancton',
                            backgroundColor: 'rgb(255, 0 , 0)',
                            borderColor: 'rgb(255, 0, 0)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: arrayZoo
                        },
                        {
                            label: 'Fitoplancton',
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderColor: 'rgb(0, 0, 0)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: arrayFito
                        },

                    ],


                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 9
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 50,
                                fontSize: 9,
                                max: 650
                            }
                        }]
                    },
                }
            });


        }

        function criarGrafLinha2() {
            var ctxLine = document.getElementById('graficow').getContext('2d');
            chartLine2 = new Chart(ctxLine, {
                type: 'line',

                data: {
                    labels: graphTime,
                    datasets: [{
                            label: 'T1',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: graphPL2
                        },
                        {
                            label: 'T2',
                            backgroundColor: 'rgb(100, 0, 0)',
                            borderColor: 'rgb(100, 0, 0)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: graphPL3
                        },
                        {
                            label: 'T3',
                            backgroundColor: 'rgb(100, 0, 100)',
                            borderColor: 'rgb(100, 0, 100)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: graphPL4
                        },
                        {
                            label: 'T4',
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderColor: 'rgb(0, 0, 0)',
                            fill: false,
                            lineTension: 0,
                            borderWidth: 1,
                            pointRadius: 1,
                            data: graphPL5
                        }

                    ],


                },

                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 9
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 50,
                                fontSize: 9,
                                max: 650
                            }
                        }]
                    },
                }
            });

        }

        draw = function () {
            background(255, 255, 255);
            noStroke();
            textSize(29);
            fill(255, 255, 155);
            rect(0, 0, 599, 599);
            fill(0, 0, 0);
            noStroke();
            text("Simulação Finalizada", 150, 40);
            textSize(25);
            text("Estatísticas", 215, 90);
            textSize(22);
            text("Configurações", 45, 150);
            textSize(16);
            text("Limite Ambiental", 45, 210);
            text(limiteAmbiental, 230, 210);
            text("Fitoplancton", 45, 230);
            text(fitoPop, 230, 230);
            text("ZooPlancton", 45, 250);
            text(zooPop, 230, 250);
            text("Taxa Mutacional", 45, 270);
            var lgdEstrut;
            var lgdmut;
         
           if (mutacaoTx === 0) {
                lgdmut = "Desabilitada";
            } else if (mutacaoTx === 200) {
                lgdmut = "1/100";
            } else if (mutacaoTx === 1000) {
                lgdmut = "1/500";
            } else if (mutacaoTx === 2000) {
                lgdmut = "1/1000";
            }

            // console.log(range);
            if (range === 0) {
                lgdEstrut = "Randômica";
            } else if (range === 2) {
                lgdEstrut = "100% T1";
            } else if (range === 3) {
                lgdEstrut = "100% T2";
            } else if (range === 4) {
                lgdEstrut = "100% T3";
            } else if (range === 5) {
                lgdEstrut = "100% T4";
            }
            

            text(lgdmut, 230, 270);
            text("Estrutura Populacional", 45, 290);
            text(lgdEstrut, 230, 290);

            textSize(22);
            text("Resultados", 360, 150);
            textSize(16);
            text("Fitoplancton", 360, 230);
            text(round(planctons.length), 495, 230);
            text("Zooplancton", 360, 250);
            text(round(zplanctons.length), 495, 250);
            text("Nº de Gerações", 360, 270);
            text(totaldias, 495, 270);
            text("População T1", 360, 290);
            text(numTam2, 495, 290);
            text("População T2", 360, 310);
            text(numTam3, 495, 310);
            text("População T3", 360, 330);
            text(numTam4, 495, 330);
            text("População T4", 360, 350);
            text(numTam5, 495, 350);
        };
  

    }

    

    /* -----------------------------------Função do movimento--------------------------------------------- */
    function startSim() {
        var time = 0;

        function move(planc) {
            var len = planc.length;
            for (var i = 0; i < len; i++) {
                var sort = floor(random(0, 4));
                if (movProbability == sort) {
                    planc[i].mov();
                }
            }
        }



        function reproduce() {
            var incr = planctons.length;
                for (var i = 0; i < incr; i++) {

                    if (planctons.length < limiteAmbiental) {
                        var genet = planctons[i].reproduzir();
                        var posit = planctons[i].verSentido();
                        var idadePlan = planctons[i].veridade();
                        if (idadePlan >= (floor(genet))) {
                            planctons.push(new Plancton(genet, posit));
                            if (genet === 2) {
                                numTam2++;
                                planctons[i].rejuvenescer();
                            }
                            if (genet === 3) {
                                numTam3++;
                                planctons[i].rejuvenescer();
                            }
                            if (genet === 4) {
                                numTam4++;
                                planctons[i].rejuvenescer();
                            }
                            if (genet === 5) {
                                numTam5++;
                                planctons[i].rejuvenescer();
                            }
                        }
                       
                    }
                   else {break;} // ->>> ADICIONAR ISSO AOS OUTROS LOOPS DE OUTROS SIMULADORES
                }
            }

            function ZooReproduce(local) {
                zplanctons.push(new ZooPlancton(6, false));
                var novo = zplanctons.length - 1;
                zplanctons[novo].setPredacao(local);
                numZoo++;
            }


            function envelhecimento(planc) {
                //calcFreq();
                var len = planc.length;
                for (var i = 0; i < len; i++) {
                    planc[i].envelhecer();
                }
            }



            /* ----------------------------------- Morte por idade --------------------------------------------- 		 */
            function morteIdade(planc) {
                for (var i = 0; i < planc.length; i++) {
                    var idadeInd = planc[i].veridade(planc[i]);
                    var tempoIncr = planc[i].tempoextra(planc[i]);
                    if (idadeInd >= 6 + tempoIncr) {
                        var genotipo = planc[i].verGenes();

                        if (genotipo === 2) {
                            numTam2--;
                            planc.splice(i, 1);
                        }
                        if (genotipo === 3) {
                            numTam3--;
                            planc.splice(i, 1);
                        }
                        if (genotipo === 4) {
                            numTam4--;
                            planc.splice(i, 1);
                        }
                        if (genotipo === 5) {
                            numTam5--;
                            planc.splice(i, 1);
                        }

                        if (genotipo === 6) {
                            numZoo--;
                            planc.splice(i, 1);
                        }
                    }
                }

            }
            //APRENDER A USAR O SET INTERVAL DIREITO        
            timer1 = setInterval(timerPrincipal, 1000);
            timer2 = setInterval(timerMovimento, 1500);
            timer3 = setInterval(timerMorte, 200);
            timer4 = setInterval(timerReproduce, 250);
            //    timer5 = setInterval(timerLimite, 1000); //considerar retirar a variação de limite ambiental do gráfico pelo menos. (psso colocar a randomicidade a cada geração junto ao loop for do reproduce)

            //implementar opção por oscilação aleatória ou estações

            //oscilação aleatória
            //var incremento = floor(random(-10, 11));


            //oscilação ciclica           
            var incremento = 0;

            function timerPrincipal() {
                if (pause === -1) {
                    time++;
                    // limiteAmbiental = limiteAmbiental - floor(zplanctons.length);

                    graphTime.push(time);

                    graphPL2.push(numTam2);
                    graphPL3.push(numTam3);
                    graphPL4.push(numTam4);
                    graphPL5.push(numTam5);
                    arrayZoo.push(numZoo);
                    arrayFito.push(planctons.length);
                    //   arrayTotal.push(limiteAmbiental);
                }

            }

            function timerMovimento() {
                if (pause === -1) {
                    move(planctons);
                    move(zplanctons);

                }
            }



            function timerMorte() {
                if (pause === -1) {
                    morteIdade(planctons);
                    envelhecimento(planctons);
                    morteIdade(zplanctons);
                    envelhecimento(zplanctons);

                }
            }

            function timerReproduce() {
                if (pause === -1) {
                    reproduce();

                }
            }

            function calcTotalDias() {
                totaldias = time;
            }



            draw = function () {
                background(255, 255, 255);
                fill(255, 255, 255);
                stroke(255, 0, 0);
                rect(1, 15, larguraSet - 2, alturaSet - 15);
                fill(0, 0, 0);
                noStroke();
                textSize(13);
                text("Fito: ", 2, 12);
                text(planctons.length, 35, 12);
                text("T1: ", 65, 12);
                text(numTam2, 95, 12);
                text("T2: ", 125, 12);
                text(numTam3, 155, 12);
                text("T3: ", 185, 12);
                text(numTam4, 215, 12);
                text("T4: ", 245, 12);
                text(numTam5, 275, 12);
                text("Zoo: ", 420, 12);
                text(numZoo, 450, 12);
                text("Geração", 520, 12);
                text(time, 579, 12);
                if (time === duracaoSim) {
                    parar();

                }
                /* -----------------------------------Função chamar estatística final--------------------------------------------- 	*/
                if (time > 5 && numZoo === -1 || time > 5 && planctons.length === 0 || planctons.length === 0) {
                    parar();
                }

                if (signalEnding === 1) {
                    calcTotalDias();
                    endscene();

                } //sinaliza on off por meio do botão abortar
                /* -----------------------------------Calcula distância entre individuos--------------------------------------------- */
                var arraySize = planctons.length;
                for (var i = 0; i < arraySize; i++) {
                    planctons[i].update();
                    planctons[i].checkEdges();
                    planctons[i].display();
                }

                for (var j = 0; j < zplanctons.length; j++) {
                    zplanctons[j].update();
                    zplanctons[j].checkEdges();
                    zplanctons[j].display();

                    var pronto = zplanctons[j].reproduzirZoo();
                    var idade = zplanctons[j].veridade();


                    if (pronto != false && idade > idadeReprodutiva) {
                        ZooReproduce(pronto);
                        zplanctons[j].rejuvenescer();
                        //zplanctons.splice(j, 1);
                        //numZoo--;
                    }





                    for (var k = 0; k < planctons.length; k++) {
                        if (k !== j) {
                            var distanceRep = zplanctons[j].calculateDistance(planctons[k]);
                            var genotipo = planctons[k].verGenes();
                            if (distanceRep <= genotipo * 3) {
                                var sentido = planctons[k].verSentido();
                                var buchocheio = zplanctons[j].reproduzirZoo();
                                if (buchocheio === false) {
                                    zplanctons[j].movPredador(sentido);
                                }
                                planctons[k].predado();

                                var sentidoPresa = zplanctons[j].verSentido();
                                var morrer = planctons[k].verKill();
                                if (sentidoPresa.x === sentido.x && sentidoPresa.y === sentido.y && morrer == true) {

                                    if (genotipo === 2) {
                                        planctons.splice(k, 1);
                                        numTam2--;
                                        zplanctons[j].engordar(2);
                                    }
                                    if (genotipo === 3) {
                                        planctons.splice(k, 1);
                                        numTam3--;
                                        zplanctons[j].engordar(3);

                                    }
                                    if (genotipo === 4) {
                                        planctons.splice(k, 1);
                                        numTam4--;
                                        zplanctons[j].engordar(4);

                                    }
                                    if (genotipo === 5) {
                                        planctons.splice(k, 1);
                                        numTam5--;
                                        zplanctons[j].engordar(5);

                                    }

                                }

                            }
                        }
                    }
                }
            }; //draw

        } //starsim

    } //init