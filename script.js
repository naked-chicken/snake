var canvasWidth = 1000; //px  900
var canvasHeight = 700; // 600
var border = 50;
var blockSize = 30; //taille block
var ctx;
var delay = 100; //ms
var snakee;
var applee;
var widthInBlocks = (canvasWidth - 2 * border) / blockSize; // 30 block sur 20 block
var heightInBlocks = (canvasHeight - 2 * border) / blockSize;
var score = 0;
var isGameOver = false;
var isOn = false;
var chronoS = 0;
var chronoM = 0;

var startImgObj = new Image();
var imageObj = new Image();
var bgObj = new Image();
var snakeAvatar = new Image();
var wasted = new Image();

let dead1 = new Audio();
let dead2 = new Audio();
let dead0 = new Audio();

let loop0 = new Audio();
let loop1 = new Audio();
let loop2 = new Audio();

let crunch = new Audio();

//music button
var loop = true;
var musicButOff = new Image();
var musicButOn = new Image();
var rectMusicBut = {
    x: 0,
    y: 200,
    width: 50,
    height: 50
}

//sound button
var sound = true;
var soundButOff = new Image();
var soundButOn = new Image();
var rectSoundBut = {
    x: 950,
    y: 200,
    width: 50,
    height: 50
}



window.onload = function () {
    startImgObj.src = 'images/start-game.png';
    bgObj.src = 'images/summer_grass_vector_background_533027.jpg';
    imageObj.src = 'images/Apple-Fruit.png';
    snakeAvatar.src = 'images/snake.png';
    wasted.src = 'images/wasted.png';

    soundButOff.src = 'images/soundOff.png';
    soundButOn.src = 'images/soundOn.png';

    musicButOff.src = 'images/musicOff.png';
    musicButOn.src = 'images/musicOn.png';

    loop0.src = 'audio/loop0.wav';
    loop1.src = 'audio/loop1.wav';
    loop2.src = 'audio/loop2.wav';

    dead0.src = 'audio/nooo.mp3';
    dead1.src = 'audio/you-lose-street-fighter-ii-sound-clip-quote-mp3-and-ringtone.mp3';
    dead2.src = 'audio/paul-le-guen-nrv.mp3'

    crunch.src = 'audio/crunch.wav';

    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // canvas.style.border = "30px solid gray";
    canvas.style.border = "3px solid black";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#ddd";

    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    bordure();
    title();
    bgObj.onload = function () {
        bgImg();
    }
    snakeAvatar.onload = function () {
        avatarSnake();
    }

    soundButOn.onload = function () {
        SoundBut();
    }
    musicButOn.onload = function () {
        MusicBut();
    }
    //    startImgObj.onload = function () {
    //        console.log('start')
    //        startImg();
    //    }

    //    // IMG
    //    var imageObj = new Image();
    //    imageObj.onload = function () {
    //        ctx.drawImage(imageObj, 0, 0);
    //    };
    //    imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

    //----------------------- CLICK------------------------------------------------------------
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    //Function to check whether a point is inside a rectangle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }

    //Binding the click event on the canvas
    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);

        //sound effects
        if (isInside(mousePos, rectSoundBut)) {
            if (sound) {
                sound = false;
                SoundBut();
            } else {
                sound = true;
                SoundBut();
            }
        } else {}

        //music
        if (isInside(mousePos, rectMusicBut)) {
            if (loop) {
                loop = false;
                MusicBut();
                loop0.pause();
                loop1.pause();
                loop2.pause();

            } else {
                loop = true;
                MusicBut();
                if (isOn)
                    musicLoop();
            }
        }
    }, false);
}

