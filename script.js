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

// Chama a função ao carregar a página
window.onload = carregarMoedas;