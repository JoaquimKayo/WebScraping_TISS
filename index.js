const axios = require('axios');
const cheerio = require('cheerio');
const { DownloaderHelper } = require('node-downloader-helper');
const url = "https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss";
const caminhoDonwloadPDF = "c:/Users/Public/Desktop";

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

downloadComponenteOrganizacional();
