/* Buttons */
let buttonEncrypt = document.querySelector('#buttonEncrypt');
let buttonDecrypt = document.querySelector('#buttonDecrypt');
let buttonCopy = document.querySelector('#buttonCopy');
let buttonDark = document.querySelector('#buttonDark');
let buttonLight = document.querySelector('#buttonLight');

/* Input Data */
let inputArea = document.querySelector('#input-area');

/* Output Data*/
let outputArea = document.querySelector('.output');

/* HTML Body */
let body = document.body;

/* Hidden items */
let warningText = document.querySelector('.warning-text'); /*1*/
let errorMessage = document.querySelector('.container-error'); /*2*/
let dataOutput = document.querySelector('.data-output'); /*3*/
let pDefault = document.querySelector('.pDefault'); /*none*/
let infoCopied = document.querySelector('.copied');


/* Show functions */
function showDataOutput(){
  dataOutput.classList.remove('none');
  pDefault.classList.add('none');
}

function showErrorMessage(){
  pDefault.classList.add('none');
  errorMessage.classList.remove('none');
}

function shoWarningText(){
  pDefault.classList.remove('none');
  warningText.classList.remove('none');
  setTimeout (()=>{
    warningText.classList.add('none');
  }, 3000);
}

/* Principal functions */
function clearDataOutput(){
  errorMessage.classList.add('none');
  dataOutput.classList.add('none');
}

function validateInput(string) {
  const regex = /^([a-zA-Z]+[\s]*)+$/;
  return regex.test(string);
}

function encrypt(string) {
  let encryptedText = "";
  encryptedText = string
  .replaceAll('a', '1')
  .replaceAll('e', '2')
  .replaceAll('i', '3')
  .replaceAll('o', '4')
  .replaceAll('u', '5');
  encryptedText = encryptedText
  .replaceAll('1', 'ai')
  .replaceAll('2', 'enter')
  .replaceAll('3', 'imes')
  .replaceAll('4', 'ober')
  .replaceAll('5', 'ufat');
  outputArea.value = encryptedText;
  showDataOutput();
}

function decrypt(string) {
  let decryptedText = "";
  decryptedText = string
  .replaceAll(/ai/g, 'a')
  .replaceAll(/enter/g, 'e')
  .replaceAll(/imes/g, 'i')
  .replaceAll(/ober/g, 'o')
  .replaceAll(/ufat/g, 'u');
  outputArea.value = decryptedText;
  showDataOutput();
}

function darkMode(){
  body.classList.toggle('darkMode');
  buttonDark.classList.add('none');
  buttonLight.classList.remove('none');
}

function lightMode(){
  body.classList.remove('darkMode');
  buttonLight.classList.add('none');
  buttonDark.classList.remove('none');
}


/* Buttons Events */ 
buttonEncrypt.addEventListener('click', ()=>{
  clearDataOutput();
  const inputText = inputArea.value;
  if ( validateInput(inputText) && inputText.length >= 1 ) {
    encrypt(inputText.toLowerCase());
  } else if ( inputText.length <= 0 ) {
    showErrorMessage();
  }
  else if ( !validateInput(inputText) ) {
    shoWarningText();
  }
});

buttonDecrypt.addEventListener('click', ()=>{
  clearDataOutput();
  const outputText = inputArea.value;
  if ( validateInput(outputText) && outputText.length >= 1 ) {
    decrypt(outputText.toLowerCase());
  } else if ( outputText.length <= 0 ) {
    showErrorMessage();
  }
  else if ( !validateInput(outputText) ) {
    shoWarningText();
  }
});

buttonCopy.addEventListener('click', ()=>{
  navigator.clipboard.writeText(outputArea.value)
  .then( ()=>{
    infoCopied.classList.remove('hidden');
    setTimeout(()=>{
      infoCopied.classList.add('hidden');
    }, 2000);
  }) 
  .catch( ()=>{
    console.log('Syntax ERROR');
  });
});

buttonDark.addEventListener('click', ()=>{
  darkMode();
});

buttonLight.addEventListener('click', ()=>{
  lightMode();
});