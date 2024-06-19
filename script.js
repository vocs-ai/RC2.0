// script.js

let currentUser = null;
let selectedBlockchain = null;
let miningInterval = null;
let balanceCrypto = 0;
let balanceBRL = 0;
let balanceUSD = 0;

const apiKey = 'YOUR_API_KEY_HERE'; // Substitua pelo seu API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        currentUser = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('blockchainSelection').style.display = 'block';
        document.getElementById('usernameDisplay').textContent = `Usuário: ${currentUser}`;
    }
});

function startMining() {
    selectedBlockchain = document.getElementById('blockchain').value;
    miningInterval = setInterval(() => {
        const successRate = Math.random(); // Simula a taxa de sucesso da mineração
        const minedAmount = Math.random() * 0.00001; // Simula um valor pequeno de mineração
        if (successRate > 0.99) { // 1% de chance de encontrar um valor
            balanceCrypto += minedAmount;
            convertAndDisplayBalance();
            displayMiningOutput('<span style="color: #32CD32;">Alvo encontrado. Hash Descriptografada e valor recuperado!</span>');
        } else {
            const txID = generateRandomTxID(); // Gera um txID aleatório
            displayMiningOutput(`<span style="color: #32CD32;">Escaneando transações... TXID: ${txID}</span>`);
        }
    }, getRandomInt(3000, 6000)); // Intervalo aleatório entre 3 e 6 segundos

    document.getElementById('blockchainSelection').style.display = 'none';
    document.getElementById('mining').style.display = 'block';
}

function convertAndDisplayBalance() {
    fetch(`${apiUrl}USD`)
        .then(response => response.json())
        .then(data => {
            const rateUSD = data.rates[selectedBlockchain.toUpperCase()];
            balanceUSD = balanceCrypto * rateUSD;

            fetch(`${apiUrl}BRL`)
                .then(response => response.json())
                .then(data => {
                    const rateBRL = data.rates[selectedBlockchain.toUpperCase()];
                    balanceBRL = balanceCrypto * rateBRL;
                    updateBalance();
                })
                .catch(error => console.error('Erro ao obter a taxa de conversão BRL:', error));
        })
        .catch(error => console.error('Erro ao obter a taxa de conversão USD:', error));
}

function updateBalance() {
    document.getElementById('balanceCrypto').textContent = `${balanceCrypto.toFixed(8)} ${selectedBlockchain.toUpperCase()}`;
    document.getElementById('balanceBRL').textContent = `R$ ${balanceBRL.toFixed(2)}`;
    document.getElementById('balanceUSD').textContent = `$ ${balanceUSD.toFixed(2)}`;
}

document.getElementById('withdraw').addEventListener('click', () => {
    alert(`Saque realizado com sucesso!\nSaldo retirado: ${balanceCrypto.toFixed(8)} ${selectedBlockchain.toUpperCase()}`);
    balanceCrypto = 0;
    balanceBRL = 0;
    balanceUSD = 0;
    updateBalance();
    clearInterval(miningInterval);
    document.getElementById('miningOutput').innerHTML = '';
    document.getElementById('blockchainSelection').style.display = 'block';
    document.getElementById('mining').style.display = 'none';
});

document.getElementById('support').addEventListener('click', () => {
    alert('Entre em contato com nosso suporte em support@cryptomining.com');
});

function generateRandomTxID() {
    const characters = 'abcdef0123456789';
    let txID = '';
    for (let i = 0; i < 64; i++) {
        txID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return txID;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayMiningOutput(message) {
    const output = document.getElementById('miningOutput');
    output.innerHTML += `<div style="color: #32CD32; background-color: #000; padding: 5px; margin: 5px 0;">${message}</div>`;
    output.scrollTop = output.scrollHeight;
}
