import { debounce, throttle } from '@/services/lazy.js';

const DELAY_MS = 5;
const ITERATION_LIMIT = 4;
const SLEEP_MS = 10;
const WAIT_MS = SLEEP_MS;

const asyncIterateThenSleep = async (fnA, fnB) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      for (let i = 0; i < ITERATION_LIMIT; i++) {
        await delay(DELAY_MS);
        yield i;
      }
    },
  };
  for await (const i of asyncIterable)
    (fnA(i), fnB(i));
  await delay(SLEEP_MS);
  return [fnA, fnB];
};

describe('lazy service', function () {
  test('debounce 래퍼의 동작', async () => {
    const mockFnA = jest.fn();
    const mockFnB = jest.fn();
    const debouncedMockFn = debounce(mockFnB, WAIT_MS);
    await asyncIterateThenSleep(mockFnA, debouncedMockFn);
    expect(mockFnA.mock.calls).toHaveLength(4);
    expect(mockFnB.mock.calls).toHaveLength(1);
    await asyncIterateThenSleep(mockFnA, debouncedMockFn);
    expect(mockFnA.mock.calls).toHaveLength(8);
    expect(mockFnB.mock.calls).toHaveLength(2);
  });
  test('throttle 래퍼의 동작', async () => {
    const mockFnA = jest.fn();
    const mockFnB = jest.fn();
    const throttledMockFn = throttle(mockFnB, WAIT_MS);
    await asyncIterateThenSleep(mockFnA, throttledMockFn);
    expect(mockFnA.mock.calls).toHaveLength(4);
    expect(mockFnB.mock.calls).toHaveLength(2);
  });
});
