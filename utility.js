function upEveryFirstLetter(text) {
    let arr = text.split(" ");
    let ret = "";
    for (let part of arr) {
        ret += part[0].toUpperCase() + part.slice(1) + " ";
    }
    ret.trim();
    return ret;
}