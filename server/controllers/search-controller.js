require('dotenv').config();

function clean(d) {
    d.forEach(i => {
        i.release_dates = i.release_dates[0].date;
        i.cover = i.cover.url;
        delete i.id;
    });
    return d;
}

module.exports = {

    async searchGames(req, res) {
        try {
            let result = await fetch(
                "https://api.igdb.com/v4/games",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': `${process.env.CLIENT_ID}`,
                        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    },
                    body: `search "${req.params.query}"; f cover.url, release_dates.date, name; where game_modes = (2);`,
                    data: " "
                }
            ).then(async (r) => {
                let data = await r.json();
                return clean(data);
            });
            res.json(result);
        } catch (err) {
            return res.status(400).json(err)
        }
    }

    
}