//-------------------buttuns
function SoundBut() {
    if (sound) {
        ctx.clearRect(960, 200, 40, 40); // effacer le canvas
        ctx.fillStyle = "grey";
        ctx.fillRect(960, 200, 40, 40);
        ctx.fill(); // remplissage
        ctx.drawImage(soundButOn, 960, 200, 40, 40);

    } else {
        ctx.clearRect(960, 200, 40, 40); // effacer le canvas
        ctx.fillStyle = "grey";
        ctx.fillRect(960, 200, 40, 40);
        ctx.fill(); // remplissage
        ctx.drawImage(soundButOff, 965, 205, 30, 30);
    }
}

function MusicBut() {
    if (loop) {
        ctx.clearRect(5, 195, 40, 40); // effacer le canvas
        ctx.fillStyle = "grey";
        ctx.fillRect(5, 195, 40, 40);
        ctx.fill(); // remplissage
        ctx.drawImage(musicButOn, 5, 195, 40, 40);

    } else {
        ctx.clearRect(5, 195, 40, 40); // effacer le canvas
        ctx.fillStyle = "grey";
        ctx.fillRect(5, 195, 40, 40);
        ctx.fill(); // remplissage
        ctx.drawImage(musicButOff, 10, 200, 30, 30);
    }
}

//------------------music loop
function musicLoop() {
    if (loop && !isGameOver) {
        var s = Math.floor(Math.random() * 3);
        switch (s) {
            case 0:
                loop0.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                loop0.play();
                break;
            case 1:
                loop1.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                loop1.play();
                break;
            case 2:
                loop2.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                loop0.play();
            default:
                loop1.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                loop1.play();
        }
    }
}
//stop music
function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

//-------------------------------decoration------------------------------------------
function bordure() {
    //bordure
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fill(); // remplissage
    //M
    ctx.font = "small-caps 25px Arial";
    ctx.fillStyle = "#F5DA81";
    ctx.fillText("M", 5, 270);
    //S
    ctx.font = "small-caps 25px Arial";
    ctx.fillStyle = "#F5DA81";
    ctx.fillText("S", 980, 270);
}

function title() {
    // Title
    ctx.font = "bold 35px Permanent Marker";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#0000b3"; // stroke --> contour de la lettre
    ctx.lineWidth = "10";
    ctx.textAlign = "center";
    var centerX = canvasWidth / 2;
    var centerY = border / 2;
    ctx.textBaseline = "middle";
    ctx.strokeText("Psychedelic Snake", centerX, centerY);
    ctx.fillText("Psychedelic Snake", centerX, centerY);
}

function avatarSnake() {
    ctx.save;
    ctx.shadowColor = "transparent";
    ctx.drawImage(snakeAvatar, canvasWidth / 6, 0, border, border);
    ctx.drawImage(snakeAvatar, 5 * canvasWidth / 6 - border, 0, border, border);

    ctx.restore();
}

function bgImg() {
    ctx.save;
    //shadow
    //  ctx.fillStyle = "black";
    ctx.shadowInset = true;
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor = "black";
    // img background
    ctx.drawImage(bgObj, border, border, canvasWidth - 2 * border, canvasHeight - 2 * border);

    ctx.restore();
    ctx.shadowColor = "transparent";
    if (!isOn)
        startImgObj.onload =
        startImg();
}


function startImg() {
    ctx.save;
    ctx.drawImage(startImgObj, 3 * border, 2 * border, canvasWidth - 6 * border, canvasHeight - 6 * border);

    ctx.font = "bold 40px sans-serif";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white"; // stroke --> contour de la lettre
    ctx.lineWidth = "5";
    ctx.textAlign = "center";
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;
    ctx.textBaseline = "middle";
    ctx.strokeText("Appuyer sur la touche Espace pour jouer", centerX, centerY + 180);
    ctx.fillText("Appuyer sur la touche Espace pour jouer", centerX, centerY + 180);
    ctx.restore();
}

//---------------- LUNCH ---------------------------------------------------
function lunch() {
    musicLoop();

    isOn = true;
    snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right"); //snake de départ avec coord de chaque block
    applee = new Apple([10, 10]);
    chronoUp();
    refreshCanvas();
    //setInterval(refreshCanvas, 100)
}

