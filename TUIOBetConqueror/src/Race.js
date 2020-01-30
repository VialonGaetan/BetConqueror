const Races = {
    UndefinedId: 0,
    French: 1,
    Espagnol: 2,
    Maya: 3,
    Olmeques: 4,
}

function getEnumKeys(enumType) {
    return Object.keys(MyMessageIds);
}

export function getRaceValue(key) {
    return Races[Object.keys(Races).filter(function (k) {
        return key.toLowerCase() === k.toLowerCase();
    }).pop() || ''];
}