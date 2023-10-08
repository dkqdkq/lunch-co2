const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/api', async (req, res) => {
    const query = req.query;
    const YYYYMMDD = 20231010;
    const data = await axios.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010144&Type=json&MLSV_YMD=${YYYYMMDD}`);
    const meal = data.data?.mealServiceDietInfo?.[1]?.row?.[0].DDISH_NM;
    if (!meal) {
        res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json({meal: meal});
});


app.listen(30000, () => {
    console.log('Server is listening on port 6974');
});
