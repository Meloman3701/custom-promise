type PromiseCallback<T> = (
  resolve: (value: T) => void,
  reject: (value: any) => void
) => void;

interface IPromise<T> {
  then: (callback: (value: T) => void) => void;
  catch: (callback: (value: any) => void) => void;
}

class CustomPromise<T> implements IPromise<T> {
  private thenCallback: (value: any) => any;
  private catchCallback: (value: any) => any;
  private resolveNext: (value: any) => any;
  private rejectNext: (value: any) => any;

  constructor(callback: PromiseCallback<T>) {
    setTimeout(callback, 0, this.resolve, this.reject);
  }

  then<InputType extends T, ResultType>(
    callback: (value: InputType) => ResultType | IPromise<ResultType>
  ) {
    this.thenCallback = callback;

    const nextPromise = new CustomPromise<ResultType>(() => {});

    this.resolveNext = nextPromise.resolve;
    this.rejectNext = nextPromise.reject;

    return nextPromise;
  }

  catch(callback: (value: any) => void) {
    this.catchCallback = callback;
  }

  private resolve = (value: T): void => {
    if (typeof this.thenCallback !== 'function') return;

    const result = this.thenCallback(value);

    if (result instanceof CustomPromise) {
      result.then(this.resolveNext).catch(this.rejectNext);
    } else {
      this.resolveNext(result);
    }
  };

  private reject = (value: any): void => {
    if (typeof this.rejectNext == 'function') {
      this.rejectNext(value);
    }

    if (typeof this.catchCallback == 'function') {
      this.catchCallback(value);
    }
  };
}

export default CustomPromise;
