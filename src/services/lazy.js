export function debounce(fn, wait) {
  let cancelId = null;
  const hasWait = Number.isSafeInteger(wait);
  const [timer, cancel] =
    hasWait
      ? [setTimeout, clearTimeout]
      : [requestAnimationFrame, cancelAnimationFrame];
  return function debounced(...args) {
    cancel(cancelId);
    cancelId = timer(fn.bind(this, ...args), wait);
  };
}

export function throttle(fn, wait) {
  let timestamp = -wait || 0;
  return function throttled(...args) {
    const now = performance.now();
    now - timestamp > wait && (timestamp = now) && fn.apply(this, args);
  };
}