//-------------------- REFRESH ------------------------------------------------
function refreshCanvas() {

    //new snake
    snakee.advance();
    if (snakee.checkCollision()) {
        gameOver(); //game over
    } else {

        if (snakee.isEatingApple(applee)) { // a mangé la pomme
            if (sound) {
                crunch.play();
            }
            snakee.ateApple = true;
            score++;
            do {
                applee.setNewPosition();
            }
            while (applee.isOnSnake(snakee));

        }
        ctx.clearRect(border, border, canvasWidth - 2 * border, canvasHeight - border); //efface le snake


        bordure();
        //        ctx.fillStyle = "grey";
        //        ctx.fillRect(border, border, canvasWidth - 2 * border, canvasHeight - border);
        //        ctx.fill(); // remplissage
        title();
        avatarSnake();
        bgImg();
        drawScore();
        drawChrono();
        SoundBut();
        MusicBut();
        applee.draw();
        snakee.draw();

        setTimeout(refreshCanvas, delay);
    }
}

//-------------------------------CHRONO----------------------------------------------
function chronoUp() {
    chronoS++;
    if (chronoS === 60) {
        chronoM++;
        chronoS = 0;
    }
    if (!isGameOver) {
        setTimeout(chronoUp, 1000);
    }
}

//------------------------------ Game Over et Restart------------------------------------
function gameOver() {
    isGameOver = true;
    stopAudio(loop0);
    stopAudio(loop1);
    stopAudio(loop2);

    //random sound
    if (sound) {
        var s = Math.floor(Math.random() * 3);
        switch (s) {
            case 0:
                dead0.play();
                break;
            case 1:
                dead1.play();
                break;
            case 2:
                dead2.play();
            default:
                dead2.play();
        }
    }

    ctx.save();

    ctx.drawImage(wasted, border, 0, canvasWidth - 2 * border, canvasHeight);

    setTimeout(gameOvertext, 1500);
    ctx.restore();
}

function gameOvertext() {
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white"; // stroke --> contour de la lettre
    ctx.lineWidth = "5";
    ctx.textAlign = "center";
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;
    ctx.textBaseline = "middle";

    ctx.strokeText("Game Over", centerX, centerY - 180);
    ctx.fillText("Game Over", centerX, centerY - 180);

    ctx.font = "bold 40px sans-serif";
    ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centerX, centerY + 180);
    ctx.fillText("Appuyer sur la touche Espace pour rejouer", centerX, centerY + 180);

}

function restart() {
    isGameOver = false;
    musicLoop();
    score = 0;
    chronoS = 0;
    chronoM = 0;
    snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right"); //snake de départ avec coord de chaque block
    applee = new Apple([10, 10]);
    refreshCanvas();
    chronoUp();
}

//--------------------------- SCORE & CHRONO -------------------------------------------------------------------
function drawScore() {
    ctx.shadowColor = "transparent";

    ctx.save();
    ctx.font = "bold 40px sans-serif";
    ctx.strokeStyle = "black"; // stroke --> contour de la lettre
    ctx.lineWidth = "4";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    var centerX = canvasWidth - 3 * border;
    var centerY = canvasHeight - border / 2;
    ctx.textBaseline = "middle";
    ctx.strokeText("score: " + score.toString(), centerX, centerY);
    ctx.fillText("score: " + score.toString(), centerX, centerY);
    ctx.restore();
}

function drawChrono() {
    ctx.shadowColor = "transparent";

    ctx.save();
    ctx.font = "bold 40px sans-serif";
    ctx.strokeStyle = "black"; // stroke --> contour de la lettre
    ctx.lineWidth = "4";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    var centerX = 25;
    var centerY = canvasHeight - border / 2;
    ctx.textBaseline = "middle";
    ctx.strokeText(chronoM.toString() + " min  " + chronoS.toString() + " sec", centerX + 50 + canvasWidth / 8, centerY);
    ctx.fillText(chronoM.toString() + " min  " + chronoS.toString() + " sec", centerX + 50 + canvasWidth / 8, centerY);
    ctx.restore();
}

