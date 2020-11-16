const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('#display');
const keyDown = new Event('click', getValue)
let value = [''];

const add = (a, b) =>  +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if(b == 0){
        display.style.color = 'red';
        return "Can't divide by 0";
     }
     return  a / b;
};
const percent = (a, b) => a * b / 100;

function clearDisplay(){
    Array.from(display.children).forEach(element => (element.nodeName === 'SPAN') ? element.innerText = '': element.innerText = '0' );
    display.style.color = 'rgb(223, 223, 223)';
    return [''];
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '−':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '%':
            return percent(a, b);
        case 'Clear':
            return clearDisplay();
        default:
            Array.from(display.children).forEach(element => element.innerText = 'ERROR');
            break;

    }
}

function getKey(e){
    console.log(e.key);
    let keys = document.querySelectorAll('.btn');
    console.log(keys);
    keys.forEach(element => {
        if(element.textContent === e.key || element.id === e.key){
            element.dispatchEvent(keyDown);
        }
        else if(element.dataset.key === e.key){
            element.dispatchEvent(keyDown);
        }
    });
}

function getValue(){
    display.style.color = 'rgb(223, 223, 223)';
    let total = document.querySelector('#value');
    let operation = document.querySelector('#operation');
    if(this.textContent === '='){
        operation.textContent = value.join(' ');
        calculator();
        return;
    }
    if(this.textContent === 'Clear'){
        operate(this.textContent);
        value = [''];
        return;
    }
    if( this.textContent.match(/[^0-9.←]/g) || value[value.length - 1].match(/[^0-9.←]/g) ){
        if(!(this.textContent === value[value.length - 1])){
            value.push(this.textContent);
            if(value[value.length - 1].match(/[0-9.]/g) ){
                total.textContent = value[value.length - 1];
            }
            else{
                operation.textContent = value.join(' ');
            }
        }
    }
    else{
        if(this.textContent === '←'){
            value.pop();
            if(value.length < 1){
                value = [''];
            }
            total.textContent = '0';
            operation.textContent = value.join(' ');
            return;
        }
        if(!value[value.length - 1].includes('.') || this.textContent !== '.'){
            value[value.length - 1] += this.textContent;
            total.textContent = value[value.length - 1];
        }
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

function calculator(){
    let total = document.querySelector('#value');
    let operation = document.querySelector('#operation');
    let result = operate(value[1], value[0], value[2]);
    for(let i = 3; i < value.length-1; i += 2){
        result = operate(value[i], result, value[i+1]);
    }
    if(typeof result === 'number'){
        value = [(Math.round(result * 100) / 100).toString()];
        total.textContent = value;
        operation.textContent = value;
    }
    else{
        total.textContent = result;
    }
}

getBackGround();
buttons.forEach( button => button.addEventListener('click', getValue));
window.addEventListener('keydown', getKey);