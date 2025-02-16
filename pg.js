const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('copy-button');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', generatePassword);
copyEl.addEventListener('click', copyPassword);

function generatePassword() {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    passwordEl.value = generatePasswordLogic(
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
}

function generatePasswordLogic(upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + number + symbol + 1;
    const typesArr = [{ lower: true }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i++) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

async function copyPassword() {
    if (!passwordEl.value) return;
    
    try {
        await navigator.clipboard.writeText(passwordEl.value);
        showCopiedAnimation();
        
        // Substitua o alert por uma notificação mais elegante
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Senha copiada!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    } catch (err) {
        console.error('Failed to copy password:', err);
    }
}

function showCopiedAnimation() {
    const copyButton = document.getElementById('copy-button');
    copyButton.classList.add('copied');
    
    // Remova a classe após a animação
    setTimeout(() => {
        copyButton.classList.remove('copied');
    }, 500);
}