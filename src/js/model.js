import * as categoryBMI from './categoryBMI';
import {
  THIN_LEAN_BR,
  LEAN_HEALTHY_BR,
  HEALTHY_OVERWEIGHT_BR,
  OVERWEIGHT_OBESE_BR,
} from './config.js';

export const ignorCharacters = function (curInput) {
  const blockedCharacters = curInput.value.replace(
    new RegExp(/[^\d]/, 'ig'),
    ''
  );
  curInput.value = blockedCharacters;
};

export const limitDigits = function (curInput) {
  curInput.value = curInput.value.slice(0, 3);
};

export const BMI = {
  value: '',
};

export const calculateBMI = function (heightInput, weightInput, ageInput) {
  const height = (heightInput.value / 100).toFixed(2); // change value to decimals
  const weight = weightInput.value;
  const age = ageInput.value;
  const formulaBMI = weight / height ** 2 - age * 0.02;
  BMI.value = String(formulaBMI).slice(0, 4);
};

export const createObjectBMI = function (data) {
  if (data <= THIN_LEAN_BR) {
    const objectBMI = new categoryBMI.thin(data);
    return objectBMI;
  }

  if (data > THIN_LEAN_BR && data <= LEAN_HEALTHY_BR) {
    const objectBMI = new categoryBMI.lean(data);
    return objectBMI;
  }

  if (data > LEAN_HEALTHY_BR && data <= HEALTHY_OVERWEIGHT_BR) {
    const objectBMI = new categoryBMI.healthy(data);
    return objectBMI;
  }

  if (data > HEALTHY_OVERWEIGHT_BR && data <= OVERWEIGHT_OBESE_BR) {
    const objectBMI = new categoryBMI.overweight(data);
    return objectBMI;
  }

  const objectBMI = new categoryBMI.obese(data);
  return objectBMI;
};
