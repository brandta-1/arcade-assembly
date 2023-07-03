export const setImage = (obj, size) => {

    const sizes = [
        "thumb",
        "cover_small",
        "cover_big"
    ];

    obj.forEach(i => {

        const theString = i.cover;

        let stringArr = theString.substring(2).split('/');

        stringArr[4] = `t_${sizes[size]}`;

        i.cover = `//${stringArr.join('/')}`
    })
};