//----------------------- DRAW Snake ------------------------------------------------

var r = function () { // random color
    return Math.floor(Math.random() * 256)
};

//------------- BODY ----------
function drawBlock(ctx, position, bodyDirection, bodyColor) { // body
    radius = blockSize;

    var x = position[0] * blockSize + border; // en px
    var y = position[1] * blockSize + border;
    ctx.beginPath();
    ctx.fillStyle = bodyColor;

    switch (bodyDirection) {
        case "normal":
            ctx.fillRect(x, y, blockSize, blockSize); //collorie le block
            break;
        case "down_right":
            x = x;
            y = y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, Math.PI / 2, 0, true); // demi-cercle
            ctx.lineTo(x, y);
            ctx.fill(); // remplissage           
            break;
        case "up_right":
            x = x;
            y = y + blockSize;
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, -Math.PI / 2, true); // demi-cercle
            ctx.lineTo(x, y);
            ctx.fill(); // remplissage           
            break;
        case "down_left":
            x = x + blockSize;
            y = y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, -Math.PI, -3 * Math.PI / 2, true); // demi-cercle
            ctx.lineTo(x, y);
            ctx.fill(); // remplissage
            break;
        case "up_left":
            x = x + blockSize;
            y = y + blockSize;
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, -Math.PI / 2, Math.PI, true); // demi-cercle
            ctx.lineTo(x, y);
            ctx.fill(); // remplissage

            break;
        default:
            throw ("invalid direction");
    }
    ctx.closePath();

}

//------------ HEAD --------------------
function drawHead(ctx, position, direction) { // HEAD
    ctx.beginPath();
    ctx.fillStyle = "#005B96";
    var radius = blockSize / 2; //rayon
    var x = position[0] * blockSize + border + radius; //coordonnées du centre
    var y = position[1] * blockSize + border + radius;

    switch (direction) {
        case "left":
            ctx.arc(x, y, radius, -Math.PI / 2, Math.PI / 2, true); // demi-cercle
            //neck
            var x = position[0] * blockSize + blockSize / 2 + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize / 2, blockSize); //neck
            ctx.fill(); // remplissage

            break;
        case "right":
            ctx.arc(x, y, radius, Math.PI / 2, -Math.PI / 2, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize / 2, blockSize); //neck
            ctx.fill(); // remplissage 

            break;
        case "down":
            ctx.arc(x, y, radius, -Math.PI, 0, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize, blockSize / 2); //neck
            ctx.fill(); // remplissage  

            break;
        case "up":
            ctx.arc(x, y, radius, 0, -Math.PI, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + blockSize / 2 + border;
            ctx.fillRect(x, y, blockSize, blockSize / 2); //neck
            ctx.fill(); // remplissage

            break;
        default:
            throw ("invalid direction");
    }
    ctx.closePath();

}

