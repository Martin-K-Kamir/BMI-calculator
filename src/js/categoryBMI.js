class BMI {
  constructor(resultBMI) {
    this.resultBMI = resultBMI;
  }
}

export class healthy extends BMI {
  type = 'healthy';
  title = 'Congrats';
  subtitle = 'That means you are perfectly healthy';
}

class bad extends BMI {
  type = 'bad';
  title = 'This is very bad';
}

class warning extends BMI {
  type = 'warning';
  title = 'Be careful';
}

export class obese extends bad {
  subtitle = 'That means you are obese';
}

export class thin extends bad {
  subtitle = 'That means you are in severe thinness';
}

export class overweight extends warning {
  subtitle = 'That means you are overweight';
}

export class lean extends warning {
  subtitle = 'That means you are in mild thinness';
}
