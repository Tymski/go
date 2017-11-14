game.width = 1350;
game.height = 700;

tileSize = 50;

currentPlayer = 0;

switchPlayersBool = false;

game.oncontextmenu = function (e) {
    e.preventDefault();
};

var renderer = PIXI.autoDetectRenderer(
    game.width,
    game.height, {
        view: document.getElementById("game"),
    }
);



var stage = new PIXI.Container();
var stones = new PIXI.Container();
var tiles = new PIXI.Container();
var borders = new PIXI.Container();

var background = PIXI.Sprite.fromImage('img/Blank.png');
background.width = renderer.width * 1.2;
background.height = renderer.height * 1.2;
stage.addChild(background);

stage.addChild(tiles);
stage.addChild(borders);
stage.addChild(stones);

var textures = {}

textures.cross = PIXI.Texture.fromImage('img/Cross.png');
textures.blackRoundStone = PIXI.Texture.fromImage('img/BlackRoundStone.png');
textures.whiteRoundStone = PIXI.Texture.fromImage('img/WhiteRoundStone.png');
textures.blackSquareStone = PIXI.Texture.fromImage('img/BlackSquareStone.png');
textures.whiteSquareStone = PIXI.Texture.fromImage('img/WhiteSquareStone.png');
textures.crossDot = PIXI.Texture.fromImage('img/CrossDot.png');
textures.blank = PIXI.Texture.fromImage('img/Blank.png');
textures.empty = PIXI.Texture.fromImage('img/Empty.png');

playerTextures = [];
playerTextures.push(textures.blackRoundStone);
playerTextures.push(textures.whiteRoundStone);
playerTextures.push(textures.blackSquareStone);
playerTextures.push(textures.whiteSquareStone);




width = 25;
height = 13;

for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
        let bg = new PIXI.Sprite(textures.cross);
        bg.width = tileSize;
        bg.height = tileSize;
        bg.anchor.set(0.5);
        bg.x = (tileSize - 1) * x;
        bg.y = (tileSize - 1) * y;
        tiles.addChild(bg);


        let sprite = new PIXI.Sprite(textures.empty);
        sprite.width = tileSize;
        sprite.height = tileSize;
        sprite.anchor.set(0.5);
        sprite.x = (tileSize - 1) * x;
        sprite.y = (tileSize - 1) * y;
        sprite.interactive = true;
        sprite.on('pointerdown', onPointerDown);
        stones.addChild(sprite);

        if (x % 6 == 4 && y % 6 == 4) {
            bg.texture = textures.crossDot;
        }
    }
}

for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
        if (x == 0) {
            let sprite = new PIXI.Sprite(textures.blank);
            sprite.width = tileSize;
            sprite.height = tileSize;
            sprite.anchor.set(0.5);
            sprite.x = (tileSize - 1) * x + tileSize / 2 - 2;
            sprite.y = (tileSize - 1) * y;
            borders.addChild(sprite);
        }
        if (x == width) {
            let sprite = new PIXI.Sprite(textures.blank);
            sprite.width = tileSize;
            sprite.height = tileSize;
            sprite.anchor.set(0.5);
            sprite.x = (tileSize - 1) * x + tileSize / 2 + 1;
            sprite.y = (tileSize - 1) * y;
            borders.addChild(sprite);
        }
        if (y == 0) {
            let sprite = new PIXI.Sprite(textures.blank);
            sprite.width = tileSize;
            sprite.height = tileSize;
            sprite.anchor.set(0.5);
            sprite.x = (tileSize - 1) * x;
            sprite.y = (tileSize - 1) * y + tileSize / 2 - 2;
            borders.addChild(sprite);
        }
        if (y == height) {
            let sprite = new PIXI.Sprite(textures.blank);
            sprite.width = tileSize;
            sprite.height = tileSize;
            sprite.anchor.set(0.5);
            sprite.x = (tileSize - 1) * x + tileSize / 2 + 1;
            sprite.y = (tileSize - 1) * y + tileSize / 2 + 1;
            borders.addChild(sprite);
        }
    }
}

function onPointerDown(event) {
    console.log(event.data.button);
    if (event.data.button == 2) {
        if ((this.player == (currentPlayer + 3) % 4 && switchPlayersBool) ||
            (this.player == currentPlayer && !switchPlayersBool)) {
            this.texture = textures.empty;
        }
        if (switchPlayersBool && this.player == (currentPlayer + 3) % 4) {
            switchPlayers();
            switchPlayers();
            switchPlayers();
            this.texture = textures.empty;
        }
    } else {
        if (this.texture == textures.empty) {
            this.texture = playerTextures[currentPlayer];
            this.player = currentPlayer;
            if (switchPlayersBool) {
                switchPlayers();
            }
        }
    }

}

requestAnimationFrame(update);

function update() {
    renderer.render(stage);
    requestAnimationFrame(update);
}

function changePlayer(n) {
    document.getElementById("p" + 0).classList.remove("selected");
    document.getElementById("p" + 1).classList.remove("selected");
    document.getElementById("p" + 2).classList.remove("selected");
    document.getElementById("p" + 3).classList.remove("selected");
    document.getElementById("p" + n).classList.add("selected");
    currentPlayer = n;
    console.log(n);
}

function switchPlayers(params) {
    currentPlayer += 1;
    currentPlayer %= 4;
    changePlayer(currentPlayer);
}

function switchswitch(a) {
    switchPlayersBool = !switchPlayersBool;
    a.classList.toggle("turnedOn");
}