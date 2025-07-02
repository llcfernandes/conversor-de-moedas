const convertButton = document.querySelector('.convert-button');

const currencySelect = document.querySelector('.currency-select');

async function convertValues() {
    const inputCurrencyValue = document.querySelector('.input-currency').value;

    const currencyValueToConvert = document.querySelector(
        '.currency-value-to-convert'
    ); /*Real*/

    const currencyValueToConverted =
        document.querySelector('.currency-value'); /*Outras moedas*/

    console.log(currencySelect.value)
    
    const data = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"
    ).then((response) => response.json());

    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const bitcoinToday = data.BTCBRL.high
    const libraToday = data.GBPBRL.high

    if (currencySelect.value == 'dolar') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(inputCurrencyValue / dolarToday);
    }

    if (currencySelect.value == 'euro') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
        }).format(inputCurrencyValue / euroToday);
    }

    if (currencySelect.value == 'libra') {
        currencyValueToConverted.innerHTML = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(inputCurrencyValue / libraToday);
    }

    if (currencySelect.value === 'bitcoin') {
        const value = inputCurrencyValue / bitcoinToday;
        currencyValueToConverted.innerHTML = value.toFixed(8) + ' BTC';
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById('currency-name');
    const currencyImage = document.querySelector('.currency-img');

    if (currencySelect.value == 'dolar') {
        currencyName.innerHTML = 'Dólar Americano';
        currencyImage.src = './src/assets/imgs/dolar.png';
    }

    if (currencySelect.value == 'euro') {
        currencyName.innerHTML = 'Euro';
        currencyImage.src = './src/assets/imgs/euro.png';
    }

    if (currencySelect.value == 'libra') {
        currencyName.innerHTML = 'Libra';
        currencyImage.src = './src/assets/imgs/libra.png';
    }

    if (currencySelect.value == 'bitcoin') {
        currencyName.innerHTML = 'Bitcoin';
        currencyImage.src = './src/assets/imgs/bitcoin.png';
    }

    convertValues();
}

currencySelect.addEventListener('change', changeCurrency);
convertButton.addEventListener('click', convertValues);
