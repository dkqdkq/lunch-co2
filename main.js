const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    const menu = await fetch("/api/menu").then((res) => res.json());
    //res.sendFile(__dirname + "/public/index.html");
    res.render("/public/index.html", { menu });
});

app.get("/api", async (req, res) => {
    const query = req.query;
    const YYYYMMDD = 20231010;
    const SchoolCode = 7010144; //대일고
    //const SchoolCode = 7010209; //API수정시 등록 양천고
    const data = await axios.get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${SchoolCode}&Type=json&MLSV_YMD=${YYYYMMDD}`
    );
    const meal = data.data?.mealServiceDietInfo?.[1]?.row?.[0].DDISH_NM;
    const carbon = data.data?.mealServiceDietInfo?.[1]?.row?.[0].ORPLC_INFO;
    const calories = data.data?.mealServiceDietInfo?.[1]?.row?.[0].CAL_INFO;
    /* if (!carbon) {
        res.status(404).json({ message: "Not Found" });
    }*/
    res.status(200).json({
        success: true,
        data: {
            meal: meal,
            carbon: carbon,
            calories: calories,
        },
    });
});

app.get("/api/menu", async (req, res) => {
    const query = req.query;
    const headers = {
        "User-Agent": "Mozilla/5.0",
    };
    const YYYYMMDD = 0;
    const mlsvId = 2376932;
    const data = await axios.get(
        `https://yangcheon.sen.hs.kr/dggb/module/mlsv/selectMlsvDetailPopup.do?mlsvId=${mlsvId}`,
        { headers }
    );
    if (!data) {
        res.status(404).json({ message: "Not Found" });
    }
    const $ = cheerio.load(data.data);
    const menu = $("#detailFrm > table > tbody > tr:nth-child(4) > td").text();
    /*res.status(200).json({
        success: true,
        data: menu.trim().split(","),
    });*/
    res.json(menu);
});

app.listen(30000, () => {
    console.log("Server is listening on port 30000");
});
