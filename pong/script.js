const boardHeight = 100;
const boardWidth = 100;
const boardElement = document.querySelector('.board');

const padHeight = 18;
const padWidth = 2;
const maxPadPosition = boardHeight - padHeight;
const leftPadElement = document.querySelector('.left-pad');
const rightPadElement = document.querySelector('.right-pad');
const padsElements = [leftPadElement, rightPadElement];
const pads = [];

for (let padElement of padsElements) {
    const pad = {
        element: padElement,
        side: 'left',
        position: (boardHeight - padHeight) / 2
    };
    padElement.style.height = `${padHeight}vh`;
    padElement.style.width = `${padWidth}vw`;

    padElement.style.top = `${pad.position}vh`;

    pads.push(pad);
}

pads[1].side = 'right';

pads[0].score = {
    element: document.querySelector('.score-left'),
    value: 0
};

pads[1].score = {
    element: document.querySelector('.score-right'),
    value: 0
};

const ballRadius = 2;
const ballElement = document.querySelector('.ball');
const ball = {
    element: ballElement,
    position: {
        x: (boardWidth - ballRadius) / 2,
        y: (boardHeight - ballRadius) / 2
    },
    direction: {
        x: 1,
        y: (Math.random() > 0.5 ? 0.5 : -0.5)
    },
    speed: 1,
};

ballElement.style.height = `${ballRadius}vh`;
ballElement.style.width = `${ballRadius}vh`;
ballElement.style.top = `${ball.position.y}vh`;
ballElement.style.left = `${ball.position.x}vw`;

const buttonsPressed = {
    leftUp: false,
    leftDown: false,
    rightUp: false,
    rightDown: false
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        buttonsPressed.leftUp = true;
    }
    if (event.key === 's') {
        buttonsPressed.leftDown = true;
    }
    if (event.key === 'ArrowUp') {
        buttonsPressed.rightUp = true;
    }
    if (event.key === 'ArrowDown') {
        buttonsPressed.rightDown = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        buttonsPressed.leftUp = false;
    }
    if (event.key === 's') {
        buttonsPressed.leftDown = false;
    }
    if (event.key === 'ArrowUp') {
        buttonsPressed.rightUp = false;
    }
    if (event.key === 'ArrowDown') {
        buttonsPressed.rightDown = false;
    }
});

function movePads() {
    for (let pad of pads) {
        if (pad.side === 'left') {
            if (buttonsPressed.leftUp) {
                pad.position--;
            }
            if (buttonsPressed.leftDown) {
                pad.position++;
            }
        } else {
            if (buttonsPressed.rightUp) {
                pad.position--;
            }
            if (buttonsPressed.rightDown) {
                pad.position++;
            }
        }
        pad.element.style.top = `${pad.position}vh`;
    }
}

function moveBall() {
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
    ball.element.style.left = `${ball.position.x}vw`;
    ball.element.style.top = `${ball.position.y}vh`;

    if (ball.position.y <= 0 || ball.position.y >= boardHeight - ballRadius) {
        ball.direction.y *= -1;
    }

    if (
        (
            ball.position.x >= boardWidth - padWidth &&
            ball.position.y + ballRadius >= pads[1].position && 
            ball.position.y <= pads[1].position + padHeight
        ) || (
            ball.position.x <= padWidth &&
            ball.position.y + ballRadius >= pads[0].position && 
            ball.position.y <= pads[0].position + padHeight
        )
    ) {
        ball.direction.x *= -1;
        if (ball.speed < screen.width / 25) {
            ball.speed += 0.1;
        }
    }
    else if (
        ball.position.x <= 0 ||
        ball.position.x >= boardWidth - ballRadius
    ) {
        if (ball.position.x <= 0) {
            pads[1].score.value++;
            pads[1].score.element.textContent = pads[1].score.value;
        } else {
            pads[0].score.value++;
            pads[0].score.element.textContent = pads[0].score.value;
        }

        ball.position = {
            x: (boardWidth - ballRadius) / 2,
            y: (boardHeight - ballRadius) / 2
        };

        ball.speed = 1;

        ball.direction = {
            x: 1 * (Math.random() > 0.5 ? 1 : -1),
            y: (Math.random() - 0.5)
        };
    }
}

setInterval(() => {
    movePads();
    moveBall();
}, 50)
