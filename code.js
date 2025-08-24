var operators = ["+", "-", "/", "*"];

var box = null;
var last_operation_history = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operator_value;
var last_button;
var calc_operator;

var total;

var key_combination = []
function button_number(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    last_button = button;

    // se o botão não for um operador ou o sinal de =
    if (!operators.includes(button) && button!=equal){
        // se for o primeiro botão clicado
        if (firstNum){
            // e se for um ponto, mostrar 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // senão, limpar a caixa e mostrar o número
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // retornar se o valor da caixa for 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // retornar se a caixa já tiver um ponto e o botão clicado for um ponto
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // o máximo de números permitidos digitados é 20
            if (box.innerText.length == 20){
                return;
            }

            // se o ponto for pressionado e a caixa já tiver um sinal de -, mostrar -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // senão, adicionar o número
            else {
                box.innerText += button;
            }  
        }
    }
    // se for um operador ou o sinal de =
    else {

        // retornar se o operador já tiver sido pressionado
        if (operator_value != null && button == operator_value){
            return
        }

        // mostrar o sinal de menos se for o primeiro valor selecionado e, por fim, retornar
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operator_value = button
            showSelectedOperator()
            return;
        }
        // retornar se o operador de menos for pressionado e já estiver impresso na tela
        else if (operators.includes(button) && box.innerText == "-"){
            return
        }
        // retornar se o operador de menos for pressionado e o histórico já tiver o sinal de igual
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        // definir o valor do operador se for um
        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*"){
                last_operator = "×"
            }
            else if (button == "/"){
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
            showSelectedOperator()
        }

        // adicionar o primeiro número ao array numbers e mostrar no histórico
        if (numbers.length == 0){
            numbers.push(box.innerText)
            if (typeof last_operator != "undefined" && last_operator != null){
                last_operation_history.innerText = box.innerText + " " + last_operator
            }
        }
        // resto dos cálculos
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText
            }
            var temp_num = box.innerText

            // calcular o total
            if (button==equal && calc_operator != null){
                var total = calculate(numbers[0], numbers[1], calc_operator)
                box.innerText = total;

                // adicionar o segundo número ao histórico
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                temp_num = numbers[0]

                numbers[0] = total
                operator_value = null
                showSelectedOperator()

                // substituir o primeiro número do histórico pelo valor do total
                var history_arr = last_operation_history.innerText.split(" ")
                history_arr[0] = temp_num
                last_operation_history.innerText = history_arr.join(" ")
            }
            // atualizar o histórico com o valor na tela e o operador pressionado
            else if (calc_operator != null) {
                 last_operation_history.innerText = temp_num + " " + last_operator
                 calc_operator = button
                 numbers = []
                 numbers.push(box.innerText)
            }
        }
    }

}
 // destacar o botão do operador quando selecionado
