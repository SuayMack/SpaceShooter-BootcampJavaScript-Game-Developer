const yourShip = document.querySelector('.player-shooter')
const playArea = document.querySelector('#main-play-area')
const aliensImg = ['/img/monster-1.png', '/img/monster-2.png', '/img/monster-3.png']

//movimento e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault()
        moveUp()
    } else if(event.key === 'ArrowDown') {
        event.preventDefault()
        moveDown()
    } else if(event.key === " ") {
        event.preventDefault()
        fireLaser()
    }
}

//subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition === "0px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position -=50;
        yourShip.style.top = `${position}px`;
    }
}

//descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
    if(topPosition === "550px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position +=50;
        yourShip.style.top = `${position}px`;
    }
}

//função tiro (dividida em 3 partes)

//cria o elemento tiro
function fireLaser() {
    let laser = createLaserElement()
    playArea.appendChild(laser)
    moveLaser(laser)
}

//coloca o laser saindo da nave
function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = '/img/shoot.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 10}px`
    return newLaser
}

// onde o laser vai sair
function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//Funçãopara inimigos
function createAliens() {
    let newAlien = document.createElement('img')
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]//sorteio de imagens
    newAlien.src = alienSprite
    newAlien.classList.add('alien')
    newAlien.classList.add('alien-transition')
    newAlien.style.left = '370px'
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`
    playArea.appendChild(newAlien)
    moveAlien(newAlien)
}

//movimentar inimigos
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')){
                alien.remove();
            } else {
                //gameOver();
            } 
            
        }else {
            alien.style.left = `${xPosition -4}px`;
        }
    }, 30)
}

//colisão com os monstros

window.addEventListener('keydown', flyShip)