//----------------langue-------
function drawTongue(ctx, position, direction) {
    ctx.beginPath();
    ctx.fillStyle = "#3D4046";

    //eating the apple
    if (snakee.ateApple) {
        switch (direction) {
            case "left":
                var x = position[0] * blockSize + border - blockSize; // en px
                var y = position[1] * blockSize + border + blockSize / 2 - blockSize / 10;
                ctx.fillRect(x, y, blockSize, blockSize / 5); //neck
                ctx.fill(); // remplissage

                break;
            case "right":
                var x = position[0] * blockSize + border + blockSize; // en px
                var y = position[1] * blockSize + border + blockSize / 2 - blockSize / 10;
                ctx.fillRect(x, y, blockSize, blockSize / 5); //neck
                ctx.fill(); // remplissage 

                break;
            case "down":
                var x = position[0] * blockSize + border + blockSize / 2 - blockSize / 10; // en px
                var y = position[1] * blockSize + border + blockSize;
                ctx.fillRect(x, y, blockSize / 5, blockSize); //neck
                ctx.fill(); // remplissage  

                break;
            case "up":
                var x = position[0] * blockSize + border + blockSize / 2 - blockSize / 10; // en px
                var y = position[1] * blockSize + border - blockSize;
                ctx.fillRect(x, y, blockSize / 5, blockSize); //neck
                ctx.fill(); // remplissage

                break;
            default:
                throw ("invalid direction");
        }
    } else {
        //Classic

        switch (direction) {
            case "left":
                var x = position[0] * blockSize + border - blockSize / 4; // en px
                var y = position[1] * blockSize + border + blockSize / 2 - blockSize / 20;
                ctx.fillRect(x, y, blockSize / 4, blockSize / 10); //neck
                ctx.fill(); // remplissage

                break;
            case "right":
                var x = position[0] * blockSize + border + blockSize; // en px
                var y = position[1] * blockSize + border + blockSize / 2 - blockSize / 20;
                ctx.fillRect(x, y, blockSize / 4, blockSize / 10); //neck
                ctx.fill(); // remplissage 

                break;
            case "down":
                var x = position[0] * blockSize + border + blockSize / 2 - blockSize / 20; // en px
                var y = position[1] * blockSize + border + blockSize;
                ctx.fillRect(x, y, blockSize / 10, blockSize / 4); //neck
                ctx.fill(); // remplissage  

                break;
            case "up":
                var x = position[0] * blockSize + border + blockSize / 2 - blockSize / 20; // en px
                var y = position[1] * blockSize + border - blockSize / 4;
                ctx.fillRect(x, y, blockSize / 10, blockSize / 4); //neck
                ctx.fill(); // remplissage

                break;
            default:
                throw ("invalid direction");
        }
    }
    ctx.closePath();

}

//------------ Narines --------------------
function drawNostrils(ctx, position, direction) { // Nostrils
    ctx.beginPath();
    ctx.fillStyle = "#3D4046";
    var radius = blockSize / 10; //rayon
    switch (direction) {

        case "left":
            var x1 = position[0] * blockSize + border + blockSize / 2;
            var y1 = position[1] * blockSize + border + 2 * blockSize / 3;
            var y2 = position[1] * blockSize + border + blockSize / 3;
            ctx.arc(x1, y1, radius, -Math.PI / 4, Math.PI / 4, true);
            // ctx.fill(); // remplissage
            ctx.arc(x1, y2, radius, -Math.PI / 4, Math.PI / 4, true);
            ctx.fill(); // remplissage

            break;
        case "right":
            var x1 = position[0] * blockSize + border + blockSize / 2;
            var y1 = position[1] * blockSize + border + 2 * blockSize / 3;
            var y2 = position[1] * blockSize + border + blockSize / 3;
            ctx.arc(x1, y1, radius, 3 * Math.PI / 4, -3 * Math.PI / 4, true);
            // ctx.fill(); // remplissage
            ctx.arc(x1, y2, radius, 3 * Math.PI / 4, -3 * Math.PI / 4, true);
            ctx.fill(); // remplissage

            break;
        case "down":
            var x1 = position[0] * blockSize + border + blockSize / 3;
            var x2 = position[0] * blockSize + border + 2 * blockSize / 3;
            var y1 = position[1] * blockSize + border + blockSize / 2;
            ctx.arc(x1, y1, radius, -Math.PI / 4, -3 * Math.PI / 4);
            ctx.fill(); // remplissage
            ctx.arc(x2, y1, radius, -Math.PI / 4, -3 * Math.PI / 4);
            ctx.fill(); // remplissage

            break;
        case "up":
            var x1 = position[0] * blockSize + border + blockSize / 3;
            var x2 = position[0] * blockSize + border + 2 * blockSize / 3;
            var y1 = position[1] * blockSize + border + blockSize / 2;
            ctx.arc(x1, y1, radius, Math.PI / 4, 3 * Math.PI / 4, true);
            ctx.fill(); // remplissage
            ctx.arc(x2, y1, radius, Math.PI / 4, 3 * Math.PI / 4, true);
            ctx.fill(); // remplissage
            break;
        default:
            throw ("invalid direction");
    }
    ctx.closePath();
}


