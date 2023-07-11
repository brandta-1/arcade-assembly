export const setImage = (img, obj, size) => {

    if(img){
        return change(img,size);
    }

    if (obj) {
        obj.forEach(i => {
            i.cover = change(i.cover,size)
        })
    }

};

function change(x,size) {

    const sizes = [
        "thumb",
        "cover_small",
        "cover_big"
    ];

    let stringArr = x.substring(2).split('/');
    stringArr[4] = `t_${sizes[size]}`;
    return `//${stringArr.join('/')}`;
}

