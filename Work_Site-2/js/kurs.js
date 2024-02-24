

var start = document.getElementById('game-1-button')
var start2 = document.getElementById('game-2-button')
var start3 = document.getElementById('game-3-button')



start.addEventListener('click', function(){
    
    let nameInp = document.getElementById('name') 
  
    if (nameInp.value){
        var data = {
            name: nameInp.value,
            game1: 0,
            game2: 0,
            game3: 0
        }
        var jsonString = JSON.stringify(data);
        var userKey = 'user_' + localStorage.length;
        localStorage.setItem(userKey, jsonString)
        window.location.href = "game1.html"
    }
})
start2.addEventListener('click', function(){
    
    let nameInp = document.getElementById('name') 
  
    if (nameInp.value){
        var data = {
            name: nameInp.value,
            game1: 0,
            game2: 0,
            game3: 0
        }
        var jsonString = JSON.stringify(data);
        var userKey = 'user_' + localStorage.length;
        localStorage.setItem(userKey, jsonString)
        window.location.href = "game2.html"
    }
})

start3.addEventListener('click', function(){
    
    let nameInp = document.getElementById('name') 
  
    if (nameInp.value){
        var data = {
            name: nameInp.value,
            game1: 0,
            game2: 0,
            game3: 0
        }
        var jsonString = JSON.stringify(data);
        var userKey = 'user_' + localStorage.length;
        localStorage.setItem(userKey, jsonString)
        window.location.href = "game3.html"
    }
})