//-------------- EYES -----------------------------
function drawEyes(ctx, position, direction) { //  EYES
    ctx.beginPath();

    var radius = blockSize / 5; //rayon

    var x1 = position[0] * blockSize + blockSize / 2 + border; //coordonnées du centre
    var y1 = position[1] * blockSize + radius + border; // 2 5eme
    var y11 = position[1] * blockSize + 4 * radius + border; // 2 5eme

    var x2 = position[0] * blockSize + radius + border; //coordonnées du centre
    var y2 = position[1] * blockSize + blockSize / 2 + border;
    var x22 = position[0] * blockSize + 4 * radius + border; //coordonnées du centre

    switch (direction) {
        case "right":
        case "left":
            ctx.beginPath(); // contour noir
            ctx.fillStyle = "black";
            ctx.arc(x1, y1, radius * 1.3, 0, 2 * Math.PI, true);
            ctx.arc(x1, y11, radius * 1.3, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage

            ctx.beginPath(); // contour blanc
            ctx.fillStyle = "white";
            ctx.arc(x1, y1, radius, 0, 2 * Math.PI, true);
            ctx.arc(x1, y11, radius, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage

            ctx.beginPath(); // pupille noir
            ctx.fillStyle = "black";
            ctx.arc(x1, y1, radius / 3, 0, 2 * Math.PI, true);
            ctx.arc(x1, y11, radius / 3, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage
            break;

        case "up":
        case "down":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x2, y2, radius * 1.3, 0, 2 * Math.PI, true);
            ctx.arc(x22, y2, radius * 1.3, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(x2, y2, radius, 0, 2 * Math.PI, true);
            ctx.arc(x22, y2, radius, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage

            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(x2, y2, radius / 3, 0, 2 * Math.PI, true);
            ctx.arc(x22, y2, radius / 3, 0, 2 * Math.PI, true);
            ctx.fill(); // remplissage
            break;

        default:
            throw ("invalid direction");
    }
    ctx.closePath();
}

//----------- TAIL -----------------------
function drawTail(ctx, position, direction) { // TAIL        
    ctx.beginPath();
    var radius = blockSize / 2; //rayon
    var x = position[0] * blockSize + radius + border; //coordonnées du centre
    var y = position[1] * blockSize + radius + border;
    ctx.fillStyle = "red";

    switch (direction) {
        case "right":
            ctx.arc(x, y, radius, -Math.PI / 2, Math.PI / 2, true); // demi-cercle
            var x = position[0] * blockSize + blockSize / 2 + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize / 2, blockSize); //neck
            ctx.fill(); // remplissage
            break;
        case "left":
            ctx.arc(x, y, radius, Math.PI / 2, -Math.PI / 2, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize / 2, blockSize); //neck
            ctx.fill(); // remplissage               
            break;
        case "up":
            ctx.arc(x, y, radius, -Math.PI, 0, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + border;
            ctx.fillRect(x, y, blockSize, blockSize / 2); //neck
            ctx.fill(); // remplissage
            break;
        case "down":
            ctx.arc(x, y, radius, 0, -Math.PI, true); // demi-cercle
            var x = position[0] * blockSize + border; // en px
            var y = position[1] * blockSize + blockSize / 2 + border;
            ctx.fillRect(x, y, blockSize, blockSize / 2); //neck
            ctx.fill(); // remplissage
            break;
        default:
            throw ("invalid direction");
    }
    ctx.closePath();

}
//----------------------------------------------------------------------------------------
//-----------------------SNAKE Constructor----------------------------------------------
function Snake(body, direction) { //constructor de snake
    this.body = body;
    this.direction = direction;
    this.ateApple = false;
    this.draw = function () {
        var size = this.body.length;

        ctx.save();

        drawHead(ctx, this.body[0], this.direction); // head
        drawTongue(ctx, this.body[0], this.direction); // langue

        //-------------- BODY----------------------------
        for (var i = 1; i < size - 1; i++) { // body

            var bodyDirection = "normal"; // direction du block par rapport à l'élément précédent et le suivant

            if (this.body[i + 1][0] + 1 === this.body[i][0] && this.body[i - 1][1] + 1 === this.body[i][1]) {
                bodyDirection = "down_right";
            }
            if (this.body[i - 1][0] + 1 === this.body[i][0] && this.body[i + 1][1] + 1 === this.body[i][1]) {
                bodyDirection = "down_right";
            }
            if (this.body[i + 1][0] + 1 === this.body[i][0] && this.body[i - 1][1] - 1 === this.body[i][1]) {
                bodyDirection = "up_right";
            }
            if (this.body[i - 1][0] + 1 === this.body[i][0] && this.body[i + 1][1] - 1 === this.body[i][1]) {
                bodyDirection = "up_right";
            }
            if (this.body[i + 1][0] - 1 === this.body[i][0] && this.body[i - 1][1] + 1 === this.body[i][1]) {
                bodyDirection = "down_left";
            }
            if (this.body[i - 1][0] - 1 === this.body[i][0] && this.body[i + 1][1] + 1 === this.body[i][1]) {
                bodyDirection = "down_left";
            }
            if (this.body[i + 1][0] - 1 === this.body[i][0] && this.body[i - 1][1] - 1 === this.body[i][1]) {
                bodyDirection = "up_left";
            }
            if (this.body[i - 1][0] - 1 === this.body[i][0] && this.body[i + 1][1] - 1 === this.body[i][1]) {
                bodyDirection = "up_left";
            }
            if (i === 1) {
                bodyColor = "#005B96";
            } else {
                bodyColor = "rgb(" + r() + "," + r() + "," + r() + ")";
            }
            drawBlock(ctx, this.body[i], bodyDirection, bodyColor);
        };

        //------------- TAIL--------------------------------
        var tailDirection = "up"; // direction de la tail par rapport à l'élément précédent
        if (this.body[size - 2][0] + 1 === this.body[size - 1][0]) {
            tailDirection = "left";
        }
        if (this.body[size - 2][0] - 1 === this.body[size - 1][0]) {
            tailDirection = "right";
        }
        if (this.body[size - 2][1] - 1 === this.body[size - 1][1]) {
            tailDirection = "down";
        }
        drawTail(ctx, this.body[size - 1], tailDirection); // tail
        drawEyes(ctx, this.body[1], this.direction); // eyes

        drawNostrils(ctx, this.body[0], this.direction); // nostrils

        ctx.restore();
    };

    this.advance = function () {
        var nextPosition = this.body[0].slice(); //paire de coordonnées de la tete
        switch (this.direction) {
            case "left":
                nextPosition[0]--;
                break;
            case "right":
                nextPosition[0]++;
                break;
            case "down":
                nextPosition[1]++;
                break;
            case "up":
                nextPosition[1]--;
                break;
            default:
                throw ("invalid direction");
        }
        this.body.unshift(nextPosition); //rajoute la nouvelle paire de coordonnées en tete

        if (!this.ateApple) {
            this.body.pop(); //supprime la derniere paire de coordonnées
        } else {
            this.ateApple = false;
        }
    };

    this.setDirection = function (newDirection) {
        var allowedDirections;
        switch (this.direction) {
            case "left":
            case "right":
                allowedDirections = ["up", "down"];
                break;
            case "down":
            case "up":
                allowedDirections = ["left", "right"];
                break;
            default:
                throw ("invalid direction");
        }
        if (allowedDirections.indexOf(newDirection) > -1) { //teste si la new direction appartient a allowed direction

            this.direction = newDirection;
        }
    };

    this.checkCollision = function () {
        var wallCollision = false;
        var snakeCollision = false;
        var head = this.body[0];
        var rest = this.body.slice(1);
        var snakeX = head[0];
        var snakeY = head[1];
        var minX = 0;
        var minY = 0;
        var maxX = widthInBlocks - 1;
        var maxY = heightInBlocks - 1;
        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
            wallCollision = true;
        }

        for (var i = 0; i < rest.length; i++) {
            if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                snakeCollision = true;
            }
        }

        return wallCollision || snakeCollision;
    };

    this.isEatingApple = function (appleToEat) {
        var head = this.body[0];
        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
            return true;
        else
            return false;
    };
}
//--------------------------------------------------------------------------------------------------------
//-------------------------------- APPLE Constructor -------------------------------------------------
function Apple(position) { // constructor apple
    this.position = position;

    this.draw = function () {
        ctx.save(); //sauvegarde des config du canvas  apple_PNG12455.png

        // IMG
        var x = this.position[0] * blockSize + border; //coordonnées du centre
        var y = this.position[1] * blockSize + border;
        //        var imageObj = new Image();
        //  imageObj.onload = function () {
        ctx.drawImage(imageObj, x, y, blockSize, blockSize);
        //  };
        //  imageObj.src = 'images/Apple.png';

        //        ctx.fillStyle = "#33cc33";
        //        ctx.beginPath();
        //        //        ctx.shadowBlur = 5;
        //        //        ctx.shadowOffsetX = 5;
        //        //        ctx.shadowOffsetY = 3;
        //        //        ctx.shadowColor = "black";
        //        var radius = blockSize / 2; //rayon de la pomme
        //        var x = this.position[0] * blockSize + radius; //coordonnées du centre
        //        var y = this.position[1] * blockSize + radius;
        //        ctx.arc(x, y, radius, 0, Math.PI * 2, true); // cercle
        //        ctx.fill(); // remplissage
        ctx.restore();
    };

    this.setNewPosition = function () {
        //        var newX = Math.round(Math.random() * (widthInBlocks - 1));
        var newX = Math.floor(Math.random() * widthInBlocks - 0.000000000001); //0 .. 29.99999999
        var newY = Math.floor(Math.random() * heightInBlocks - 0.0000000000001);
        this.position = [newX, newY];
    };

    this.isOnSnake = function (snakeToCheck) {
        var isOnSnake = false;
        for (var i = 0; i < snakeToCheck.length; i++) {
            if (this.position[0] === snakeToCheck[i][0] && this.position[1] === snakeToCheck[i][1]) {
                isOnSnake = true;
            }
        }
        return isOnSnake;
    };

}
//-----------------------------------------------------------------------------------------------
//-------------------------- Touches direction---------------------------------------------
document.onkeydown = function handleKeyDown(e) { //direction des touches
    var key = e.keyCode;
    var newDirection;
    switch (key) {
        case 37:
            newDirection = "left";
            break;
        case 38:
            newDirection = "up";
            break;
        case 39:
            newDirection = "right";
            break;
        case 40:
            newDirection = "down";
            break;

        case 32: // espace
            if (isGameOver) {
                restart();
            }
            if (!isOn) {
                lunch();
            } else {
                return;
            }
            return;

        case 77: // M   
            //music
            if (loop) {
                loop = false;
                MusicBut();
                loop0.pause();
                loop1.pause();
                loop2.pause();

            } else {
                loop = true;
                MusicBut();
                if (isOn)
                    musicLoop();

            };
            return;
            break;
        case 83: // S
            //sound
            //sound effects
            if (sound) {
                sound = false;
                SoundBut();
            } else {
                sound = true;
                SoundBut();
            };
            return;
            break;

        default:
            return; //
    }
    snakee.setDirection(newDirection);
}
