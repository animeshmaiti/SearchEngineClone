const url = 'https://google-search74.p.rapidapi.com/?query=Nike&limit=10&related_keywords=true';
const fs = require("fs");
const getResults = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '96db13c95fmsha1d7c0ad90d698dp1f7e0ejsn34ab7ef48860',
            'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        fs.writeFile('file.json', JSON.stringify(result), (error) => {
            if (error) throw error;
        });
    } catch (error) {
        console.error(error);
    }
}

getResults(url);