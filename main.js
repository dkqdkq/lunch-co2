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
    const YYYYMMDD = query.date;
    const data = await axios.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010209&Type=json&KEY=9e74b25e6e074c3bbeb16eaf1e20be1b&MLSV_YMD=${YYYYMMDD}`);
    const meal = data.data?.mealServiceDietInfo?.row[0]?.DDISH_NM;
    if (!meal) {
        res.status(404).json({ message: 'Not Found' });
    }
});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
