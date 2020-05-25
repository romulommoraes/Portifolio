var idX = [];
var dataY = [];
var idXAgro = [];
var dadoAgro = [];
var lineDataY = [];
var total;
var dadosY;
var linha;
var cultura;
var AS;
var AI;
var pAI;
var DAL;
var MTA;
var MAI;
var NAD;
var legenda = 'Número de Amostras por Cultura';
var linhas;
var linhasInt;
var linhasAgroInd;
var UF;
var teste;


start();
async function start() {
    dataY.splice(0, dataY.length);
    lineDataY.splice(0, lineDataY.length);
    idX.splice(0, idX.length);
    await catchData();
    await catchIntoxi();
    //await catchAgro();
    await catchAgroInd();
    linhas.forEach(elt => {
        linha = elt.split(',');
        cultura = linha[0];
        idX.push(cultura);
        total = linha[4];
        dataY.push(total);
    });
    criarGrafico();
}

function intoxi(dado, ano) {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    for (i = 0; i < linhasInt.length - 1; i++) {
        coluna = linhasInt[i].split(',');
        UF = coluna[0];
        idX.push(UF);
        total = coluna[dado];
        dataY.push(total);
        legenda = 'Intoxicações por agrotóxicos no ano de ' + ano;
    }

    criarGrafico();
}


function freqAgro(dado, cult) {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    dadoAgro.splice(0, dadoAgro.length);
    idXAgro.splice(0, idXAgro.length);
    idX.splice(0, idX.length);
    coluna = linhasAgroInd[dado].split(',');
    legenda = cult;
    for (i = 1; i < linhasAgroInd.length - 3; i += 2) {
        IDAgro = coluna[i];
        CTAgro = coluna[i + 1]
        dadoAgro.push(CTAgro);
        idXAgro.push(IDAgro);
    }
    criarGrafAgro();
}



function agro(dado, ano) {
    dataY.splice(0, dataY.length);
    lineDataY.splice(0, lineDataY.length);
    idX.splice(0, idX.length);
    for (i = 0; i < linhasInt.length - 1; i++) {
        coluna = linhasInt[i].split(',');
        UF = coluna[0];
        idX.push(UF);
        total = coluna[dado];
        console.log(total);
        dataY.push(total);
        legenda = 'Intoxicações por agrotóxicos no ano de ' + ano;
    }

    criarGrafico();
}


function plotAno(dado, uf) {
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    lineDataY.splice(0, lineDataY.length);
    coluna = linhasInt[dado].split(',');
    for (i = 1; i <= 8; i++) {
        lineDataY.push(coluna[i]);
        console.log(coluna[i]);

        legenda = 'Intoxicações por agrotóxicos de 2007 a 2014 por união federativa (' + uf + ')';
    }

    criarGrafLinha();
}


function plotpAI() {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    catchData();
    linhas.forEach(elt => {
        linha = elt.split(',');
        cultura = linha[0];
        idX.push(cultura);
        pAI = linha[3];
        dataY.push(pAI);
        legenda = '% de plantas contaminadas por Agrotóxicos';
    });
    criarGrafico();
}

function plotMTA() {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    catchData();
    linhas.forEach(elt => {
        linha = elt.split(',');
        cultura = linha[0];
        idX.push(cultura);
        MTA = linha[6];
        dataY.push(MTA);
        legenda = 'Média de agrotóxicos por amostras totais';
    });
    criarGrafico();
}

function plotMAI() {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    catchData();
    linhas.forEach(elt => {
        linha = elt.split(',');
        cultura = linha[0];
        idX.push(cultura);
        MAI = linha[7];
        dataY.push(MAI);
        legenda = 'Média de agrotóxicos por amostras contaminadas';
    });
    criarGrafico();
}

function plotNAD() {
    lineDataY.splice(0, lineDataY.length);
    dataY.splice(0, dataY.length);
    idX.splice(0, idX.length);
    catchData();
    linhas.forEach(elt => {
        linha = elt.split(',');
        cultura = linha[0];
        idX.push(cultura);
        NAD = linha[8];

        dataY.push(NAD);
        legenda = 'Número de Agrotóxicos Detectados';
    });
    criarGrafico();
}

function criarGrafico() {

    var ctx = document.getElementById('grafico').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: idX,
            datasets: [{
                label: legenda,
                data: dataY,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 164, 0.4)',
                    'rgba(55, 59, 164, 0.4)',
                    'rgba(155, 199, 232, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 106, 186, 0.4)',
                    'rgba(75, 192, 32, 0.4)',
                    'rgba(153, 102, 15, 0.4)',
                    'rgba(155, 229, 64, 0.4)',
                    'rgba(155, 159, 64, 0.4)',
                    'rgba(125, 239, 4, 0.4)',
                    'rgba(25, 196, 18, 0.4)',
                    'rgba(5, 292, 132, 0.4)',
                    'rgba(53, 12, 215, 0.4)',
                    'rgba(5, 129, 164, 0.4)',
                    'rgba(255, 159, 0, 0.4)',
                    'rgba(225, 29, 14, 0.4)',
                    'rgba(254, 0, 235, 0.4)',
                    'rgba(255, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 250, 0, 0.4)',
                    'rgba(55, 229, 64, 0.4)',
                    'rgba(15, 219, 140, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 164, 1)',
                    'rgba(55, 59, 164, 1)',
                    'rgba(155, 199, 232, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 106, 186, 1)',
                    'rgba(75, 192, 32, 1)',
                    'rgba(153, 102, 15, 1)',
                    'rgba(155, 229, 64, 1)',
                    'rgba(155, 159, 64, 1)',
                    'rgba(125, 239, 4, 1)',
                    'rgba(25, 196, 18, 1)',
                    'rgba(5, 292, 132, 1)',
                    'rgba(53, 12, 215, 1)',
                    'rgba(5, 129, 164, 1)',
                    'rgba(255, 159, 0, 1)',
                    'rgba(225, 29, 14, 1)',
                    'rgba(254, 0, 235, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 250, 0, 1)',
                    'rgba(55, 229, 64, 1)',
                    'rgba(15, 219, 140, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function criarGrafLinha() {
    var ctxLine = document.getElementById('grafico').getContext('2d');
    var chartLine = new Chart(ctxLine, {
        type: 'line',

        data: {
            labels: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
            datasets: [{
                label: legenda,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 0, 0)',
                fill: false,
                lineTension: 0,
                data: lineDataY
            }]
        },

        options: {}
    });

}

function criarGrafAgro() {
    var ctxAgro = document.getElementById('agro').getContext('2d');
    var myDoughnutChart = new Chart(ctxAgro, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: dadoAgro,
                backgroundColor: [
                    'rgba(155, 179, 32, 0.8)',
                    'rgba(254, 62, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(5, 232, 112, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(155, 179, 32, 1)',
                    'rgba(254, 62, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(5, 232, 112, 1)',
                    'rgba(153, 102, 255, 1)'

                ],
            }],

            labels: idXAgro
        },
        options: {}
    });
}

catchData().catch(error => {
    console.log("fudeu");
    console.error(error);
});


async function catchData() {
    const response = await fetch('dados.txt');
    const data = await response.text();
    linhas = data.split('\n').slice(1);
}

async function catchIntoxi() {
    const responseInt = await fetch('intoxicacoes.txt');
    const dataInt = await responseInt.text();
    linhasInt = dataInt.split('\n').slice(1);
}

async function catchAgroInd() {
    const responseAgroInd = await fetch('listaagro.txt');
    const dataAgroInd = await responseAgroInd.text();
    linhasAgroInd = dataAgroInd.split('\n').slice(1);
}
