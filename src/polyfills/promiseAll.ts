export const promiseAll = (promises: Promise<any>[]): Promise<any> => {
  const outputs: any[] = [];
  let promiseCount = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) =>
      promise
        .then((value) => {
          outputs[i] = value;
          promiseCount++;
          if (promiseCount === promises.length) {
            resolve(outputs);
          }
        })
        .catch((e: any) => reject(`was rejected with ${e}`))
    );
  });
};
