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
};

let clouds = [
    new Cloud('../img/5_background/layers/4_clouds/1.png', -100),
    new Cloud('../img/5_background/layers/4_clouds/2.png', 620),
    new Cloud('../img/5_background/layers/4_clouds/1.png', 1340),
    new Cloud('../img/5_background/layers/4_clouds/2.png', 2060)

    
];
// let clouds = [];
// for (let i = 0; i < numRepetitions; i++) {
//     let xOffset = 720 * i; // Abstand von 720px pro Iteration
//     clouds.push(new Cloud('../img/5_background/clouds/1.png', xOffset, 50));
//     clouds.push(new Cloud('../img/5_background/clouds/2.png', xOffset + 720, 50));
// }

let coins = [
    new Coins('../img/8_coin/coin_2.png', 400, 180, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 460, 150, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 520, 180, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 620, 150, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 680, 240, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 880, 150, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 1000, 230, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 1150, 200, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 1225, 185, 100, 100),
    new Coins('../img/8_coin/coin_2.png', 1300, 170, 100, 100),
];

let bottles = [
    new Bottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 250, 360, 80, 80),
    new Bottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 330, 360, 80, 80),
    new Bottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 480, 360, 80, 80),
    new Bottle('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 880, 360, 80, 80),
    new Bottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 950, 360, 80, 80),
    new Bottle('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1300, 360, 80, 80)
];  





const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(), 
    ],
    [
        new Endboss()
    ],

    clouds,
    bgObjects,
    coins,
    bottles
);
