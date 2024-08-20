const url = 'https://economia.awesomeapi.com.br/xml/available/uniq';

async function listamoedas(opcao,moedas) {
    for (let i = 0; i < moedas.length; i++) {
        const codigo = moedas[i].tagName;
        const nome = moedas[i].textContent;
        const option = document.createElement('option');
        option.value = codigo;
        option.textContent = `${nome} (${codigo})`;
        opcao.appendChild(option);
    }
}

async function carregarMoedas() {
    try {
        const response = await fetch(url);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        const moedas = xmlDoc.documentElement.children;
        const moedaOrigem = document.getElementById('cmoeda');
        listamoedas(moedaOrigem,moedas)
        const moedaDestino = document.getElementById('pmoeda');
        listamoedas(moedaDestino,moedas)



    } catch (error) {
        console.error('Erro ao carregar moedas:', error);
    }
}

document.getElementById('calcular').addEventListener('click', function() {
    const valor = document.getElementById('valor').value;
    const cmoeda = document.getElementById('cmoeda').value;
    const pmoeda = document.getElementById('pmoeda').value;

    const resultado = `${cmoeda} para ${pmoeda}`;
    const valorConvertido = `${valor}`;

    console.log(resultado);
    console.log(valorConvertido);

    // colocar api para conversão aqui

    // Atualiza os elementos no HTML com o resultado
    document.getElementById('resultado').textContent = resultado;
    document.getElementById('valorConvertido').textContent = valorConvertido;

});

document.getElementById('trocar').addEventListener('click', function() {
    const cmoeda = document.getElementById('cmoeda').selectedIndex;
    const pmoeda = document.getElementById('pmoeda').selectedIndex;

    document.getElementById('cmoeda').selectedIndex = pmoeda;
    document.getElementById('pmoeda').selectedIndex = cmoeda;
});

window.onload = carregarMoedas;