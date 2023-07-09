require('dotenv').config();

function clean(d) {
    d.forEach(i => {
        console.log(i.id.toString());
        i.cover = i.cover.url;
        Object.assign(i, { date: i.first_release_date, igdb: i.id.toString() })
        delete i['first_release_date'];
        delete i['id'];
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
            return res.status(400).json(err)
        }
    }

    
}