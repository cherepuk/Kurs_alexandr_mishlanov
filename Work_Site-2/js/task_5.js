function getElementDocumentPosition (element) {

    const rect = element.getBoundingClientRect()
    return {
        x1: rect.left + window.scrollX,
        y1: rect.top + window.scrollY,
        x2: rect.right + window.scrollX,
        y2: rect.bottom + window.scrollY
    }
}

var containerElement = document.getElementById('container-shapes')
var coordinatesContainer = getElementDocumentPosition(containerElement)
var heightContainer = coordinatesContainer.y2 - coordinatesContainer.y1
var widthContainer =  coordinatesContainer.x2 - coordinatesContainer.x1


function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min)
} 

function getRandomRotate() {
    return parseInt(Math.random() * 360)
} 

function addImage (src, height, id) {
    const img = document.createElement('img')

    img.src = src
    img.style.height = height + 'px'
    img.id = id
    img.style.position = 'absolute'

    containerElement.append(img)
   
    img.onload = function() {
        let width = img.width

        let randomIndentationTop = getRandomArbitrary((0 + height), (heightContainer - height))
        let randomIndentationLeft = getRandomArbitrary((0 + width), (widthContainer - width))

        let topImg = coordinatesContainer.y1 + randomIndentationTop  
        let leftImg = coordinatesContainer.x1 + randomIndentationLeft 

        img.style.top = String(topImg) + 'px'
        img.style.left = String(leftImg) + 'px'

        img.style.transform = 'rotate(' + getRandomRotate() + 'deg)'  
    }

}

addImage('image/roof.png', 100, 'roof')
addImage('image/wall.png', 225, 'wall')
addImage('image/door.png', 150, 'door')
addImage('image/window.png', 40, 'window')

//------------------------------------------------------------

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

        const roofElement = document.getElementById('roof')
        const wallElement = document.getElementById('wall')
        const doorElement = document.getElementById('door')
        const windowElement = document.getElementById('window')

        let roofCoordinates = getElementDocumentPosition(roofElement)
        let wallCoordinates = getElementDocumentPosition(wallElement)
        let doorCoordinates = getElementDocumentPosition(doorElement)
        let windowCoordinates = getElementDocumentPosition(windowElement)

        // Крыша
        if (roofCoordinates.y2 >= wallCoordinates.y1 && roofCoordinates.y2 <= (wallCoordinates.y1 + 10) 
            && roofCoordinates.x1 <= wallCoordinates.x1 && roofCoordinates.x2 >= wallCoordinates.x2 
        ) 
        {
            //console.log('Крыша встала')
            objektsFigure.set('roof', true)
        } else {
            objektsFigure.set('roof', false)
        }
        // Дверь
        if ( doorCoordinates.x1 > wallCoordinates.x1 && doorCoordinates.x2 < wallCoordinates.x2 
                    && doorCoordinates.y1 > wallCoordinates.y1 && doorCoordinates.y2 <= wallCoordinates.y2
                    && doorCoordinates.y2 >= (wallCoordinates.y2 - 10)
        ){
            //console.log('Дверь встала')
            objektsFigure.set('door', true)
        } else {
            objektsFigure.set('door', false)
        } 
        // стена
        if (element.target.id === 'wall'){
            objektsFigure.set('wall', true)
        }
        // окно
        if ( windowCoordinates.x1 > wallCoordinates.x1 && windowCoordinates.x2 < wallCoordinates.x2
            && (windowCoordinates.x1 > doorCoordinates.x2 || windowCoordinates.x2 < doorCoordinates.x1)
            && windowCoordinates.y1 > doorCoordinates.y1 && windowCoordinates.y2 < doorCoordinates.y2
        ){
            objektsFigure.set('window', true)
        } else {
            objektsFigure.set('window', false)
        }
    
        
        let resultElement = document.getElementById('result-task5')
        let completingTask = document.getElementById('completing-task')
        let countCorrectAnswers = 0

        for (let obj of objektsFigure.values()) {
            
            if (obj === true) {
                countCorrectAnswers += 1
            }
        }
        resultElement.textContent = countCorrectAnswers + '/4'
        if (countCorrectAnswers === 4) {
            completingTask.style.backgroundColor = 'green'
        } else {
            completingTask.style.backgroundColor = 'red'
        }

    }
}

var objektsFigure = new Map ([
    ['roof', false],
    ['wall', false],
    ['door', false],
    ['window', false]
])



objectMovement("roof")
objectMovement("wall")
objectMovement("door")
objectMovement("window")



