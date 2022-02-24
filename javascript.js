
let expressao = '';

// Pegando elementos
document.querySelector("form").addEventListener("submit", handleSubmit);
document.getElementById("calcButton").addEventListener("click", handleClick);

// Funções de Eventos
function handleSubmit(event){
    event.preventDefault();
}

function handleClick(){
    document.getElementById("calcButton").setAttribute("data-toggle", "");
    let inputF = document.getElementById("expressao").value; 
    let inputS = document.getElementById("superior").value;
    let inputI = document.getElementById("inferior").value;
    let inputN = document.getElementById("intervalo").value;
    if(!checkInputs(inputF, inputS, inputI, inputN)){
        document.getElementById("calcButton").setAttribute("data-toggle", "modal");
        expressao = inputF;
        let result1 = simpson1_3(
            Number(inputS), 
            Number(inputI), 
            Number(inputN)
        );
        let result2 = simpson3_8(
            Number(inputS), 
            Number(inputI), 
            Number(inputN)
        );
        let result3 = trapezio(
            Number(inputS), 
            Number(inputI), 
            Number(inputN)
        );
        mostraResult(result1, result2, result3);
    }
}

function mostraResult(regra1, regra2, regra3){
    let html = `
            <tr class="text-center">
                <td class="h4">REGRA 1/3</td>
                <td class="h4">${regra1.toFixed(15)}</td>
            </tr>
            <tr class="text-center">
                <td class="h4">REGRA 3/8</td>
                <td class="h4">${regra2.toFixed(15)}</td>
            </tr>
            <tr class="text-center">
                <td class="h4">REGRA TRAPEZIO</td>
                <td class="h4">${regra3.toFixed(15)}</td>
            </tr>
    `;
    document.querySelector("tbody").innerHTML = html;
}

// Verificações
function checkInputs(...args){
    let count = 0;
    for(let item of args){
        if(item.trim() == ''){
            count++;
        }
    }
    return count;
}

// Processamento
function func(x){
    return eval(expressao);
}

function simpson1_3(ul, ll, n){
    let h = (ul - ll) / n;

    let x = [];
    let fx= [];

    for (let i = 0; i <= n; i++) {
        x[i] = ll + i * h;
        fx[i] = func(x[i]);
    }

    let res = 0;
    for (let i = 0; i <= n; i++) {
        if (i == 0 || i == n)
            res += fx[i];
        else if (i % 2 != 0)
            res += 4 * fx[i];
        else
            res += 2 * fx[i];
    }
    res = res * (h / 3);
    return res;
}


function simpson3_8(ul, ll, n){
    let h = (ul - ll) / n;

    let x = [];
    let fx= [];

    for (let i = 0; i <= n; i++) {
        x[i] = ll + i * h;
        fx[i] = func(x[i]);
    }

    let res = 0;
    for (let i = 0; i <= n; i++) {
        if (i == 0 || i == n)
            res += fx[i];
        else
            res += 3 * fx[i];
    }
    res = res * (h * 3/8);
    return res;
}

function trapezio(ul, ll, n){
    let h = (ul - ll) / n;

    let x = [];
    let fx= [];

    for (let i = 0; i <= n; i++) {
        x[i] = ll + i * h;
        fx[i] = func(x[i]);
    }

    let res = 0;
    for (let i = 0; i <= n; i++) {
        if (i == 0 || i == n)
            res += fx[i];
        else
            res += 2 * fx[i];
    }
    res = res * (h/2);
    return res;
}
