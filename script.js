const add = (a, b) =>  a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function getBackGround(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    const body = document.querySelector('body');
    body.style.backgroundImage = `linear-gradient(to left bottom, rgb(${red}, ${green}, ${blue})
                                , rgba(${red}, ${green}, ${blue}, 0.3))`;
}

getBackGround();