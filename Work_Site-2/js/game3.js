var field = document.getElementById('field')
var buttonStart = document.getElementById('button-start')
var arrObjTrashcan = {}
var lvl = 0
var dicDust = {}
var countDustAnswer = 0

// ключ юзера
var key = getUserLastKey()

var timerInterval = null
var timer = 0

// получение ключа последнего юзера
function getUserLastKey() {
    return ("user_" + (Number(localStorage.length) - 1))
}

//вытаскиваем значения текущего пользователя 
function getUserLastValue (isConsole=false){
    let key = getUserLastKey()
    let value = JSON.parse(localStorage.getItem(key))
    if (isConsole){
        console.log(key, value)
    }
    return value
}

// создаем изображение
function createImg(className, id, src){
    let obj = document.createElement('img')
    obj.className = className
    obj.id = id 
    obj.src = src
    return obj
}

// размещение мусорок
function setTrashcan(array, count, left, top=480){
    if (count <= 0 || count >= 6){
        return
    }

    let i = 0

    for (const [key, value] of Object.entries(array)) {
        if( i < count){
            field.append(value[0])
            value[0].style.top = String(top) + 'px'
            value[0].style.left = String(left) + 'px'
            left += 100
            i += 1  
            value[1] = getElementDocumentPosition(value[0])

        }
    }
}

// удаляет все объектры поля 
function removeAllFieldElem(){
    for (let item of Array.from(field.children)) {
        item.remove();
    }
}

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min)
} 

// не использую эту функцию
function getRandomRotate() {
    return parseInt(Math.random() * 360)
} 

// функция создания элементов мусора
function createArrDust(name, id){
    let arr = []
    let path = 'image/' + name + '/' + name + '_мусор'

    for (let i = 0; i < 4; i++) {
        let obj = createImg('dust', (id + String(i + 1)), (path + (i+1) + '.png'))
        arr.push(obj)
        field.append(obj)

        obj.onload = function() {
            let natWidth = obj.naturalWidth
            let natHeight = obj.naturalHeight

            let coefficient = natHeight / natWidth
            
            newWidth = 50

            obj.style.width = newWidth + 'px'
            obj.style.height = newWidth * coefficient + 'px'
            
            obj.style.top = getRandomArbitrary(field.offsetTop + 20, (field.offsetTop + field.offsetHeight - obj.offsetHeight) - 200) + 'px'
            obj.style.left = getRandomArbitrary(field.offsetLeft + 20, (field.offsetLeft + field.offsetWidth - obj.offsetWidth - 20)) + 'px'
            //obj.style.transform = 'rotate(' + getRandomRotate() + 'deg)' // возникает баг с target системой 
        }
        objectMovement(id + String(i + 1))
    }
    return arr
}

// создает весь мусор
function createAllDust(count){
    dicDust['plastic_duct'] = createArrDust('пластик', 'plastic_duct')
    dicDust['metall_duct'] = createArrDust('металл', 'metall_duct')
    dicDust['glass_duct'] = createArrDust('стекло', 'glass_duct')
    if (count === 4){
        dicDust['paper_duct'] = createArrDust('бумага', 'paper_duct')
    } else if (count === 5){
        dicDust['paper_duct'] = createArrDust('бумага', 'paper_duct')
        dicDust['battery_duct'] = createArrDust('батарейки', 'battery_duct')
    }
}


function init(){
    // добавляем мусорки
    plastic = createImg('trashcan', 'plastic','image/пластик/пластик.png')
    metall = createImg('trashcan', 'metall', 'image/металл/металл.png')
    glass = createImg('trashcan', 'glass', 'image/стекло/стекло.png')
    paper = createImg('trashcan', 'paper', 'image/бумага/бумага.png')
    battery = createImg('trashcan', 'battery','image/батарейки/батарейки.png')
        
    arrObjTrashcan['plastic'] = [plastic, []]
    arrObjTrashcan['metall'] = [metall, []]
    arrObjTrashcan['glass'] = [glass, []]
    arrObjTrashcan['paper'] = [paper, []]
    arrObjTrashcan['battery'] = [battery, []]
}

// активация таймера
function addTimer(){
    var timerEl = document.getElementById('timer')
    timer += 1
    timerEl.textContent = 'Таймер: ' + timer
}

//старт
buttonStart.addEventListener('click', function(){
    init()
    lvl += 1
    var timerEl = document.getElementById('timer')
    timerEl.textContent = 'Таймер: '

    switch(lvl){
        case 1:
            countDustAnswer = 0
            timerInterval = setInterval(addTimer, 1000)
            setTrashcan(arrObjTrashcan, 3, 575)
            createAllDust(3)
            buttonStart.textContent = 'Следующий уровень'
            buttonStart.disabled = true
            
            break
        case 2:
            countDustAnswer = 0
            timerInterval = setInterval(addTimer, 1000)
            removeAllFieldElem()
            setTrashcan(arrObjTrashcan, 4, 540)
            createAllDust(4)
            buttonStart.textContent = 'Следующий уровень'
            buttonStart.disabled = true

            break
        case 3:
            countDustAnswer = 0
            timerInterval = setInterval(addTimer, 1000)
            removeAllFieldElem()
            setTrashcan(arrObjTrashcan, 5, 480)
            createAllDust(5)
            buttonStart.textContent = 'К результатам'
            buttonStart.disabled = true

            break
        case 4:
            window.location.href = 'result_game3.html'
    }
})

