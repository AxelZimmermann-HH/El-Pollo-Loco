let bgObjects = [];

const numRepetitions = 10; // Anzahl der Wiederholungen
for (let i = -2; i < numRepetitions; i++) {
    let xOffset = 1440 * i; // Abstand von 1440px pro Iteration
    bgObjects.push(new BgObject('../img/5_background/layers/air.png', xOffset, 0));
    bgObjects.push(new BgObject('../img/5_background/layers/3_third_layer/1.png', xOffset, 75));
    bgObjects.push(new BgObject('../img/5_background/layers/2_second_layer/1.png', xOffset, 75));
    bgObjects.push(new BgObject('../img/5_background/layers/1_first_layer/1.png', xOffset, 75));
    bgObjects.push(new BgObject('../img/5_background/layers/air.png', xOffset + 720, 0));
    bgObjects.push(new BgObject('../img/5_background/layers/3_third_layer/2.png', xOffset + 720, 75));
    bgObjects.push(new BgObject('../img/5_background/layers/2_second_layer/2.png', xOffset + 720, 75));
    bgObjects.push(new BgObject('../img/5_background/layers/1_first_layer/2.png', xOffset + 720, 75));
}




const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(), 
        new Endboss()
    ],

    [
        new Cloud()
    ],

    bgObjects
);
