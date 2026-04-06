const visor = document.getElementById('visor');


function inserir(valor) {
    
    if (visor.value === "Erro de sintaxe" || visor.value === "Conta incompleta") {
        visor.value = "";
    }
    
    
    visor.value += valor;
}


function limpar() {
    visor.value = "";
}


function apagar() {
    visor.value = visor.value.slice(0, -1);
}


function resolver() {
    let expressao = visor.value;

    
    if (!expressao) return;

    try {
        
        expressao = expressao.replace(/sin/g, 'Math.sin');
        expressao = expressao.replace(/cos/g, 'Math.cos');
        expressao = expressao.replace(/sqrt/g, 'Math.sqrt');
        expressao = expressao.replace(/π/g, 'Math.PI');

        
        const abertos = (expressao.match(/\(/g) || []).length;
        const fechados = (expressao.match(/\)/g) || []).length;
        
        
        if (abertos > fechados) {
            expressao += ")".repeat(abertos - fechados);
        }

        
        let resultado = eval(expressao);

        
        if (resultado === Infinity || isNaN(resultado)) {
            visor.value = "Erro: Divisão por 0";
        } else {
            
            visor.value = Number.isInteger(resultado) ? resultado : resultado.toFixed(2);
        }

    } catch (e) {
        
        visor.value = "Erro de sintaxe";
        
        
        setTimeout(limpar, 2000);
    }
}
