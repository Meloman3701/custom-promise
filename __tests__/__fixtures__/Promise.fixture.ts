import CustomPromise from "../../index";

export function createResolvedPromise<T>(value: T) {
  return new CustomPromise<T>((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000);
  })
}

export function createRejectedPromise<T>(value: T) {
  return new CustomPromise<T>((_, reject) => {
    setTimeout(() => {
      reject(value)
    }, 1000);
  })
}
