import {
  MAX_VALUE_HEIGHT,
  MIN_VALUE_HEIGHT,
  MAX_VALUE_WEIGHT,
  MIN_VALUE_WEIGHT,
  MAX_VALUE_AGE,
  MIN_VALUE_AGE,
} from '../config.js';

class Input {
  constructor(maxValue, minValue, valueIsCorrect) {
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.valueIsCorrect = valueIsCorrect;
  }
}

export const height = new Input(MAX_VALUE_HEIGHT, MIN_VALUE_HEIGHT, false);
export const weight = new Input(MAX_VALUE_WEIGHT, MIN_VALUE_WEIGHT, false);
export const age = new Input(MAX_VALUE_AGE, MIN_VALUE_AGE, false);
