export const deepEqual = (item1: any, item2: any): boolean => {
  if (item1 === item2) {
    return true;
  }

  if (Array.isArray(item1) && Array.isArray(item2)) {
    return item1.length !== item2.length
      ? false
      : item1.every((el, i) => deepEqual(el, item2[i]));
  }

  if (
    typeof item1 === 'object' &&
    typeof item2 === 'object' &&
    item1 !== null &&
    item2 !== null
  ) {
    if (Array.isArray(item1) || Array.isArray(item2)) {
      return false;
    }

    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    if (
      keys1.length !== keys2.length ||
      keys1.every((key) => !keys2.includes(key))
    ) {
      return false;
    }

    for (const key in item1) {
      let isEqual = deepEqual(item1[key], item2[key]);

      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return false;
};
