/* Buttons */
let buttonEncrypt = document.querySelector("#buttonEncrypt");
let buttonDecrypt = document.querySelector("#buttonDecrypt");
let buttonCopy = document.querySelector("#buttonCopy");
let buttonDark = document.querySelector("#buttonDark");
let buttonLight = document.querySelector("#buttonLight");

/* Input Data */
let inputArea = document.querySelector("#input-area");

/* Output Data*/
let outputArea = document.querySelector(".output");

/* HTML Body */
let body = document.body;

/* Hidden items */
let warningText = document.querySelector(".warning-text");
let errorMessage = document.querySelector(".container-error");
let dataOutput = document.querySelector(".data-output");
let pDefault = document.querySelector(".pDefault");
let infoCopied = document.querySelector(".copied");

// Show functions

/**
 * `showDataOutput()` is a function that removes the class `none` from the element with the id
 * `dataOutput` and adds the class `none` to the element with the class `pDefault`
 */
function showDataOutput() {
  dataOutput.classList.remove("none");
  pDefault.classList.add("none");
}

/**
 * If the default paragraph is visible, hide it and show the error message.
 */
function showErrorMessage() {
  pDefault.classList.add("none");
  errorMessage.classList.remove("none");
}

/**
 * It removes the class 'none' from the paragraph with the class 'pDefault' and the paragraph with the class
 * 'warningText'. Then it adds the class 'none' to the paragraph with the class 'warningText' after 3
 * seconds
 */
function shoWarningText() {
  pDefault.classList.remove("none");
  warningText.classList.remove("none");
  setTimeout(() => {
    warningText.classList.add("none");
  }, 3000);
}

// Principal functions

/**
 * It adds the class 'none' to the errorMessage and dataOutput elements
 */
function clearDataOutput() {
  errorMessage.classList.add("none");
  dataOutput.classList.add("none");
}

/**
 * It takes a string as an argument and returns true if the string contains only letters and spaces,
 * and false if it contains anything else
 * @param string - The string to be validated.
 * @returns A boolean value.
 */
function validateInput(string) {
  const regex = /^[A-Za-zñ\s]+$/g;
  return regex.test(string);
}

/**
 * It replaces all vowels with numbers, then replaces all numbers with the corresponding vowel's name
 * @param string - The string to be encrypted.
 */
function encrypt(string) {
  let encryptedText = "";
  encryptedText = string
    .replaceAll("a", "1")
    .replaceAll("e", "2")
    .replaceAll("i", "3")
    .replaceAll("o", "4")
    .replaceAll("u", "5");
  encryptedText = encryptedText
    .replaceAll("1", "ai")
    .replaceAll("2", "enter")
    .replaceAll("3", "imes")
    .replaceAll("4", "ober")
    .replaceAll("5", "ufat");
  outputArea.value = encryptedText;
  showDataOutput();
}

/**
 * It takes a string, replaces all instances of the encrypted vowels with their decrypted counterparts,
 * and then outputs the decrypted text to the output area.
 * @param string - The string to be decrypted.
 */
function decrypt(string) {
  let decryptedText = "";
  decryptedText = string
    .replaceAll(/ai/g, "a")
    .replaceAll(/enter/g, "e")
    .replaceAll(/imes/g, "i")
    .replaceAll(/ober/g, "o")
    .replaceAll(/ufat/g, "u");
  outputArea.value = decryptedText;
  showDataOutput();
}

/**
 * It removes the light background and adds the dark background.
 */
function darkMode() {
  body.classList.remove("gradient-background--light");
  body.classList.toggle("darkMode");
  body.classList.add("gradient-background--dark");
  buttonDark.classList.add("none");
  buttonLight.classList.remove("none");
}

/**
 * It removes the darkMode class and the gradient-background--dark class from the body element. It then
 * adds the gradient-background--light class to the body element. It also adds the none class to the
 * buttonLight element and removes the none class from the buttonDark element.
 */
function lightMode() {
  body.classList.remove("darkMode", "gradient-background--dark");
  body.classList.add("gradient-background--light");
  buttonLight.classList.add("none");
  buttonDark.classList.remove("none");
}

// Buttons Events

/* Adding an event listener to the buttonEncrypt element. When the button is clicked, it
clears the dataOutput element, gets the value of the inputArea element, and validates the input. If
the input is valid, it encrypts the input. If the input is not valid, it shows a warning message. */
buttonEncrypt.addEventListener("click", () => {
  clearDataOutput();
  const inputText = inputArea.value;
  if (validateInput(inputText) && inputText.length >= 1) {
    encrypt(inputText.toLowerCase());
  } else if (inputText.length <= 0) {
    showErrorMessage();
  } else if (!validateInput(inputText)) {
    shoWarningText();
  }
});

/* Adding an event listener to the buttonDecrypt element. When the button is clicked, it
clears the dataOutput element, gets the value of the inputArea element, and validates the input. If
the input is valid, it decrypts the input. If the input is not valid, it shows a warning message. */
buttonDecrypt.addEventListener("click", () => {
  clearDataOutput();
  const outputText = inputArea.value;
  if (validateInput(outputText) && outputText.length >= 1) {
    decrypt(outputText.toLowerCase());
  } else if (outputText.length <= 0) {
    showErrorMessage();
  } else if (!validateInput(outputText)) {
    shoWarningText();
  }
});

/* Adding an event listener to the buttonCopy element. When the button is clicked, it
copies the value of the outputArea element to the clipboard. If the copy is successful, it removes
the hidden class from the infoCopied element and adds the hidden class to the infoCopied element
after 2 seconds. If the copy is not successful, it logs a message to the console. */
buttonCopy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(outputArea.value)
    .then(() => {
      infoCopied.classList.remove("hidden");
      setTimeout(() => {
        infoCopied.classList.add("hidden");
      }, 2000);
    })
    .catch(() => {
      console.log("Failed to copy");
    });
});

/* It adds an event listener to the buttonDark element. When the button is clicked, it calls the
darkMode function. */
buttonDark.addEventListener("click", () => {
  darkMode();
});

/* It adds an event listener to the buttonLight element. When the button is clicked, it calls the
lightMode function. */
buttonLight.addEventListener("click", () => {
  lightMode();
});
