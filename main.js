
let trashDom = document.querySelector(".trash img")
let bins = document.querySelectorAll(".trashBins img")

let trashes = loadTrashes()
let trash = getRandomTrash()
trashDom.src = trash.src
trashDom.name = trash.type

let score = 0
let scoreText = document.querySelector('h4')
scoreText.innerHTML = "Score: " + score

let timer = 5
let timerText = document.querySelector('h3')
timerText.innerHTML = 5

let gameOver = false
let gameOverBox = document.querySelector(".gameOver")
gameOverBox.style.display = 'none'

let replayBtn = document.getElementById('replayBtn')

replayBtn.onclick = function(){
    timer = 6
    gameOverBox.style.display = 'none'
    score = 0
    gameOver = false
    let trash = getRandomTrash()
    trashDom.src = trash.src
    trashDom.name = trash.type
}

setInterval(()=>{
    timer -= 1
    if(timer <= 0){
        timer = 0
        gameOverBox.style.display = 'block'
        gameOver = true
    }
    timerText.innerHTML = timer
    
},1000)

bins.forEach(bin=>{
    bin.addEventListener("dragover",dragTrashOverBin)
    bin.addEventListener("drop",dropTrash)
})


function dragTrashOverBin(event){
    if(gameOver){
        return
    }
    event.preventDefault();
}

function dropTrash(event){
    event.preventDefault();
    bin = event.target
    if(trashDom.name == bin.name){
        trash = getRandomTrash()
        trashDom.src = trash.src
        trashDom.name = trash.type
        timer = 6
        score += 1
        scoreText.innerHTML = "Score: " + score
    }
}

function getRandomTrash(){
    let randomIndex = Math.floor(Math.random() * trashes.length)
    return trashes[randomIndex]
}

function loadTrashes(){
    let trashes = []
    for(let i = 1 ; i <= 4;i++){
        trashes.push({
            type:'glass',
            src: `assets/trash/glass/${i}.png`
        })
        trashes.push({
            type:'hazardous',
            src: `assets/trash/hazardous/${i}.png`
        })
        trashes.push({
            type:'metal',
            src: `assets/trash/metal/${i}.png`
        })
        trashes.push({
            type:'organic',
            src: `assets/trash/organic/${i}.png`
        })
        trashes.push({
            type:'paper',
            src: `assets/trash/paper/${i}.png`
        })
        trashes.push({
            type:'plastic',
            src: `assets/trash/plastic/${i}.png`
        })
    }
    return trashes
}