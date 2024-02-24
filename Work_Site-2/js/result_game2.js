var data = []

function sort(arr) {
    return arr.filter(item => item.game2 !== 0).sort((a, b) => a.game2 - b.game2);
}


function getAllUserLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = JSON.parse(localStorage.getItem(key))
        data.push(value)
    }
    data = sort(data)
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
    }
}

function getRandomColor() { // перекрашивает в рандомные цвета 
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${green}, ${blue}, 0.7)`
}


var field = document.getElementById('result-center-block')
getAllUserLocalStorage()

for (let i = 0; i < 21; i++) {
    
    if (data.length <= i){
        break
    }

    const divLocalStorage = document.createElement('div')
    divLocalStorage.className = 'div-local-storage'
    divLocalStorage.id = 'div-local-storage-' + i 
    divLocalStorage.style.backgroundColor = getRandomColor()

    field.append(divLocalStorage)

    const divNumber = document.createElement('div')
    divNumber.className = 'div-number'
    divNumber.id = 'div-number' + i 
    divNumber.textContent = '# ' + (Number(i) + 1)
    divLocalStorage.append(divNumber)
    
    let name = data[i].name
    let game2 = data[i].game2

    const nameElem = document.createElement('p')
    nameElem.className = 'text-result'
    nameElem.id = 'name-elem-' + name
    nameElem.textContent = 'Имя: ' + name
    divLocalStorage.append(nameElem)

    const game2Elem = document.createElement('p')
    game2Elem.className = 'text-result'
    game2Elem.id = 'bl-' + name
    game2Elem.textContent = 'Таймер: ' + game2
    divLocalStorage.append(game2Elem)
}


