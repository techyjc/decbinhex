const calc_buttons = document.querySelectorAll("button");
const calc_display = document.querySelector(".calc-display");
const calc_log = document.querySelector(".calc_sum_log")
const currentYear = document.querySelector(".year-text");
const challenge_btn = document.querySelector('.new-challenge-btn');

var calc_sum = '';
var calc_displaysum = '';
var mysum = [];


function calc() {
    calc_buttons.forEach(function(button) {
        button.addEventListener("click", function(e) {
            calc_result(e.target.value);
        });
    });
    calc_display.innerHTML = '0';
}

function calc_result(uservalue) {
    if(uservalue != ''){
        if(check_user_input(uservalue) === false){
            if(uservalue == '0' && calc_sum == '0' && uservalue != '.'){
                calc_sum = uservalue;
                calc_displaysum = uservalue;
            }else{
                calc_sum += uservalue;
                calc_displaysum += uservalue;
            }
            calc_display.innerHTML = calc_displaysum;
        }
    }
    
}

function check_user_input(value){

    switch (value){
        case "clear":
            calc_display.innerHTML = '0';
            calc_sum = '';
            calc_displaysum = '';
            return true;
            break;
        case "+":
            calc_sum += value;
            calc_displaysum = '';
            calc_display.innerHTML = '0';
            return true;
            break;
        case "-":
            calc_sum += value;
            calc_displaysum = '';
            calc_display.innerHTML = '0';
            return true;
            break;
        case "*":
            calc_sum += value;
            calc_displaysum = '';
            calc_display.innerHTML = '0';
            return true;
            break;
        case "/":
            calc_sum += value;
            calc_displaysum = '';
            calc_display.innerHTML = '0';
            return true;
            break;
        case "=":
            mysum.push(calc_sum);
            addElement(calc_sum);
            calc_display.innerHTML = eval(calc_sum);
            return true;
    }
    return false;
}

function addElement(value) {
    // create a new div element
    const newSpan = document.createElement("span");
    newSpan.innerHTML = value;
    document.querySelector('.calc_sum_log').appendChild(newSpan);
    childCount = document.querySelector('.calc_sum_log').childElementCount;
    newSpan.classList.add("Sum_" + childCount);
    newSpan.setAttribute('Data-SumId', childCount);
  }

function getyear() {
currentDate = new Date();
year = currentDate.getFullYear();
currentYear.innerHTML = year;
}

function new_challenge() {
    challenge_btn.addEventListener('click', function(){
        btn_challenge()
    });
}

function btn_challenge() {
    let ch_number = 0;
    const challenge_value = document.querySelector('.dec-value');
    ch_number = Math.floor(Math.random() * 255);
    challenge_value.innerHTML = ch_number;
    // calc_display.innerHTML = '0';
}

(function (result){
    new_challenge();
    calc();
    getyear();
    
})();