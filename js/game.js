let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let isSoundOn = true;
let globalVolume = 0.5;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    backgroundMusic = new Audio('audio/music.wav');
    backgroundMusic.loop = true; // Musik im Loop abspielen
    backgroundMusic.volume = 0.5;
}

function showInfoLayer() {
    const infoLayer = document.getElementById('info-layer');
    
    infoLayer.classList.remove('d-none');
}

function closeInfoLayer() {
    const infoLayer = document.getElementById('info-layer');
    infoLayer.classList.add('d-none');
}

function toggleFullScreen() {
    const container = document.getElementById('canvas-responsive');

    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { // Firefox
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { // Chrome, Safari and Opera
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { // IE/Edge
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}



// Event-Listener für das Vollbild
document.getElementById('full-screen').addEventListener('click', toggleFullScreen);





function loadLevel() {
    document.getElementById('canvas-container').classList.add('d-block');
    document.getElementById('menu').classList.add('d-none');
    world.loadLevel(level1);
    backgroundMusic.play();

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        toggleFullScreen();}
}



function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

function restartBackgroundMusic() {
    backgroundMusic.currentTime = 0; // Musik von vorn starten
    backgroundMusic.play();
}

function resetGame() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        toggleFullScreen(); // Fullscreen aktivieren, bevor die Seite neu geladen wird
    }

    setTimeout(() => {
        location.href = location.origin + location.pathname + '?start=true';
    }, 100); // Kurzer Timeout, um den Fullscreen-Modus zu aktivieren, bevor die Seite neu geladen wird
}

function checkStartParameter() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('start')) {
        loadLevel();
    }
}

function toggleSound() {
    if (isSoundOn) {
        // backgroundMusic.volume = 0; // Setze die Lautstärke auf 0
        globalVolume = 0;
        document.getElementById('sound').src = "img/sound-off.png";
    } else {
        // backgroundMusic.volume = 0.5; // Stelle die Lautstärke wieder her
        globalVolume = 0.5;
        document.getElementById('sound').src = "img/sound-on.png";
    }
    isSoundOn = !isSoundOn; // Toggle den Status von isSoundOn
    backgroundMusic.volume = globalVolume; 
}

const mobileButtons = [
    { id: 'btn-left', key: 'LEFT' },
    { id: 'btn-right', key: 'RIGHT' },
    { id: 'btn-jump', key: 'SPACE' },
    { id: 'btn-throw', key: 'THR' }
];

mobileButtons.forEach(button => {
    let element = document.getElementById(button.id);
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[button.key] = true;
    });

    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[button.key] = false;
    });
});



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
