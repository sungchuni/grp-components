<template>
  <div ref="resizerRef" class="resizer" :style="resizerStyle">
    <div class="content">
      <slot></slot>
    </div>
    <div class="handle" @pointerdown="handlePointerdown">
      ...
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from '../services/lazy.js';
import { onMounted, reactive, ref } from '@vue/composition-api';
export default {
  name: 'GrpVerticalResizer',
  props: {
    lazyDelay: {
      type: Number,
      default: 20,
    },
    lazyFuncType: {
      type: String,
      default: 'throttled',
      validator(value) {
        return ['debounced', 'throttled'].includes(value);
      },
    },
  },
  emits: ['resize'],
  setup(props, { emit }) {
    const { lazyDelay, lazyFuncType } = props;
    const lazyFunc =
      lazyFuncType === 'debounced' && debounce ||
      lazyFuncType === 'throttled' && throttle ||
      (() => {});
    const pointerYRef = ref(0);
    const resizerRef = ref(null);
    const resizerStyle = reactive({ height: 'auto', minHeight: 'auto' });
    const handlePointerdown = (pointerEvent) => {
      const { clientY } = pointerEvent;
      pointerYRef.value = clientY;
      window.addEventListener('pointermove', handlePointermove);
      window.addEventListener('pointerup', handlePointerup);
    };
    const handlePointermove = lazyFunc((pointerEvent) => {
      const { clientY } = pointerEvent;
      const delta = clientY - pointerYRef.value;
      const { height: currentHeight } = resizerRef.value.getBoundingClientRect();
      const heightValue = currentHeight + delta;
      const minHeightValue = Number.parseFloat(resizerStyle.minHeight);
      if (heightValue > minHeightValue) {
        const height = `${heightValue}px`;
        Object.assign(resizerStyle, { height });
        pointerYRef.value = clientY;
        delta && emit('resize', pointerEvent, { delta });
      } else {
        Object.assign(resizerStyle, { height: 'auto' });
        const recalculatedDelta = Math.min(minHeightValue - heightValue, 0);
        recalculatedDelta && emit('resize', pointerEvent, { delta: recalculatedDelta });
      }
    }, lazyDelay);
    const handlePointerup = () => window.removeEventListener('pointermove', handlePointermove);
    onMounted(() => {
      const { height } = resizerRef.value.getBoundingClientRect();
      Object.assign(resizerStyle, { minHeight: `${height}px` });
    });
    return {
      handlePointerdown,
      handlePointermove,
      handlePointerup,
      resizerRef,
      resizerStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.resizer {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}
.content {
  flex: auto;
}
.handle {
  cursor: pointer;
  text-align: center;
  user-select: none;
}
</style>
