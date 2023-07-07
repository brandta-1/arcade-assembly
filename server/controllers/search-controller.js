require('dotenv').config();
const fetch = require('node-fetch');

function clean(d) {
    d.forEach(i => {
        i.cover = i.cover.url;
        delete Object.assign(i, { date: i.first_release_date })['first_release_date'];
    });
    return d;
}

module.exports = {

    async searchGames(req, res) {
        try {
            console.log('x')
            let result = await fetch(
                "https://api.igdb.com/v4/games",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': `${process.env.CLIENT_ID}`,
                        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    },
                    body: `search "${req.params.query}"; f cover.url, first_release_date, name; where game_modes = (2);`,
                    data: " "
                }
            ).then(async (r) => {
                let data = await r.json();
                console.log(data);
                return clean(data);
            });
            res.json(result);
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    }


}