//--------------- движение

function objectMovement(imgId) {
   
    var img = document.getElementById(imgId)
    var initialX = 0
    var initialY = 0

    var currentX = 0
    var currentY = 0

    var xOffset = 0
    var yOffset = 0

    img.addEventListener("mousedown", dragStart)
    document.addEventListener("mouseup", dragEnd)
    document.addEventListener("mousemove", drag)

    function dragStart(element) {
        initialX = element.clientX - xOffset
        initialY = element.clientY - yOffset

        if (element.target === img) {
            document.addEventListener("mousemove", drag)
            document.addEventListener("mouseup", dragEnd)
        }
    }

    function drag(element) {
        element.preventDefault()
        
        if (initialX || initialY) {
            currentX = element.clientX - initialX
            currentY = element.clientY - initialY

            xOffset = currentX
            yOffset = currentY
            img.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)"
        }
    }

    function dragEnd(element) {

        initialX = currentX
        initialY = currentY

        document.removeEventListener("mousemove", drag)
        document.removeEventListener("mouseup", dragEnd)

        // получаем координаты мусорок
        //arrObjTrashcan = [plastic, metall, glass, paper, battery]
        
        //console.log(arrObjTrashcan['metall'][1])

        let objDust = document.getElementById(element.target.id)
        console.log(objDust) 
        if (!objDust || objDust === 'plastic' || objDust === 'metall' || objDust === 'glass' || objDust === 'paper' || objDust === 'battery'){
            console.log('я тут')
            return
        }
        let coordObj = getElementDocumentPosition(objDust)
        let objId = element.target.id.slice(0,-1); 
        
        let coordPlastic = arrObjTrashcan['plastic'][1]
        let coordMetall = arrObjTrashcan['metall'][1]
        let coordGlass = arrObjTrashcan['glass'][1]
        let coordPaper = arrObjTrashcan['paper'][1]
        let coordBattery = arrObjTrashcan['battery'][1]

        // проверки попадания в мусорку
        checkingGetTrashcan('plastic_duct', coordPlastic, objId, objDust, coordObj)
        checkingGetTrashcan('metall_duct', coordMetall, objId, objDust, coordObj)
        checkingGetTrashcan('glass_duct', coordGlass, objId, objDust, coordObj)
        checkingGetTrashcan('paper_duct', coordPaper, objId, objDust, coordObj)
        checkingGetTrashcan('battery_duct', coordBattery, objId, objDust, coordObj)
        
    }
}

// проверка попадания мусора в мусорку
function checkingGetTrashcan(material, coordTrashcan, objId, obj, coordObj){

    let countDust = Object.keys(dicDust).length * 4

    let originalBackgroundColor = field.style.backgroundColor
    if (coordObj.x1 >= coordTrashcan.x1 && coordObj.y1 >= coordTrashcan.y1 &&
        coordObj.x2 <= coordTrashcan.x2 && coordObj.y2 <= coordTrashcan.y2)
    {   
        if (objId === material){
            countDustAnswer += 1
            field.style.backgroundColor = 'green'
            setTimeout(function() {field.style.backgroundColor = originalBackgroundColor}, 200);
            obj.remove()
        } else {
            countDustAnswer += 1
            field.style.backgroundColor = 'red'
            timer += 10
            setTimeout(function() {field.style.backgroundColor = originalBackgroundColor}, 200);
            obj.remove()
        }
        if (countDustAnswer === countDust){
            // если весь мусор собран
            var timerEl = document.getElementById('timer')
            clearInterval(timerInterval)
            timerEl.textContent = 'Вы прошли уровень за: ' + timer + ' секунд.'
            
            // запись данных
            var value = getUserLastValue()
            setDataGame(key, value, timer, 3)
            timer = 0
            timerInterval = null
            buttonStart.disabled = false
        }
    }
}

function getElementDocumentPosition (element) {
    if (element){
        const rect = element.getBoundingClientRect()
        return {
            x1: rect.left + window.scrollX,
            y1: rect.top + window.scrollY,
            x2: rect.right + window.scrollX,
            y2: rect.bottom + window.scrollY
        }
    }
}

// запись достижений в localStorage
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
                valueNow.game3 = Number(valueNow.game3) + count
                var jsonString = JSON.stringify(valueNow);
                localStorage.setItem(key, jsonString)
                break;
    }
    } else {
        console.log('Значение value в localstorage пустое')
    }
}
