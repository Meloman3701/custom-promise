import { createRejectedPromise, createResolvedPromise } from './__fixtures__/Promise.fixture';

jest.useFakeTimers();

describe('Promise', () => {
  it('should call then callback', () => {
    const mock = jest.fn();

    const promise = createResolvedPromise('test');

    promise.then(mock)
    jest.runAllTimers();

    expect(mock).toBeCalledWith('test')
  });

  it('should call catch callback', () => {
    const thenCallback = jest.fn();
    const catchCallback = jest.fn();

    const promise = createRejectedPromise('test');

    promise.then(thenCallback).catch(catchCallback);

    jest.runAllTimers();

    expect(thenCallback).not.toBeCalled();
    expect(catchCallback).toBeCalledWith('test');
  });

  it('should chain promises', () => {
    const promise1 = createResolvedPromise(10_000);
    const promise2 = createResolvedPromise('test string');
    const promise3 = createResolvedPromise(true);

    const mock = jest.fn().mockReturnValueOnce(promise2).mockReturnValueOnce(promise3);

    promise1.then(mock).then(mock).then(mock);

    jest.runAllTimers();

    expect(mock).nthCalledWith(1, 10_000);
    expect(mock).nthCalledWith(2, 'test string');
    expect(mock).nthCalledWith(3, true);
  })
})
