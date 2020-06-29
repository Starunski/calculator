export const isMathematicalOperator = (character) => {
  return /[\+\-\%\/\*]$/.test(character);
};

export const isDotAllowed = (condition) => {
  for (let i = condition.length - 1; i >= 0; i--) {
    const current = condition[i];
    if (current === ".") {
      return false;
    }
    if (isMathematicalOperator(current)) {
      return true;
    }
  }
  return true;
};

export const lastStateConditionCharacter = (condition) => {
 return condition[condition.length - 1];
};
