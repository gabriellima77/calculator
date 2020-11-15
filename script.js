const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('#display');
let value = [''];

const add = (a, b) =>  +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = (a, b) => a * b / 100;

function clearDisplay(){
    Array.from(display.children).forEach(element => (element.nodeName === 'SPAN') ? element.innerText = '': element.innerText = '0' );
}

function operate(operator, a, b){
    console.log(operator, a, b);
    switch(operator){
        case '+':
            return [add(a, b).toString()];
        case '−':
            return [subtract(a, b).toString()];
        case '×':
            return [multiply(a, b).toString()];
        case '÷':
            return [divide(a, b).toString()];
        case '%':
            return [percent(a, b).toString()];
        case 'Clear':
            clearDisplay(operator);
            return [''];
        default:
            Array.from(display.children).forEach(element => element.innerText = 'ERROR');
            display.style.color = 'red';
            break;

    }
}

function getValue(){
    const operation = document.querySelector('#operation');
    const result = document.querySelector('#value');
    if( this.textContent.match(/[^0-9.]/g) || value[(value.length - 1)].match(/[^0-9.]/g) ){
        value.push(this.textContent);
    }
    else{
        value[value.length - 1] += this.textContent;
        result.textContent = value[value.length - 1];
    }
    if( value.includes('Clear') ){
        value = operate(value[value.indexOf('Clear')]);
        result.textContent = 0;
    }
    else if(value.length > 3){
        value = operate(value[1], value[0], value[2]);
        result.textContent = value;
    }
    operation.textContent = value.join(' ');
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

buttons.forEach( button => button.addEventListener('click', getValue));