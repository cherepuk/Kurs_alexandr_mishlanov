var field = document.getElementById('field')
var buttonStart = document.getElementById('button-start')

var timerInterval = null
var timer = 0
var lvl = 0

let moveInterval = null
const step = 3
var speed = 1
var barrierArr = []
var key = getUserLastKey()



function init(countBarrier){
    
    if(rabbit || burrow || timerInterval){
        return
    }

    var timerEl = document.getElementById('timer')
    var burrow = null
    var rabbit = null

    timer = 0
    // нора
    burrow = document.createElement('img')
    burrow.className = 'burrow-img'
    burrow.id = 'burrow-img'
    burrow.src = 'image/burrow.png'
    field.append(burrow)
    
    //кролик
    rabbit = document.createElement('img')
    rabbit.className = 'rabbit-img-worth'
    rabbit.id = 'rabbit' 
    rabbit.src = 'image/Rabbit_worth.png'
    field.append(rabbit)

    //добавляем припятствия
    addBarrier(countBarrier) // только четные
}

// старт
buttonStart.addEventListener('click', function () {
    lvl += 1

    let burrow = document.getElementById('burrow-img')
    let rabbit = document.getElementById('rabbit')
    var timerEl = document.getElementById('timer')

    if(rabbit){
        rabbit.remove()
        clearInterval(moveInterval)
        clearInterval(timerInterval)
        moveInterval = null
        timerInterval = null
        burrow.remove()
        let wolf = document.getElementById('wolf')
        if(wolf){wolf.remove()}
    }
            
    timerEl.textContent = 'Таймер: '
    for (let i = 0; i < barrierArr.length; i++) {
        barrierArr[i].remove()
    }
    barrierArr = []


    switch(lvl){
        case 1:

            init(4)
            timerInterval = setInterval(addTimer, 1000)
            buttonStart.textContent = 'Следующий уровень'
            buttonStart.disabled = true
        
            break
        case 2:

            init(6)
            timerInterval = setInterval(addTimer, 1000)
            createWolf(false)
            speedWolf = 2
            moveWolfTowardsRabbit()

            break
        case 3:

            init(10)
            timerInterval = setInterval(addTimer, 1000)
            createWolf(true)
            speedWolf = 3
            moveWolfTowardsRabbit()    
            buttonStart.textContent = 'К результатам'
            break
        case 4:
            window.location.href = 'result_game2.html'
    }
})

function addTimer(){
    var timerEl = document.getElementById('timer')
    timer += 1
    timerEl.textContent = 'Таймер: ' + timer
}

// регистрация движений
document.addEventListener('keydown', function(event) {
    let rabbit = document.getElementById('rabbit')

    if (moveInterval !== null || !['w', 's', 'a', 'd'].includes(event.key.toLowerCase()) || !rabbit || timerInterval === null) return;
    
    event.preventDefault(); // Предотвращаем скроллинг страницы

    switch (event.key.toLowerCase()) {
        case 'w':
            moveInterval = setInterval(moveRabbit, speed, 0, -step);
            break;
        case 's':
            moveInterval = setInterval(moveRabbit, speed, 0, step);
            break;
        case 'a':
            moveInterval = setInterval(moveRabbit, speed, -step, 0);
            break;
        case 'd':
            moveInterval = setInterval(moveRabbit, speed, step, 0);
            break;
    }
});

//отпускания клавиш
document.addEventListener('keyup', function(event) {
    if (['w', 's', 'a', 'd'].includes(event.key.toLowerCase())) {
        clearInterval(moveInterval)
        moveInterval = null
    }
});

// движение
function moveRabbit(dx, dy) {
    let rabbit = document.getElementById('rabbit')

    let newX = rabbit.offsetLeft + dx
    let newY = rabbit.offsetTop + dy
    
    let rabbitRight = newX + rabbit.offsetWidth;
    let rabbitBottom = newY + rabbit.offsetHeight;

    // проверка зашел ли на препятсвие
    for (let i = 0; i < barrierArr.length; i++) {
        let barrier = barrierArr[i];
        let barrierLeft = barrier.offsetLeft;
        let barrierRight = barrierLeft + barrier.offsetWidth;
        let barrierTop = barrier.offsetTop;
        let barrierBottom = barrierTop + barrier.offsetHeight;

        // Проверяем пересечение
        if (rabbitRight > barrierLeft && newX < barrierRight && 
            rabbitBottom > barrierTop && newY < barrierBottom) {
            // Если кролик пересекается с препятствием, прерываем функцию
            return;
        }
    }
    // Проверка границ поля
    if (newX >= field.offsetLeft && newX + rabbit.offsetWidth <= (field.offsetWidth + field.offsetLeft) ) {
        rabbit.style.left = newX + 'px'
    }
    if (newY >= field.offsetTop && newY + rabbit.offsetHeight <= (field.offsetHeight + field.offsetTop)) {
        rabbit.style.top = newY + 'px'
    }
    // если кролик в норке
    if (isRabbitInBurrow()){
        buttonStart.disabled = false // неактивная кнопка старта
        clearInterval(moveInterval)
        clearInterval(timerInterval)
        timerInterval = null
        moveInterval = null
        var timerEl = document.getElementById('timer')
        timerEl.textContent = 'Вы добрались до норки за: ' + timer + ' секунд.' 
        
        var value = getUserLastValue()
        setDataGame(key, value, timer, 2) // заносим данные 
        
        rabbitEntersBurrowAnimation()
        let wolf = document.getElementById('wolf')
        if(wolf){wolf.remove()}
    }
}

