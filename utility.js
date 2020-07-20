function upEveryFirstLetter(text) {
    let arr = text.split(" ");
    let ret = "";
    for (let part of arr) {
        if (part[0]!=null) {
            ret += part[0].toUpperCase() + part.slice(1) + " ";
        } else {
            ret += " ";
        }

    }
    return ret.slice(0, ret.length-1);
}