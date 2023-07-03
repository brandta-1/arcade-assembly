export const searchGames = async (x) => {
    let res = await fetch(`/api/search/${x}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    });
    console.log(res);
    let data = await res.json();
    return data;
}