const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

const markElem = document.querySelector('.mark');
const w = 160;
const h = 160;
const minWindowSize = Math.min(window.innerWidth, window.innerHeight);
const zoom = Math.min(20, Math.floor(minWindowSize / w));
let trigger = true;
markElem.setAttribute('width', 200);
markElem.setAttribute('height', 200);

let mark = new Zdog.Illustration({
    element: markElem,
    dragRotate: false
});


const TAU = Math.PI * 2; // easier to read constant

// fill circle
let round = new Zdog.RoundedRect({
    addTo: mark,
    width: 120,
    height: 120,
    fill: true,
    stroke: 1,
    cornerRadius: '50%',
    color: '#fff',
});

let cross = new Zdog.Shape({
    addTo: mark,
    path: [
        { x: -20, y: -20 },
        { x: 20, y: 20 },
        { move: { x: 20, y: -20 } },

        { x: -20, y: 20 },
    ],
    closed: false,
    stroke: 12,
    color: 'transparent',
    fill: true,
    translate: { z: 25 } 
});

let check = new Zdog.Shape({
    addTo: mark,
    path: [
        { x: -25, y: -15 },
        { x: 5, y: 15 },
        { move: { x: 5, y: 15 } },
        { x: 25, y: -5 },
    ],
    translate: { z: -25 },
    stroke: 12,
    color: '#fff',
    fill: true 
});


// render & animate
const deg = Math.PI / 180;
const rotateShape = new TimelineMax();

mark.updateRenderGraph();

$('body').on('click', '.block:not(.active)', (e) => {
    if (trigger) {
        trigger = false;
        $(e.currentTarget).addClass('active');
        setTimeout(() => {
            round.color = '#a2f1a5';
        }, 150);
        rotateShape.to({ ry: 0 }, 3, {
            ry: 180,
            onUpdate: function () {
                mark.rotate.y = this.target.ry * deg;
                mark.updateRenderGraph();
            },
            onComplete: () => {
                trigger = true;
            },
            ease: Elastic.easeOut.config(1, 0.5)
        });
    }
});

$('body').on('click touchstart', '.block.active', (e) => {
    if (trigger) {
        trigger = false;
        $(e.currentTarget).removeClass('active');
        setTimeout(() => {
            round.color = '#ffaea6';
            cross.color = '#fff';
        }, 150);
        rotateShape.to({ ry: 180 }, 3, {
            ry: 0,
            onUpdate: function () {
                mark.rotate.y = this.target.ry * deg;
                mark.updateRenderGraph();
            },
            onComplete: () => {
                trigger = true;
            },
            ease: Elastic.easeOut.config(1, 0.5)
        });
    }
});
