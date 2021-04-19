import {
  ComponentInstance,
  h,
  ref,
  unref,
  watch,
} from '@vue/composition-api';
import Vue from 'vue';
import GrpToast from '../components/GrpToast.vue';

type ToastPosition =
  | 'bottom center'
  | 'bottom left'
  | 'bottom right'
  | 'top center'
  | 'top left'
  | 'top right';

interface AppendToastProps {
  toastBackgroundColor?: string;
  toastBorderRadius?: string;
  toastColor?: string;
  toastMargin?: string;
  toastPosition?: ToastPosition;
  toastTime?: number;
  toastTransitionDuration?: number;
}

interface ToastQueItem {
  id: number;
  message: string;
  props?: AppendToastProps;
}

const toastContainerId = '__TOAST_CONTAINER__';
const toastContainer = ref<ComponentInstance | null>(null);
const toastQue = ref<ToastQueItem[]>([]);

export function appendToast(
  message: string,
  appendToastProps?: AppendToastProps,
): ComponentInstance | null {
  const id = performance.now();
  const {
    toastMargin = '1rem',
    ...props
  } = appendToastProps || {};
  toastQue.value.push({ id, message, props });
  if (!toastContainer.value) {
    toastContainer.value = new Vue({
      name: 'ToastContainer',
      components: { GrpToast },
      setup() {
        const { toastPosition = 'top center' } = props;
        const hasBottom = toastPosition.includes('bottom');
        const hasCenter = toastPosition.includes('center');
        const hasRight = toastPosition.includes('right');
        const style = (() => {
          const verticalPosition = {
            [hasBottom ? 'bottom' : 'top']: toastMargin,
          };
          const horizontalPosition = {
            ...(hasCenter && {
              left: '50%',
              transform: 'translate(-50%)',
            } || {
              [hasRight ? 'right' : 'left']: toastMargin,
            }),
          };
          const flexDirection = hasBottom ? 'column' : 'column-reverse';
          const alignItems = (
            hasCenter && 'center' ||
            hasRight && 'flex-end' ||
            'flex-start'
          );
          return {
            position: 'fixed',
            ...verticalPosition,
            ...horizontalPosition,
            display: 'flex',
            flexDirection,
            alignItems,
          };
        })();
        const handleDestroyed = (toastId: number) => {
          toastQue.value = unref(toastQue).filter(({ id }) => id !== toastId);
        };
        const getToasts = () => toastQue.value.map(({ id, message, props }) => h(
          'GrpToast',
          {
            style: {
              [hasBottom ? 'marginTop' : 'marginBottom']: toastMargin,
            },
            props: {
              ...props,
              toastId: id,
            },
            domProps: { innerHTML: message },
            on: { destroyed: handleDestroyed },
            key: id,
          },
        ));
        const unwatch = watch(toastQue, ({ length }) => {
          if (!length) {
            const toastContainerElement = toastContainer.value?.$el;
            toastContainerElement?.remove();
            toastContainer.value = null;
            unwatch();
          }
        });
        return () => h(
          'div',
          { style: unref(style), attrs: { id: toastContainerId } },
          getToasts(),
        );
      },
    }).$mount();
    document.body.appendChild(toastContainer.value.$el);
  }
  return unref(toastContainer);
}
