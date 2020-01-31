const Races = {
    UndefinedId: "UndefinedId",
    Francais: "French",
    Espagnol: "Espagnol",
    Maya: "Maya",
    Olmeques: "Olmeques",
}


export function getRaceValue(key) {
    return Races[Object.keys(Races).filter(function (k) {
        return key.toLowerCase() === k.toLowerCase();
    }).pop() || ''];
}