export function getTempFilename() {
    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let tempFilename = "challenger_";
    for (var i = 0; i < 8; i++) {
        tempFilename += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    tempFilename += ".tmp"
    return tempFilename;
}

export function getTempOutFilename() {
    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let tempFilename = "challenger_";
    for (var i = 0; i < 8; i++) {
        tempFilename += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    tempFilename += ".out"
    return tempFilename;
}
