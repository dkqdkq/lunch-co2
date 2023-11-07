const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.sendFile("/public/index.html");
});

app.get("/api", async (req, res) => {
    const query = req.query;
    const YYYYMMDD = getFormattedDate();
    const SchoolCode = 7010209;
    const data = await axios.get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=${SchoolCode}&Type=json&MLSV_YMD=${YYYYMMDD}`
    );
    const meal =
        data.data?.mealServiceDietInfo?.[1]?.row?.[0]?.DDISH_NM.split("<br/>");
    const carbon = data.data?.mealServiceDietInfo?.[1]?.row?.[0]?.ORPLC_INFO;
    const calories = data.data?.mealServiceDietInfo?.[1]?.row?.[0]?.CAL_INFO;
    if (!meal) {
        res.status(404).json({ message: "Not Found" });
        return;
    }
    res.status(200).json({
        success: true,
        data: {
            meal: meal,
            calories: calories,
        },
    });
});

app.get("/new", async (req, res) => {
    res.sendFile(__dirname + "/public/new.html");
});

app.listen(30000, () => {
    console.log("Server is listening on port 30000");
});

function getFormattedDate() {
    const today = new Date();
    console.log(today);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;

    return formattedDate;
}
