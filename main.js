// variables decleration:
//--------------------------

const $ = s => document.querySelector(s);
const rand = (min, max) => parseInt(Math.random() * (max - min) + min);
const canvas = $("canvas");

const b = canvas.getContext("2d"); // "get the brush"

const colors = [
    "#02A676",
    "#008C72",
    "#007369",
    "#005A5B",
    "#003840",
    "#2B3A42",
    "#3F5866",
    "#112F41",
    "#0894A1",
]

//mouse object
//--------------

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

//Circle constructor
//----------------------

class Particle {

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = rand(50, 120);
        this.lastMouse = { x: x, y: y };
    }

    update() {

        const lastPoint = {
            x: this.x,
            y: this.y
        }
        // move points over time
        this.radians += this.velocity;
        // drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //circular motion
        this.x = this.lastMouse.x + Math.cos(this.radians)
            * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians)
            * this.distanceFromCenter;

        this.draw(lastPoint);
    };

    draw(lastPoint) {
        b.beginPath();
        b.strokeStyle = this.color;
        b.lineWidth = this.radius;
        b.moveTo(lastPoint.x, lastPoint.y);
        b.lineTo(this.x, this.y);
        b.stroke();
        b.closePath();
    };

}

//setting up listeners
//-----------------------
window.addEventListener("resize", init);
// window.addEventListener("click", init);

window.addEventListener("mousemove", event => {
    mouse.x = event.x;
    mouse.y = event.y;
});


let particles = [];    //particles array

// imp implemantation
//---------------------
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    for (let i = 0; i < 30; i++) {
        const radius = (Math.random() * 3) + 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(canvas.width / 2, canvas.height / 2,
            radius, color));
    }


}

function animate() {
    requestAnimationFrame(animate);

    b.fillStyle = 'rgba(255, 255, 255, 0.05)';
    b.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());

}

init();
animate();
