import { createClient } from '@supabase/supabase-js';

const url = 'https://economia.awesomeapi.com.br/xml/available/uniq';
const urlConv = 'https://economia.awesomeapi.com.br/last/';

const supabase_url='https://ozwkyjxewfttmigakxse.supabase.co';
const supabase_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96d2t5anhld2Z0dG1pZ2FreHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNzQwMjksImV4cCI6MjAzOTc1MDAyOX0.0t4bXeSY3vAkvV_4nkWz3H_R3jPBQIBIxL4ZJkkPEb0';

const supabase = createClient(supabase_url, supabase_key);

const insertConversao = async (moedas) => {
    const { data, error } = await supabase
      .from('conversoes')
      .insert({
        moedas_conversao:'moedas'
      });
      console.log('Inseriu');
    if (error) {
      console.error('Erro ao inserir conversão:', error);
      return;
    }
  
    console.log('Conversão inserida com sucesso:', data);
  };


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

async function valorMoedas(cmoeda,pmoeda,valor){
    const moedas = cmoeda+'-'+pmoeda;
    const url = urlConv+moedas;
    const moeda = cmoeda+pmoeda;
    console.log(url);
    fetch(url)
  .then(res => res.json())
  .then(data => {
    const bid = data[moeda].bid;
    const valorConvertido = valor * bid;
    console.log(`O valor convertido é: ${valorConvertido}`);
    document.getElementById('valorConvertido').textContent = `${valorConvertido}`;
  })
  .catch(err => {
    console.error('Erro ao buscar dados da API:', err);
  });
}

document.getElementById('calcular').addEventListener('click', function() {
    const valor = document.getElementById('valor').value;
    const cmoeda = document.getElementById('cmoeda').value;
    const pmoeda = document.getElementById('pmoeda').value;

    const resultado = `${cmoeda} para ${pmoeda}`;
    const valorConvertido = `${valor}`;
    // colocar api para conversão aqui
    valorMoedas(cmoeda,pmoeda,valor);
    insertConversao(cmoeda+'-'+pmoeda);
    // Atualiza os elementos no HTML com o resultado
    document.getElementById('resultado').textContent = resultado;

});

document.getElementById('trocar').addEventListener('click', function() {
    const cmoeda = document.getElementById('cmoeda').selectedIndex;
    const pmoeda = document.getElementById('pmoeda').selectedIndex;

    document.getElementById('cmoeda').selectedIndex = pmoeda;
    document.getElementById('pmoeda').selectedIndex = cmoeda;
});

window.onload = carregarMoedas;