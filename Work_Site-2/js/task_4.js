let latinPhrases = [
    "Consuetudo est altera natura",
    "Nota bene",
    "Nulla calamitas sola",
    "Per aspera ad astra",
    "Homo potest consequi omnia, quae mente comprehendere et accipere potest",
    "Tuum tempus terminatur"
];

let russianPhrases = [
    "Привычка - вторая натура",
    "Заметьте хорошо!",
    "Беда не приходит одна",
    "Через тернии к звёздам",
    "Человек может достичь всего, что способен постичь и принять разумом",
    "Ваше время ограничено"
];

const createButtonElement = document.getElementById('createButton')
const recolorButtonElement = document.getElementById('recolorButton')
var buttonСlicks = 0
var index = 0
const table = document.getElementById('phrasesTable')
var row;

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min)
}


createButtonElement.onclick = function () {
    if (russianPhrases.length === 0) {
        alert("Фразы закончились")
        return
    }

    buttonСlicks += 1

    if (buttonСlicks % 2 !== 0) {
        row = table.insertRow(1)
        index = getRandomArbitrary(0, (latinPhrases.length - 1))
        var cell1 = row.insertCell(0)
        cell1.textContent = latinPhrases[index]
        console.log('индекс: ', index, ' фраза: ', latinPhrases[index])
        latinPhrases.splice(index, 1)

    } else {
        var cell2 = row.insertCell(1)
        cell2.textContent = russianPhrases[index]
        console.log('индекс: ', index, ' фраза: ', russianPhrases[index])
        russianPhrases.splice(index, 1)
    }
}

recolorButtonElement.onclick = function () {
    const rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        rows[i].classList.remove('bold');
        rows[i].style.backgroundColor=''
    }

    for (let i = 1; i < rows.length; i++) {
        if (i % 2 === 0) {
            rows[i].classList.toggle('bold');
            rows[i].style.backgroundColor='#b12cc7'
        } else {
            rows[i].style.backgroundColor='#bba429'
        }
    }
}
