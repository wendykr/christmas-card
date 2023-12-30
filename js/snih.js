// inicializujeme kreslici platno
var canvas = document.querySelector(".snowfall");
var ctx = canvas.getContext("2d");

// rozmery platna
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

// pri zmene velikosti okna nastavime nove rozmery platna
window.onresize = function() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

// vygenerujeme nahodne vlocky
var mp = 200; // max. pocet vlocek
var particles = [];
for(var i = 0; i < mp; i++) {
    particles.push({
        x: Math.random() * W,       // souradnice X
        y: Math.random() * H,       // souradnice Y
        r: Math.random() * 3 + 1,   // velikost vlocky
        d: Math.random() * mp       // nahodny faktor pro pohyb vlocky
    })
}


// spustime animacni smycku
requestAnimationFrame(draw);



// vykresleni vlocek
function draw() {

    // smazeme canvas
    ctx.clearRect(0, 0, W, H);

    // nakreslime vsechny vlocky
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();

    // aktualizujeme polohu vlocek
    update();

    // zajistime volani kreslici funkce pri dalsim snimku monitoru
    requestAnimationFrame(draw);
}


// funkce pro aktualizaci vlocek
// angle se neustale navysuje a slouzi jako zaklad pro Sin a Cos funkce,
// ktere podle uhlu vypocitavaji vertikalni a horizontalni pohyb vlocek
var angle = 0;
var p, dy;

function update() {

    angle += 0.01;

    for(var i = 0; i < mp; i++) {

        // aktualni vlocka
        p = particles[i];

        // aktualizace X a Y souradnic vlocky
        // abychom pohyb udelali nahodnejsi, pridavame na ruznych mistek k uhlu radius vlocky a/nebo jeji nahodny faktor
        dy = Math.cos(angle + p.d) + p.r / 2;
        if (dy < 0) { dy = -dy; } // zabranime pohybu vlocek smerem nahoru
        p.y += dy;
        p.x += Math.sin(angle + p.d / 20 );

        // je-li vlocka mimo hranice okna, tak ji presuneme zpet nahoru na nahodnou pozici X
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
            particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
    }
}
