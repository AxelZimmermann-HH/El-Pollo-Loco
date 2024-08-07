let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    backgroundMusic = new Audio('../audio/music.wav');
    backgroundMusic.loop = true; // Musik im Loop abspielen
    backgroundMusic.volume = 0.5;
}

function loadLevel() {
    document.getElementById('canvas-container').classList.add('d-block');
    document.getElementById('menu').classList.add('d-none');
    world.loadLevel(level1);
    backgroundMusic.play();
}

function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

function restartBackgroundMusic() {
    backgroundMusic.currentTime = 0; // Musik von vorn starten
    backgroundMusic.play();
}

function resetGame() {
    location.href = location.origin + location.pathname + '?start=true';
}

function checkStartParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('start')) {
        loadLevel();
    }
}


window.addEventListener("keydown", (e) => {
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    };
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    };
    if(e.keyCode == 38) {
        keyboard.UP = true;
    };
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    };
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    };
    if(e.keyCode == 68) {
        keyboard.THR = true;
    };
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    };
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    };
    if(e.keyCode == 38) {
        keyboard.UP = false;
    };
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    };
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    };
    if(e.keyCode == 68) {
        keyboard.THR = false;
    };
});
