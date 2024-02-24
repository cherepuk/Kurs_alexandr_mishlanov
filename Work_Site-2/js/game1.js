var startGame1 = document.getElementById('start-game-1')
var field = document.getElementById('field')

var arrayLightIndexes = [3, 5, 7] // кол-во лампочек

var lightsBlock = []
var sleepTimeArr = []
var lvl = 0
var balls = 0
var itemBallsText = document.getElementById('balls')
var textInfo = document.getElementById('text-info')

//clearLocalStorage()
//getAllUsers()
//getUserLastValue()

// создаем блоки
function createLightBlock(index, lvl){
    balls = 0
    sleepTimeArr = []
    // создаем элементы
    for (let i = 0; i < index; i++) {
        textInfo.textContent = 'Уровень - ' + lvl

        const divLightsBlock = document.createElement('div')
        divLightsBlock.className = 'light-block'
        divLightsBlock.id = 'light-block-' + i 
        field.append(divLightsBlock)

        const imgLightBlock = document.createElement('img')
        imgLightBlock.src = 'image/light-dark.png'
        imgLightBlock.className = 'img-light-dark'
        imgLightBlock.id = 'img-light-' + i
        divLightsBlock.append(imgLightBlock)
        
        let startLight = document.createElement('button')
        startLight.id = 'start-light-' + i
        startLight.className = 'button-game1'
        startLight.textContent = 'начать'
        divLightsBlock.append(startLight)

        itemBallsText.textContent = "Пройдено: " + balls + '/' + index
    }
    
    for (let i = 0; i < index; i++) {
        let startLight = document.getElementById('start-light-' + i)
        //создаем события для каждой лампочки
        startLight.addEventListener('click', function(){
                this.parentNode.removeChild(startLight)
                let sleepTime = (getRandomArbitrary(1, 10)) * 1000
                console.log(sleepTime /1000)
                sleepTimeArr.push(sleepTime / 1000)
                let id = 'img-light-' + i
                
                const divLightsBlock = document.getElementById('light-block-' + i)
                const inputBlock = document.createElement('input')
                inputBlock.id = 'inp-' + i
                inputBlock.className = 'inp-class' 
                inputBlock.placeholder = 'От 1 до 10'
                divLightsBlock.append(inputBlock)

                let enterLight = document.createElement('button')
                enterLight.className = 'button-game1'
                enterLight.id = 'enter-light-' + i
                enterLight.textContent = 'ввод'
                divLightsBlock.append(enterLight)

                lightOn(id)
                setTimeout(function(){lightOff(id)}, sleepTime);
                checkData(i, index)
        })
        
    }
}

function checkData (i, countLights){
    let enterLight = document.getElementById('enter-light-' + i)
        // проверяем введеные данные
        enterLight.addEventListener('click', function(){
            let inp = document.getElementById('inp-' + i)
            let enterLight = document.getElementById('enter-light-' + i)
            if (inp.value >= 1 && inp.value <= 10 ){
                var key = getUserLastKey()
                var value = getUserLastValue() // получаем данные пользователя
            
                if (inp.value == sleepTimeArr[i]){
                    let divLightBlock = document.getElementById('light-block-' + i)
                    divLightBlock.style.background = '#3aae36' // изменяем цвет
                    setDataGame(key, value, 1, 1) // заносим данные 
                    inp.remove()
                    enterLight.remove()
                    balls += 1

                    itemBallsText.textContent = "Пройдено: " + balls + '/' + countLights

                }else{
                    inp.remove()
                    enterLight.remove()
                    let divLightBlock = document.getElementById('light-block-' + i)
                    divLightBlock.style.background = '#b03737'
                }
            } else {
                console.log('не прошел проверку')
            }
        })
}

function setDataGame(key, valueNow, count, game){
    if(valueNow){
        switch (game){
            case 1:
                valueNow.game1 = Number(valueNow.game1) + count
                var jsonString = JSON.stringify(valueNow);
                localStorage.setItem(key, jsonString)
                getUserLastValue(true)
                break;
            case 2:
                valueNow.game2 = Number(valueNow.game2) + count
                var jsonString = JSON.stringify(valueNow);
                localStorage.setItem(key, jsonString)
                break;
            case 3:
                valueNow.game2 = Number(valueNow.game2) + count
                var jsonString = JSON.stringify(valueNow);
                localStorage.setItem(key, jsonString)
                break;
        }
    } else {
        console.log('Значение value в localstorage пустое')
    }
}


function getUserLastKey() {
    return ("user_" + (Number(localStorage.length) - 1))
}

//вытаскиваем текущего пользователя
function getUserLastValue (isConsole=false){
    let key = getUserLastKey()
    let value = JSON.parse(localStorage.getItem(key))
    if (isConsole){
        console.log(key, value)
    }
    return value
}

//Выводим всех пользователей
function getAllUsers(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = JSON.parse(localStorage.getItem(key))
        console.log(key, value)
    }
}

//очистка хранилища
function clearLocalStorage() {
    localStorage.clear();
}



let asd = new Array.prototype.constructor(1, 2)
console.log (asd)

function lightOn (id){
    let light = document.getElementById(id)
    light.src = 'image/light-light.png'
}

function lightOff (id){
    let light = document.getElementById(id)
    light.src = 'image/light-dark.png'

}

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min)
} 

function clearLightsElemAll(index) {
    for (let i = 0; i < index; i++) {
        let elem = document.getElementById('light-block-' + i)
        elem.remove()
    }
}

function gameOver(){ 
    field.remove()
    itemBallsText.remove()
    textInfo.textContent = 'Вы проиграли'
    startGame1.textContent = 'Вернуться в начало'
    startGame1.addEventListener('click', function () {
        window.location.href = "kurs.html"
    })
}

startGame1.addEventListener('click', function (){
    lvl += 1
    startGame1.textContent = 'Следующий уровень'
    switch(lvl){
        case 1:
            createLightBlock(arrayLightIndexes[0], lvl)
            break
        case 2:
            let ballsAll = getUserLastValue()
            console.log(ballsAll.game1)
            if ( 0.6 <= (Number(ballsAll.game1) / arrayLightIndexes[0])){
                clearLightsElemAll(arrayLightIndexes[0])
                createLightBlock(arrayLightIndexes[1], lvl)
            } else {
                gameOver()
            }
            break
        case 3:
            clearLightsElemAll(arrayLightIndexes[1])
            createLightBlock(arrayLightIndexes[2], lvl)
            getUserLastValue(true)
            startGame1.textContent = 'перейти к результатам'
            break
        case 4:
                window.location.href = 'result_game1.html'
            break
    }
})


