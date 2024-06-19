// crypto_converter_api.js

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

async function convertBalanceToCurrency(cryptoCurrency) {
    try {
        const response = await fetch(`${API_URL}?ids=${cryptoCurrency}&vs_currencies=BRL,USD`);
        const data = await response.json();
        balanceBRL = balanceCrypto * data[cryptoCurrency].brl;
        balanceUSD = balanceCrypto * data[cryptoCurrency].usd;
        updateBalance();
    } catch (error) {
        console.error('Erro ao converter saldo:', error);
    }
}

document.getElementById('blockchain').addEventListener('change', (event) => {
    selectedBlockchain = event.target.value;
    convertBalanceToCurrency(selectedBlockchain);
});

