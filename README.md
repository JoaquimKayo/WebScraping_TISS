# Iniciar com:
npm init -y

# Criar um arquivo index.js
touch index.js

# Baixar as dependências: 

## axios -> para requisições HTTP
npm i axios

## cheerio -> para implementar o jquery no lado do servidor e ter um controle maior ao manipular o scraping
npm i cheerio

## node-downloader-helper -> para realizar o download do pdf através da url encontrada
npm node-downloader-helper

# No código (index.js):
## Declarar as Constantes:

const axios = require('axios');
const cheerio = require('cheerio');
const { DownloaderHelper } = require('node-downloader-helper');
const url = "https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss";
const caminhoDonwloadPDF = "c:/Users/Public/Desktop";

## Criar uma função assíncrona para realizar o download do arquivo PDF do Componente Organizacional Mais recente, com base na url iniciada na constante

async function downloadComponenteOrganizacional() {
    var { data } = await axios.get(url);
    var $ = cheerio.load(data);
    var urlRecente = "";
    var urlPDF = "";

    //url da pagina de padrão mais recente
    $('.callout a').each((i, elem) => {
        const link = $(elem).attr('href');

        if (i < 1) {
            urlRecente = link;
        }
    });


    var { data } = await axios.get(urlRecente);
    $ = cheerio.load(data);

    //url do link do pdf do botao "Visualizar da página"
    $('table tbody tr td a').each((i, elem) => {
        const link = $(elem).attr('href');
        if (i < 1) {
            urlPDF = link;
        }
    });

    //download do arquivo
    const download = new DownloaderHelper(urlPDF, caminhoDonwloadPDF);
    download.on('end', () => console.log('Download Completed'))
    download.start();
}

## chamar a função:
downloadComponenteOrganizacional();

# Para testar utilizar o comando:
node index.js

## O arquivo pdf será salvo no caminho declarado na variável caminhoDownloadPDF
