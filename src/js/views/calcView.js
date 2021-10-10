import * as inputView from './inputView.js';
import {
  CHECKING_VALUE_SEC,
  HEIGHT_SIZE_LIMIT,
  LOADING_TEXT_SEC,
} from '../config.js';
import icons from '../../icons/bootstrap-icons.svg';

class calcView {
  _timeout = null;
  _copyright = document.querySelector('.copyright');
  _btn = document.querySelector('.calculator__btn');
  _inputs = document.querySelectorAll('.calculator__input');
  _heightInput = document.querySelector('.height');
  _weightInput = document.querySelector('.weight');
  _ageInput = document.querySelector('.age');
  inputsArr = [this._heightInput, this._weightInput, this._ageInput];

  addHandlerListenInput(handler) {
    this._inputs.forEach(curInput => {
      curInput.addEventListener('input', function () {
        handler(curInput);
      });
    });
  }

  disableCalcBtn(isApproved) {
    this._btn.disabled = isApproved;
  }

  allowCalcBtn(isApproved) {
    if (isApproved)
      return this.disableCalcBtn(false), this._removeDisableClass();

    this.disableCalcBtn(true), this._addDisableClass();
  }

  btnApproved() {
    if (
      inputView.height.valueIsCorrect &&
      inputView.weight.valueIsCorrect &&
      inputView.age.valueIsCorrect
    )
      return true;
  }

  _removeDisableClass() {
    setTimeout(() => {
      this._btn.classList.remove('btn--disabled');
    }, CHECKING_VALUE_SEC * 1000);
  }

  _addDisableClass() {
    setTimeout(() => {
      this._btn.classList.add('btn--disabled');
    }, CHECKING_VALUE_SEC * 1000);
  }

  validateInputValue(curInput) {
    const curInputValue = +curInput.value;
    const curInputId = curInput.id; // for selecting the current object
    const curInputObj = inputView[curInputId];

    if (
      curInputValue >= curInputObj.minValue &&
      curInputValue <= curInputObj.maxValue
    ) {
      curInputObj.valueIsCorrect = true;
      this._renderApprovedIcon(curInput);
    } else {
      curInputObj.valueIsCorrect = false;
      this._renderErrorIcon(curInput);
    }
  }

  _renderApprovedIcon(curInput) {
    const markup = `
        <svg class="calculator__input--check-icon" width="32" height="32">
            <use href="${icons}#check-circle-fill" />
        </svg>
    `;

    this._delay(curInput, markup);
  }

  _renderErrorIcon(curInput) {
    const markup = `
        <svg class="calculator__input--error-icon" width="32" height="32">
            <use href="${icons}#exclamation-triangle-fill"/>
        </svg>
    `;

    this._delay(curInput, markup);
  }

  _delay(curInput, markup) {
    this._clear(curInput);
    clearTimeout(this._timeout); // stops icon flickering
    this._timeout = setTimeout(() => {
      curInput.parentElement.insertAdjacentHTML('beforeend', markup);
    }, CHECKING_VALUE_SEC * 1000);
  }

  _clear(curInput) {
    if (curInput.nextElementSibling) curInput.nextElementSibling.remove();
  }

  showCopyright() {
    this._inputs.forEach(curInput => {
      curInput.addEventListener(
        'blur',
        function () {
          setTimeout(() => {
            this._copyright.classList.remove('hidden');
          }, LOADING_TEXT_SEC * 1000);
        }.bind(this),
        false
      );
    });
  }

  hideCopyright() {
    this._inputs.forEach(curInput => {
      curInput.addEventListener(
        'focus',
        function (e) {
          const curHeight = e.view.screen.height;

          if (curHeight <= HEIGHT_SIZE_LIMIT)
            this._copyright.classList.add('hidden');
        }.bind(this),
        false
      );
    });
  }
}
export default new calcView();
