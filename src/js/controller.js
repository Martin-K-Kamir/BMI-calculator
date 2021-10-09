import * as model from './model.js';
import calcView from './views/calcView.js';
import resultView from './views/resultView.js';

const controlValidationOfInputs = function (curInput) {
  // 1) Disable characters in input only allow numbers
  model.ignorCharacters(curInput);

  // 2) Limit typed number digits to the limit of 3 digits only
  model.limitDigits(curInput);

  // 3) Check the value of input and render approved/error icon
  calcView.validateInputValue(curInput);

  // 4) If there is invalid value in input then disable btn
  calcView.allowCalcBtn(calcView.btnApproved());
};

//
//

const controlCalculateBMI = function () {
  // 1) Calculate BMI
  model.calculateBMI(...calcView.inputsArr);

  // 2) Render loading
  resultView.renderLoading();

  // 3) Render result
  resultView.renderResult(model.createObjectBMI(model.BMI.value));

  // 4 Reset the page
  resultView.resetBtn();
};

const init = function () {
  calcView.disableCalcBtn(true);
  calcView.showCopyright();
  calcView.hideCopyright();
  calcView.addHandlerListenInput(controlValidationOfInputs);
  resultView.addHandlerCalculateBMI(controlCalculateBMI);
};
init();