// в норке ли кролик
function isRabbitInBurrow(){
    let rabbit = document.getElementById('rabbit')
    let burrow = document.getElementById('burrow-img')

    if (rabbit.offsetLeft >= burrow.offsetLeft && rabbit.offsetTop >= burrow.offsetTop && 
        ((rabbit.offsetTop + rabbit.offsetHeight) <= (burrow.offsetTop + burrow.offsetHeight)) &&
        ((rabbit.offsetLeft + rabbit.offsetWidth) <= (burrow.offsetLeft + burrow.offsetWidth))    
    ){
        return true
    } else {
        return false
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//анимация исчезновения кролика
async function rabbitEntersBurrowAnimation(){
    let rabbit = document.getElementById('rabbit')
    let opacity = 1

    for (let i = 0; i < 100; i++) {
        opacity -= 0.01
        rabbit.style.opacity = opacity
        await sleep(10)
    }
}


function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min)
} 

function getRandomColor() { // перекрашивает в рандомные цвета 
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${green}, ${blue})`
}

// создание припятствий 
function addBarrier(count) {
    if (count % 2 !== 0) {
        return 
    }

    let rabbit = document.getElementById('rabbit')

    for (let i = 0; i < count; i++) {
        let elem = document.createElement('div')
        elem.style.backgroundColor = getRandomColor()
        
    
        let height, width
        if (i % 2 === 0) {
            height = getRandomArbitrary(100, 200)
            width = getRandomArbitrary(10, 50)
        } else {
            height = getRandomArbitrary(10, 50)
            width = getRandomArbitrary(100, 200)
        }
        
        elem.style.height = height + 'px'
        elem.style.width = width + 'px'
        elem.id = 'barrier_' + i
        elem.style.position = 'absolute'
        elem.style.top = getRandomArbitrary(field.offsetTop + rabbit.offsetHeight, field.offsetHeight - height) + 'px'
        elem.style.left = getRandomArbitrary(field.offsetLeft + rabbit.offsetWidth, field.offsetWidth - width) + 'px'

        field.append(elem)
        barrierArr.push(elem)
    }
}

function createWolf(isRandomSpawn){
    if (document.getElementById('wolf')) {return}
    wolf = document.createElement('img')
    wolf.className = 'wolf'
    wolf.id = 'wolf' 
    wolf.src = 'image/wolf.png'
    wolf.style.left = '1200px'
    if(isRandomSpawn){
        wolf.style.top = getRandomArbitrary(field.offsetTop, field.offsetHeight) + 'px'
        wolf.style.left = getRandomArbitrary(field.offsetLeft, field.offsetWidth) + 'px'
    }
    field.append(wolf)
}

function moveWolfTowardsRabbit() {
    const rabbit = document.getElementById('rabbit')
    const wolf = document.getElementById('wolf')

    const wolfPos = wolf.getBoundingClientRect()
    const rabbitPos = rabbit.getBoundingClientRect()

    const dx = rabbitPos.left - wolfPos.left
    const dy = rabbitPos.top - wolfPos.top

    const speed = 2

    const length = Math.sqrt(dx * dx + dy * dy)
    const dirX = dx / length
    const dirY = dy / length

    wolf.style.left = `${wolfPos.left + dirX * speed}px`
    wolf.style.top = `${wolfPos.top + dirY * speed}px`

    if (length > 40) { 
        requestAnimationFrame(moveWolfTowardsRabbit); 
    } else {
        console.log("Волк поймал кролика!");
        var timerEl = document.getElementById('timer')
        timerEl.textContent = 'Кролик был пойман'
        buttonStart.textContent = 'start'
        buttonStart.disabled = false
        lvl = 0
        clearInterval(timerInterval)
        timerInterval = null
        rabbitEntersBurrowAnimation()
    }
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
