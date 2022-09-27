/* https://www.youtube.com/watch?v=5jMrisuymqs
*  Directo: Scraping web con Node + Cheerio + Express + Vue + Deploy Render
*  48.60
*/

import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();

app.get("/", cors(), async(req, res) => {
    console.log("entró aquí")
    try {
        const {data} = await axios.get("https://www.bcentral.cl/inicio");
        // axios siempre devuelve a través del objeto llamado "data"
        const $ = cheerio.load(data)
        // cheerio usa el $ para acceder a través selector CSS a los elementos de una web
        const selectorDolar =
        "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"
        
        console.log($(selectorDolar).text)

        const selectorUF = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"


        // res.json({ dolar: $(selectorDolar).text() });
        

        const objetoValores = {
            fecha: new Date(),
            UF: $(selectorUF).text(),
            dolar: $(selectorDolar).text().split("/")[0].trim(),
        }

        res.json(objetoValores);

    } catch (error) {
        res.json({error})
    }   
});

const PORT = process.env.PORT || 5000;
// usa || en caso que no exista PORT, usa 5000
app.listen(5000, () => console.log("http://localhost:" + PORT));
