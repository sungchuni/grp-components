<template>
  <div
    :style="toastStyle"
    class="toast"
    :class="{ destroy }"
    @click="handleClick">
    <slot>fallback message</slot>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api';

export const TOAST_POSITION_SET = new Set([
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
    const { toastId, toastTime, toastTransitionDuration } = props;
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
      const animationDuration = `${toastTransitionDuration}ms`;
      return {
        backgroundColor,
        borderRadius,
        color,
        transitionDuration,
        animationDuration,
      };
    });
    const handleClick = () => {
      clearTimeout(destroyTimeoutId.value);
      clearTimeout(destroyedTimeoutId.value);
      emit('destroyed', toastId);
    };
    onMounted(() => {
      destroyTimeoutId.value = setTimeout(() => destroy.value = true, toastTime - toastTransitionDuration);
      destroyedTimeoutId.value = setTimeout(() => emit('destroyed', toastId), toastTime);
    });
    return { destroy, handleClick, toastStyle };
  },
};
</script>

<style lang="scss" scoped>
@keyframes grp-toast-transition {
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.toast {
  position: relative;
  top: auto;
  bottom: auto;
  padding: 14px 15px;
  animation-name: grp-toast-transition;
  animation-timing-function: ease-in-out;
}
.destroy {
  opacity: 0;
  transition-delay: 0ms;
  transition-property: all;
  transition-timing-function: ease-in-out;
}
</style>
