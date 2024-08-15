let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let isSoundOn = true;
let globalVolume = 0.5;
let globalNewLevel;


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
    'button2': resetGame,
    'load-level': () => {loadLevel(globalNewLevel);},
    'btn-back': () => moveBack()
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
function loadLevel(level = level1) {
    loadSoundState();

    document.getElementById('canvas-container').classList.add('d-block');
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('button2').classList.add('d-none');
    world.setLevel(level);
    
    backgroundMusic.play();
    mobileScroll();
};


/**
 * Ensures the scroll to canvas on mobile and then disables the overflow.
 */
function mobileScroll() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        document.getElementById('canvas').scrollIntoView({ behavior: 'smooth' });
    };
    setTimeout(() => {
        document.body.style.overflow = 'hidden';
    }, 500);
}

/**
 * Clears the current world and sets a new one.
 */
function reloadWorld() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    if (world) {
        if (world.level && world.level.endboss && world.level.endboss[0]) {
            world.level.endboss[0].stopWinSound();
        }
        world.clearWorld();
    }
    let canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    world = new World(canvas, keyboard);
};

/**
 * Resets the game by clearing the world, adding new world, creating a new level and load it.
 */
function resetGame() {
    reloadWorld();
    let newLevel = createLevelNew();  
    loadLevel(newLevel);
};

/**
 * Runs ontouch of the back-button responsive. Reloads world but in difference to resetGame()
 * not loading the level already.
 */
function moveBack() {
    reloadWorld();
    let newLevel = createLevelNew();
    globalNewLevel = newLevel;

    document.getElementById('canvas-container').classList.remove('d-block');
    document.getElementById('menu').classList.remove('d-none');
    document.body.style.overflow = 'auto';
};

/**
 * Displays the info layer or the legal notice layer with description of the keys needed.
 */
function showInfoLayer(img) {
    let infoLayer = document.getElementById('info-layer'); 
    infoLayer.classList.remove('d-none');
    infoLayer.innerHTML = '';

    if (img.src.includes('impr')) {
        infoLayer.innerHTML += getImprHTML();
    } else {
        infoLayer.innerHTML += getInfoHTML();
    };
};

/**
 * @returns the HTML code for info layer
 */
function getInfoHTML() {
    return `
        <div id="info-inner-layer">
            <div onclick="closeInfoLayer()" class="close">
                <img src="./img/close.svg" alt="">
            </div>
            <table>
                <tr>
                    <td><p>">"</p></td>
                    <td><p class="right">RIGHT</p></td>
                </tr>
                <tr>
                    <td><p>"&lt;"</p></td>
                    <td><p class="right">LEFT</p></td>
                </tr>
                <tr>
                    <td><p>"SPACE"</p></td>
                    <td><p class="right">JUMP</p></td>
                </tr>
                <tr>
                    <td><p>"D"</p></td>
                    <td><p class="right">THROW</p></td>
                </tr>
            </table>
        </div>
    `;
};

/**
 * @returns the HTML code for legal notice
 */
function getImprHTML() {
    return `
    <div id="info-inner-layer">
            <div class="impressum-out">
                <div onclick="closeInfoLayer()" class="close">
                    <img src="./img/close.svg" alt="">
                </div>
                <div class="impressum">
                    <h1>Impressum</h1>
                    <p>Axel Zimmermann</p>
                    <p>Fuhlsbüttler Straße 415C</p>
                    <p>22309 Hamburg</p>
                    

                    <h3>Kontakt</h3>
                    <p>Telefon: +49 (40) 51 444 101</p>
                    <p>E-Mail: a.zimmermann@cash-online.de</p>

                    <h3>Redaktionell verantwortlich</h3>
                    <p>Axel Zimmermann</p>
                    <p>Fuhlsbüttler Straße 415C</p>
                    <p>22309 Hamburg</p>
                </div>
            </div>
        </div>
    `
}

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
    backgroundMusic.currentTime = 0; 
    backgroundMusic.play();
};

/**
 * Mutes and demutes the global sound of the game. At the end saves the stat in localStorage.
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
    localStorage.setItem('isSoundOn', isSoundOn);
};

/**
 * Reloads the current sound state, loud or mute, from localStorage.
 */
function loadSoundState() {
    let savedSoundState = localStorage.getItem('isSoundOn');
    if (savedSoundState !== null) {
        isSoundOn = (savedSoundState === 'true'); 
        if (isSoundOn) {
            globalVolume = 0.5;
            document.getElementById('sound').src = "img/sound-on.png";
            document.getElementById('btn-sound').src = "img/sound-on.png";
        } else {
            globalVolume = 0;
            document.getElementById('sound').src = "img/sound-off.png";
            document.getElementById('btn-sound').src = "img/sound-off.png";
        };
        backgroundMusic.volume = globalVolume;
    };
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
    element.style.transform = 'scale(0.9)'; 
    element.style.transition = 'transform 0.1s ease'; 
};

/**
 * Deactivates the buttons and rescales them.
 * @param {id} button 
 * @param {id} element 
 */
function mobileTouchend(button, element) {
    keyboard[button.key] = false;
    element.style.transform = 'scale(1)'; 
    element.style.transition = 'transform 0.1s ease'; 
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