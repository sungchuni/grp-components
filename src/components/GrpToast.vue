<template>
  <div
    ref="toast"
    :style="toastStyle"
    :class="[$style.toast, { [$style.destroy]: destroy }]"
    @click="handleClick">
    <slot>fallback message</slot>
  </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from '@vue/composition-api';
import { TOAST_POSITION_SET } from '../constants';

export default {
  name: 'GrpToast',
  props: {
    toastBackgroundColor: {
      type: String,
      default: '#0078ff',
    },
    toastBorderRadius: {
      type: String,
      default: '2px',
    },
    toastColor: {
      type: String,
      default: '#ffffff',
    },
    toastId: {
      type: Number,
      required: true,
    },
    toastPosition: {
      type: String,
      default: 'top center',
      validator(value) {
        return TOAST_POSITION_SET.has(value);
      },
    },
    toastTime: {
      type: Number,
      default: 5000,
    },
    toastTransitionDuration: {
      type: Number,
      default: 200,
    },
  },
  emits: ['destroy'],
  setup(props, { emit }) {
    const {
      toastId,
      toastPosition,
      toastTime,
      toastTransitionDuration,
    } = props;
    const hasBottom = toastPosition.includes('bottom');
    const destroy = ref(false);
    const destroyTimeoutId = ref(null);
    const destroyedTimeoutId = ref(null);
    const toastStyle = computed(() => {
      const {
        toastBackgroundColor: backgroundColor,
        toastBorderRadius: borderRadius,
        toastColor: color,
      } = props;
      const transitionDuration = `${toastTransitionDuration}ms`;
      return {
        backgroundColor,
        borderRadius,
        color,
        transitionDuration,
      };
    });
    const handleClick = () => {
      clearTimeout(destroyTimeoutId.value);
      clearTimeout(destroyedTimeoutId.value);
      emit('destroyed', toastId);
    };
    onMounted(() => {
      const currentInstance = getCurrentInstance();
      const { toast: toastElement } = currentInstance.refs;
      toastElement.animate({
        transform: [
          `translateY(${hasBottom ? '' : '-'}50%`,
          'none',
        ],
        opacity: [0, 1],
      }, toastTransitionDuration);
      destroyTimeoutId.value = setTimeout(() => destroy.value = true, toastTime - toastTransitionDuration);
      destroyedTimeoutId.value = setTimeout(() => emit('destroyed', toastId), toastTime);
    });
    return { destroy, handleClick, toastStyle };
  },
};
</script>

<style lang="scss" module>
.toast {
  position: relative;
  top: auto;
  bottom: auto;
  padding: 14px 15px;
  animation-timing-function: ease-in-out;
}
.destroy {
  opacity: 0;
  transition-delay: 0ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
</style>
