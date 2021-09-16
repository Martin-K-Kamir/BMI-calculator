const inputHeight = document.querySelector('.height');
const inputError = document.querySelector('.calculator__input--error-icon');
const inputCheck = document.querySelector('.calculator__input--check-icon');

inputHeight.addEventListener('keyup', function (e) {
  e.preventDefault();

  setTimeout(function () {
    const height = +document.querySelector('.height').value;

    if (height < 50 || height > 270) {
      inputHeight.classList.remove('calculator__input--check');
      inputHeight.classList.add('calculator__input--error');
      inputCheck.classList.add('hidden');
      inputError.classList.remove('hidden');
    } else {
      inputHeight.classList.remove('calculator__input--error');
      inputHeight.classList.add('calculator__input--check');
      inputError.classList.add('hidden');
      inputCheck.classList.remove('hidden');
    }
  }, 1000);
});

class Inputs {
  _parentElement = document.querySelector('.calculator__input-wrapper');

  renderIcon() {
    const markup = `
        <svg class="calculator__input--error-icon" width="32" height="32">
            <use href="src/icons/bootstrap-icons.svg#exclamation-triangle-fill"/>
        </svg>
      `;
  }
}

const controlValidationOfInputs = function () {
  // 1) Disable other characters only numbers
  // 2) Render Approved/Error icon
  // 3) IF there is error icon disable button
};

var userName = document.querySelectorAll('.calculator__input');
console.log(userName);

/*
userName.addEventListener('input', restrictNumber);
function restrictNumber(e) {
  var newValue = this.value.replace(new RegExp(/[^\d]/, 'ig'), '');
  this.value = newValue;
}
*/
