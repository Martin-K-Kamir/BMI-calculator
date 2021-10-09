import { CALCULATING_BMI_SEC } from '../config.js';
import icons from '../../icons/bootstrap-icons.svg';

class resultView {
  _boxContainer = document.querySelector('.container__box');
  _calculatorContainer = document.querySelector('.calculator');
  _btn = document.querySelector('.calculator__btn');

  addHandlerCalculateBMI(handler) {
    this._btn.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderLoading() {
    const markup = `
          <div class="calculating">
            <svg class="calculating__icon">
              <use href="${icons}#gear" />
            </svg>
            <p class="calculating__text">Calculating your BMI...</p>
          </div>
        `;

    this._calculatorContainer.classList.add('hidden');
    this._boxContainer.insertAdjacentHTML('beforeend', markup);
  }

  renderResult(data) {
    const markup = `
    <div class="result">
      <p class="result__text">${data.title}! Your BMI is</p>
      <p class="result__bmi ${data.type}">${data.resultBMI}</p>
      <p class="result__text result__text--small">${data.subtitle}!</p>
      <button class="result__btn btn">Again</button>
    </div>
    `;

    this._boxContainer.insertAdjacentHTML('beforeend', markup);

    setTimeout(() => {
      document.querySelector('.calculating').classList.add('hidden');
      document.querySelector('.result').classList.add('visible');
    }, CALCULATING_BMI_SEC * 1000);
  }

  resetBtn() {
    document
      .querySelector('.result__btn')
      .addEventListener('click', function () {
        location.reload();
      });
  }
}
export default new resultView();
