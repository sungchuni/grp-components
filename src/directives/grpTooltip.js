const ARROW_SIZE = 6;
const GAP = ARROW_SIZE + 2;

export default {
  bind,
};

function bind(el, binding) {
  if (!(el instanceof HTMLElement))
    throw new TypeError('Element should be instance of HTMLElement');
  const {
    arg: position = 'bottom',
    value: message,
  } = binding;
  if (!['top', 'right', 'left', 'bottom'].includes(position))
    throw new TypeError('Argument should be one of top, right, left, bottom');
  const cache = new Map();
  el.addEventListener(
    'pointerenter',
    (pointerEvent) => cache.set(
      'tooltip',
      tooltipHandler(pointerEvent, { message, position }),
    ),
  );
  el.addEventListener(
    'pointerleave',
    () => {
      cache.get('tooltip')?.destroy();
      cache.clear();
    },
  );
}

function tooltipHandler(pointerEvent, { message, position }) {
  const { currentTarget } = pointerEvent;
  const container = Object.assign(document.createElement('div'), {
    textContent: message,
  });
  const arrow = container.appendChild(document.createElement('div'));
  Object.assign(currentTarget.style, {
    cursor: 'pointer',
    position: 'relative',
  });
  Object.assign(container.style, {
    position: 'absolute',
    zIndex: '1110',
    padding: '.25rem .5rem',
    backgroundColor: 'black',
    borderRadius: '.25rem',
    color: 'white',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    ...(
      position === 'top' && {
        top: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(calc(-100% - ${GAP}px))`,
      } ||
      position === 'right' && {
        top: '50%',
        right: 0,
        transform: `translateX(calc(100% + ${GAP}px)) translateY(-50%)`,
      } ||
      position === 'bottom' && {
        bottom: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(calc(100% + ${GAP}px))`,
      } ||
      position === 'left' && {
        top: '50%',
        left: 0,
        transform: `translateX(calc(-100% - ${GAP}px)) translateY(-50%)`,
      }
    ),
  });
  Object.assign(arrow.style, {
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: `${ARROW_SIZE}px`,
    ...(
      position === 'top' && {
        bottom: 0,
        left: '50%',
        borderColor: 'black transparent transparent transparent',
        transform: 'translateX(-50%) translateY(calc(100% - 1px))',
      } ||
      position === 'right' && {
        top: '50%',
        left: 0,
        borderColor: 'transparent black transparent transparent',
        transform: 'translateX(calc(-100% + 1px)) translateY(-50%)',
      } ||
      position === 'bottom' && {
        top: 0,
        left: '50%',
        borderColor: 'transparent transparent black transparent',
        transform: 'translateX(-50%) translateY(calc(-100% + 1px))',
      } ||
      position === 'left' && {
        top: '50%',
        right: 0,
        borderColor: 'transparent transparent transparent black',
        transform: 'translateX(calc(100% - 1px)) translateY(-50%)',
      }
    ),
  });
  currentTarget.appendChild(container);
  return {
    destroy() {
      Object.assign(currentTarget.style, {
        cursor: null,
        position: null,
      });
      container.remove();
    },
  };
}
