import icons from '../icons/bootstrap-icons.svg';

const inputs = document.querySelectorAll('.calculator__input');
const heightInput = document.querySelector('.height');
const weightInput = document.querySelector('.weight');
const ageInput = document.querySelector('.age');
const parentElements = document.querySelectorAll('.calculator__input-wrapper');
const container = document.querySelector('.container__box');
const calculator = document.querySelector('.calculator');
const calculating = document.querySelector('.calculating');
const btn = document.querySelector('.calculator__btn');
const resetBtn = document.querySelector('.result__btn');

const markupError = `
  <svg class="calculator__input--error-icon" width="32" height="32">
    <use href="${icons}#exclamation-triangle-fill"/>
  </svg>
`;

const markupApproved = `
  <svg class="calculator__input--check-icon" width="32" height="32">
    <use href="${icons}#check-circle-fill" />
  </svg>
`;

const markupLoading = `
  <div class="calculating">
    <svg class="calculating__icon">
      <use href="${icons}#gear" />
    </svg>
    <p class="calculating__text">Calculating your BMI...</p>
  </div>
`;

let markupResult;
const markupResultBMI = function (firstMsg, BMI, secondMsg, classTest) {
  return (markupResult = `
  <div class="result">
    <p class="result__text">${firstMsg}! Your BMI is</p>
    <p class="result__bmi ${classTest}">${BMI}</p>
    <p class="result__text">${secondMsg}!</p>
    <button class="result__btn btn">Again</button>
  </div>
  `);
};

let timeout = null;

const controlValidationOfInputs = function () {
  // 1) Disable other characters only numbers
  inputs.forEach(el =>
    el.addEventListener('input', function () {
      const newValue = this.value.replace(new RegExp(/[^\d]/, 'ig'), '');
      this.value = newValue;
    })
  );

  // 2) Allow only 3 digits
  inputs.forEach(function (input) {
    input.addEventListener('keyup', function () {
      if (input.value.length >= 3) {
        this.value = input.value.slice(0, 3);
      }
    });
  });

  // 3) Validate values in input

  const height = {
    name: 'height',
    max: 270,
    min: 50,
    valueIsOkay: false,
  };

  const weight = {
    name: 'weight',
    max: 450,
    min: 2,
    valueIsOkay: false,
  };

  const age = {
    name: 'age',
    max: 110,
    min: 15,
    valueIsOkay: false,
  };

  const renderAdd = function (curEl) {
    if (curEl.nextElementSibling) curEl.nextElementSibling.remove();
    curEl.parentElement.insertAdjacentHTML('beforeend', markupApproved);
  };

  const renderRemove = function (curEl) {
    if (curEl.nextElementSibling) curEl.nextElementSibling.remove();
    curEl.parentElement.insertAdjacentHTML('beforeend', markupError);
  };

  const checkValue = function (curEl, inputValue, object) {
    if (inputValue >= object.min && inputValue <= object.max) {
      clearTimeout(timeout);

      btn.disabled = false;
      object.valueIsOkay = true;

      timeout = setTimeout(function () {
        renderAdd(curEl);
      }, 200);
    } else {
      clearTimeout(timeout);

      btn.disabled = true;
      object.valueIsOkay = false;

      timeout = setTimeout(function () {
        renderRemove(curEl);
      }, 200);
    }
  };

  inputs.forEach(function (input) {
    input.addEventListener('keyup', function () {
      const inputValue = +this.value;

      if (this.classList.contains('height'))
        checkValue(this, inputValue, height);
      if (this.classList.contains('weight'))
        checkValue(this, inputValue, weight);
      if (this.classList.contains('age')) checkValue(this, inputValue, age);
    });
  });

  // 5) IF there is error icon disable button
  inputs.forEach(function (input) {
    input.addEventListener('keyup', function () {
      if (height.valueIsOkay && weight.valueIsOkay && age.valueIsOkay) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  });
};
controlValidationOfInputs();

const controlCalculateBMI = function () {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    // 1) Calculate BMI
    const resultBMI = function () {
      const height = +(heightInput.value / 100).toFixed(2);
      const weight = +weightInput.value;
      const age = +ageInput.value;
      const BMI = weight / height ** 2 - age * 0.02;
      return String(BMI).slice(0, 4);
    };
    resultBMI();

    // 2) Based on the BMI result set type of health level
    const checkBMILevel = function () {
      if (resultBMI() <= 13)
        markupResultBMI(
          'This is very bad',
          resultBMI(),
          'That means you are in severe thinness',
          'very-bad'
        );
      if (resultBMI() > 13 && resultBMI() <= 19)
        markupResultBMI(
          'Be careful',
          resultBMI(),
          'That means you are in mild thinness',
          'bad'
        );
      if (resultBMI() > 19 && resultBMI() <= 29)
        markupResultBMI(
          'Congrats',
          resultBMI(),
          'That means you are perfectly healthy',
          'good'
        );
      if (resultBMI() > 29 && resultBMI() <= 37)
        markupResultBMI(
          'Be careful',
          resultBMI(),
          'That means you are overweight',
          'bad'
        );
      if (resultBMI() > 37)
        markupResultBMI(
          'This is very bad',
          resultBMI(),
          'That means you are obese',
          'very-bad'
        );
    };
    checkBMILevel();

    // 3) Render loading and the result

    // 3.1) Hide calculator
    calculator.classList.add('hidden');

    // 3.2) Render loading
    container.insertAdjacentHTML('beforeend', markupLoading);

    // 3.3) Render result and hide loading
    setTimeout(function () {
      document.querySelector('.calculating').classList.add('hidden');
      container.insertAdjacentHTML('beforeend', markupResult);

      // Reset
      document
        .querySelector('.result__btn')
        .addEventListener('click', function () {
          location.reload();
        });
    }, 1500);
  });
};
controlCalculateBMI();

const init = function () {
  btn.disabled = true;
};
init();
