
// this was used to retrieve the app access token via POST request
// `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`

// with the token, you will use the base URL: https://api.igdb.com/v4
// then the header of the request must include the CLIENT_ID and ACCESS_TOKEN process.env variables

//can be filter for gamemodes, the endpoint name is game_modes

//example that yielded 200 response:
require('dotenv').config();

async function getData(client_id, access_token) {

    let res = await fetch(
        "https://api.igdb.com/v4/age_ratings",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': `${client_id}`,
                'Authorization': `Bearer ${access_token}`,
            },
            body: "fields *;",
            data: " "
        });

    let data = await res.json();
    return data;
}


async function PrintStuff() {

    let data = await getData(process.env.CLIENT_ID, process.env.ACCESS_TOKEN);
    console.log(data);
}

PrintStuff();