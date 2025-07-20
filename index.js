import puppeteer from "puppeteer";
import fs from "fs";

async function getDataFromWebPage() {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 300
    });

    const page = await browser.newPage();
    await page.goto('https://www.rematchtracker.com/player/steam/76561199094949070', {
        waitUntil: 'networkidle2'
    });

    const textoPlano = await page.evaluate(() => {
        const rango = document.querySelector('.text-lg.font-bold.text-white.mb-1.svelte-kej2cd')?.textContent.trim() || '';
        const division = document.querySelector('.text-sm.text-gray-300.font-medium.svelte-kej2cd')?.textContent.trim() || '';
        return `${rango}, ${division}`;
    });

    fs.writeFileSync('datos.json', textoPlano, 'utf-8');
    console.log("Archivo datos.json guardado con:", textoPlano);

    await browser.close();
}

getDataFromWebPage();