function showSelectedOperator(){

    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    if (operator_value == "+"){
        document.getElementById("plusOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "-"){
        document.getElementById("subOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "*"){
        document.getElementById("multiOp").style.backgroundColor  = "#ffd11a";
    }
    else if (operator_value == "/"){
        document.getElementById("divOp").style.backgroundColor  = "#ffd11a";
    }
}

// função para calcular o resultado usando dois números e um operador
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = (parseFloat)(num1)+(parseFloat)(num2)
    }
    else if (operator === "-"){
        total = (parseFloat)(num1)-(parseFloat)(num2)
    }
    else if (operator === "*"){
        total = (parseFloat)(num1)*(parseFloat)(num2)
    }
    else if (operator === "/"){
        total = (parseFloat)(num1)/(parseFloat)(num2)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
    // se o total não for inteiro, mostrar no máximo 12 casas decimais
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// função para limpar a caixa e resetar tudo
function button_clear(){
    window.location.reload()
}

function backspace_remove(){

    box = document.getElementById("box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    var last_num = box.innerText;
    last_num = last_num.slice(0, -1)
    
    box.innerText = last_num

    // mostrar 0 se todos os caracteres da tela forem removidos
    if (box.innerText.length == 0){
        box.innerText = 0
        firstNum = true
    }

}


// função para mudar o sinal do número exibido na tela
function plus_minus(){
    box = document.getElementById("box");

    // se algum operador já tiver sido pressionado
    if (typeof last_operator != "undefined"){
        if (numbers.length>0){
            // se o último botão pressionado for um operador
            if (operators.includes(last_button)){
                // se o texto exibido for apenas um sinal de negativo, substituir por 0
                if (box.innerText == "-"){
                    box.innerText = 0
                    firstNum = true
                    return
                }
                // se o texto exibido não for apenas um sinal de negativo, substituir por um sinal de negativo
                else {
                    box.innerText = "-"
                    firstNum = false
                }
            }
            // se o último botão pressionado não for um operador, mudar o sinal
            else {
                box.innerText = -box.innerText

                if (numbers.length==1){
                    numbers[0] = box.innerText
                }
                else {
                    numbers[1] = box.innerText
                }
            }
        }
        return
    }

    // se o texto exibido for 0, substituir por um sinal de negativo
    if (box.innerText == 0){
        box.innerText = "-"
        firstNum = false
        return
    }
    box.innerText = -box.innerText
}

// função para calcular a raiz quadrada do número exibido na tela
function square_root(){
    box = document.getElementById("box");
    var square_num = Math.sqrt(box.innerText)
    box.innerText = square_num
    numbers.push(square_num)
}

// função para calcular a divisão de 1 pelo número exibido na tela
function division_one(){
    box = document.getElementById("box");
    var square_num = 1/box.innerText
    box.innerText = square_num
    numbers.push(square_num)
}

// função para calcular a potência do número exibido na tela
function power_of(){
    box = document.getElementById("box");
    var square_num =Math.pow(box.innerText, 2)
    box.innerText = square_num
    numbers.push(square_num)
}

// função para calcular a porcentagem de um número
function calculate_percentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){

        var perc_value = ((box.innerText / 100) * numbers[0])
        if (!Number.isInteger(perc_value)) {
            perc_value = perc_value.toFixed(2);
        }
        box.innerText = perc_value
        numbers.push(box.innerText)
    
        // adicionar o segundo número ao histórico
        if (!last_operation_history.innerText.includes("=")){
            last_operation_history.innerText += " " + numbers[1] + " ="
        }
    }
    else {
        box.innerText = box.innerText/100
    }

    numbers.push(box.innerText)
    var res = calculate(numbers[0], numbers[1], last_operator)
    box.innerText = res
    operator_value = "="

    // desselecionar o operador se algum estiver selecionado
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }
}

// função para limpar o último número digitado na tela
function clear_entry(){
    box = document.getElementById("box");

    if (numbers.length > 0 && typeof last_operator != "undefined"){
        box.innerText = 0
        var temp = numbers[0]
        numbers = []
        numbers.push(temp)
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// função para capturar eventos de tecla pressionada
function keyPressed(e) {
    e.preventDefault()
    var equal = document.getElementById("equal_sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        button_clear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            button_number(enterPress)
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace_btn").style.backgroundColor  = "#999999";
            backspace_remove()
        }
        else if (commaPress){
            button_number(dot)
        }
        else {
            button_number(e.key) 
        }   
    }
    if (e.key) {
        key_combination[e.code] = e.key;
    }
}

// função para capturar eventos de tecla liberada
function keyReleased(e){
    if (key_combination['ControlLeft'] && key_combination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("box");
            var isNumber = isFinite(text);
            if (isNumber){
                var copy_number = text
                firstNum = true
                button_number(copy_number)
            }
        }).catch(err => {
            console.error('Falha ao ler conteúdo da área de transferência: ', err);
        });
    }
    if (key_combination['ControlLeft'] && key_combination['KeyC']) {
        box = document.getElementById("box");
        navigator.clipboard.writeText( box.innerText)
    }
    key_combination = []
    e.preventDefault()
    // redefinir a cor do botão backspace de volta ao original
    if (e.key == "Backspace"){
        document.getElementById("backspace_btn").style.backgroundColor  = "#666666";
    }
}
