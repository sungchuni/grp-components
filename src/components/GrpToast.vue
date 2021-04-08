<template>
  <div class="toast" :style="toastStyle" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';

const TOAST_POSITION_SET = new Set([
  'bottom center',
  'bottom left',
  'bottom right',
  'top center',
  'top left',
  'top right',
]);

export default {
  name: 'GrpToast',
  props: {
    toastBackgroundColor: {
      type: String,
      default: '#ffffff',
    },
    toastBorderRadius: {
      type: Number,
      default: 8,
    },
    toastMargin: {
      type: Number,
      default: 8,
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
      default: 50000,
    },
  },
  emits: ['destroy'],
  setup(props, { emit }) {
    const { toastTime } = props;
    const timeoutId = ref(null);
    const toastStyle = computed(() => {
      const {
        toastBackgroundColor: backgroundColor,
        toastBorderRadius,
        toastMargin,
        toastPosition,
      } = props;
      const borderRadius = `${toastBorderRadius}px`;
      const positionValue = `${toastMargin}px`;
      const verticalPosition = {
        ...(toastPosition.includes('bottom') && { bottom: positionValue }),
        ...(toastPosition.includes('top') && { top: positionValue }),
      };
      const horizontalPosition = {
        ...(toastPosition.includes('center') && {
          left: '50%',
          transform: 'translate(-50%)',
        }),
        ...(toastPosition.includes('left') && { left: positionValue }),
        ...(toastPosition.includes('right') && { right: positionValue }),
      };
      return {
        backgroundColor,
        borderRadius,
        ...verticalPosition,
        ...horizontalPosition,
      };
    });
    const handleClick = () => {
      clearTimeout(timeoutId.value);
      emit('destroy');
    };
    onMounted(() => {
      timeoutId.value = setTimeout(() => {
        emit('destroy');
      }, toastTime);
    });
    return { handleClick, toastStyle };
  },
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  border-radius: 8px;
}
</style>
