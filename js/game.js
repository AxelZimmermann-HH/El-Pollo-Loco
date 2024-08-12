let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let isSoundOn = true;
let globalVolume = 0.5;

const keyMap = {
    32: 'SPACE',
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    68: 'THR'
};

const mobileButtons = [
    { id: 'btn-left', key: 'LEFT' },
    { id: 'btn-right', key: 'RIGHT' },
    { id: 'btn-jump', key: 'SPACE' },
    { id: 'btn-throw', key: 'THR' }
];

const touchHandlers = {
    'btn-sound': toggleSound,
    'btn-fullscreen': (e) => toggleFullScreen(e),
    'button2': resetGameMobile,
    'load-level': loadLevel
};

/**
 * Initializes the site with body onload.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    backgroundMusic = new Audio('audio/music.wav');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
};

/**
 * Loads the level in the world and runs via onclick on the play-button. Ensures that
 * the level isn't running before starting the game.
 */
function loadLevel() {
    document.getElementById('canvas-container').classList.add('d-block');
    document.getElementById('menu').classList.add('d-none');
    world.loadLevel(level1);
    backgroundMusic.play();

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.getElementById('canvas').scrollIntoView({ behavior: 'smooth' });}
};

/**
 * Is needed for reset the game. If there is "start" in the URL, the level is loaded directly.
 */
function checkStartParameter() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('start')) {
        loadLevel();
    }
};

/**
 * Resets the game by reloading the site with a new parameter, then init() is running again and 
 * checkStartParameter() ensures that loadLevel() runs directly.
 */
function resetGame() {
    const newUrl = location.origin + location.pathname + '?start=true';
    location.href = newUrl;
};

/**
 * Has the same function as resetGame(), but runs on touchend on mobile devices via eventListener.
 * Ensures that reloading is possible.
 */
function resetGameMobile() {
    const newUrl = location.origin + location.pathname + '?start=true#canvas';

    if (location.href === newUrl) {
        location.reload();
    } else {
        setTimeout(() => {
            location.href = newUrl;
        }, 100);
    }
};

/**
 * Displays the info layer with description of the keys needed.
 */
function showInfoLayer() {
    let infoLayer = document.getElementById('info-layer'); 
    infoLayer.classList.remove('d-none');
};

/**
 * Hides the info layer with description of the keys needed.
 */
function closeInfoLayer() {
    let infoLayer = document.getElementById('info-layer');
    infoLayer.classList.add('d-none');
};

/**
 * Switches to full screen and back.
 * @param {event} event
 */
function toggleFullScreen(event) {
    if (event) {
        event.preventDefault(); 
    }

    let container = document.getElementById('canvas-responsive');
    if (!document.fullscreenElement) {
        container.requestFullscreen();        
    } else {
        document.exitFullscreen()
    }
};

/**
 * Pauses ONLY background music. Needed for example when the endboss comes in.
 * Not relevant for muting the game.
 */
function pauseBackgroundMusic() {
    backgroundMusic.pause();
};

/**
 * Restarts ONLY the background music.
 * Not relevant for muting the game.
 */
function restartBackgroundMusic() {
    backgroundMusic.currentTime = 0; // Musik von vorn starten
    backgroundMusic.play();
};

/**
 * Mutes and demutes the global sound of the game.
 */
function toggleSound() {
    if (isSoundOn) {
        globalVolume = 0;
        document.getElementById('sound').src = "img/sound-off.png";
        document.getElementById('btn-sound').src = "img/sound-off.png";
    } else {
        globalVolume = 0.5;
        document.getElementById('sound').src = "img/sound-on.png";
        document.getElementById('btn-sound').src = "img/sound-on.png";
    };
    isSoundOn = !isSoundOn;
    backgroundMusic.volume = globalVolume; 
};

/**
 * Running handleKey on keydown.
 */
window.addEventListener("keydown", (e) => handleKey(e, true));

/**
 * Stops handleKey on keyup.
 */
window.addEventListener("keyup", (e) => handleKey(e, false));

/**
 * Adds the eventListeners to the mobile buttons for playing on mobile devices.
 */
mobileButtons.forEach(button => {
    let element = document.getElementById(button.id);
    
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        mobileTouchstart(button, element);
    });

    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        mobileTouchend(button, element);
    });
});

/**
 * Activates the buttons and scales them.
 * @param {id} button 
 * @param {id} element 
 */
function mobileTouchstart(button, element) {
    keyboard[button.key] = true;
    element.style.transform = 'scale(0.9)'; // Verkleinern der Schaltfläche
    element.style.transition = 'transform 0.1s ease'; // Übergangseffekt hinzufügen
};

/**
 * Deactivates the buttons and rescales them.
 * @param {id} button 
 * @param {id} element 
 */
function mobileTouchend(button, element) {
    keyboard[button.key] = false;
    element.style.transform = 'scale(1)'; // Zurück zur Originalgröße
    element.style.transition = 'transform 0.1s ease'; // Übergangseffekt hinzufügen
};

/**
 * Sets the toch handlers which only need a touchend event.
 */
Object.keys(touchHandlers).forEach(id => {
    document.getElementById(id).addEventListener('touchend', (e) => {
        e.preventDefault();
        touchHandlers[id](e);
    });
});

/**
 * Ensures that the keyboard on desktop is running by returning isPressed if a defined key is pressed.
 * @param {event} e 
 * @param {boolean} isPressed 
 */
function handleKey(e, isPressed) {
    if (keyMap[e.keyCode] !== undefined) {
        keyboard[keyMap[e.keyCode]] = isPressed;
    }
};