const calc_buttons = document.querySelectorAll("button");
const calc_display = document.querySelector(".calc-display");
const calc_log = document.querySelector(".calc_sum_log")
const currentYear = document.querySelector(".year-text");
const challenge_btn = document.querySelector('.new-challenge-btn');
const instruction = document.querySelector('.challenge-inst');

const dec_challenge = ["d-b","d-h"];
const bin_challenge = ["b-d","b-h"];
const hex_challenge = ["h-b","h-d"];

var calc_sum = '';
var calc_displaysum = '';
var mysum = [];
var selected_number_sys = 'dec';
var calc_last_op = '';

function calc() {
    calc_buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            calc_result(e.target.value);
        });
    });
    calc_display.innerHTML = '0';
}

function calc_result(uservalue) {
    if (uservalue != '') {
        if (check_user_input(uservalue) === false) {
            if (uservalue == '0' && calc_sum == '0' && uservalue != '.') {
                calc_sum = uservalue;
                calc_displaysum = uservalue;
            } else {
                calc_sum += uservalue;
                calc_displaysum += uservalue;
            }
            calc_display.innerHTML = calc_displaysum;
        }
    }else{
        check_user_input('clear');
    }

}

function check_user_input(value) {

    switch (value) {
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
            add_CalcLog(calc_sum);
            calc_display.innerHTML = eval(calc_sum);
            calc_last_op = '=';
            return true;
    }
    return false;
}

function octetinputs() {
    const bitinput = document.querySelectorAll('.bin-entry');
    bitinput.forEach((entry) => {
        entry.addEventListener('click', (e) => {
            if (e.target.innerHTML == 1) {
                e.target.innerHTML = 0;
            } else {
                e.target.innerHTML = 1;
            }
        });
    });
}

function nibbleinputs() {
    const bitinput = document.querySelectorAll('.binary-nibble-entries');
    bitinput.forEach((entry) => {
        entry.addEventListener('click', (e) => {
            if (e.target.innerHTML == 1) {
                e.target.innerHTML = 0;
            } else {
                e.target.innerHTML = 1;
            }
        });
    });
}

function add_CalcLog(value) {
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

function numbersystem() {
    const numsys_select = document.querySelectorAll('.choices-label');
    numsys_select.forEach((userchoice) => {
        userchoice.addEventListener('click', (e) => {
            if (e.target.innerHTML === 'Decimal') {
                btn_challenge('dec');
            }
            if (e.target.innerHTML === 'Binary') {
                btn_challenge('bin');
            }
            if (e.target.innerHTML === 'Hexidecimal') {
                btn_challenge('hex');
            }
        });
    });
}

function btn_challenge(option = 'dec') {
    const challenge_value = document.querySelector('.dec-value');
    challenge_value.innerHTML = '';
    
    let ch_number = -1;
    ch_number = Math.floor(Math.random() * 255);

    if (option == 'dec') {
        selected_number_sys = 'dec';
        challenge_value.innerHTML = ch_number;
        instruction.innerHTML = "Convert this Decimal Value to Hexidecimal";
    }

    if (option == 'bin') {
        selected_number_sys = 'bin';
        bin_number = dec2bin(ch_number);
        challenge_value.innerHTML = bin_number;
        instruction.innerHTML = "Convert this Binary Value to Decimal";
    }

    if (option == 'hex') {
        selected_number_sys = 'hex';
        let hexvalue = dec2hex(ch_number);
        // hexvalue.substring(3,4);
        challenge_value.innerHTML = hexvalue.substring(2, 4);
        instruction.innerHTML = "Convert this Hexidecimal Value to Decimal";
    }
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

function dec2hex(i) {
    var result = "0000";
    if (i >= 0 && i <= 15) { result = "000" + i.toString(16); }
    else if (i >= 16 && i <= 255) { result = "00" + i.toString(16); }
    else if (i >= 256 && i <= 4095) { result = "0" + i.toString(16); }
    else if (i >= 4096 && i <= 65535) { result = i.toString(16); }
    return result.toString()
}

function saveCalcLog() {
    let logvalues = [];
    calc_log.childNodes.forEach((logentry) => {
        let tempvalue = logentry.textContent.trim();
        if (tempvalue != "") {
            logvalues.push(logentry.textContent);
        }
    })
    parsevalues(logvalues);
}

function parsevalues(entries) {

    // Put the object into storage
    localStorage.setItem('CalcLog', JSON.stringify(entries));

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('CalcLog');

    console.log('retrievedCalcLog: ', JSON.parse(retrievedObject));
}

(function (result) {
    btn_challenge('dec');
    calc();
    getyear();
    octetinputs()
    nibbleinputs();
    numbersystem();
})();

