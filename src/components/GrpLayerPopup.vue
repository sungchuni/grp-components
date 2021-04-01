<template>
  <div v-if="$slots.default" ref="popupRef" class="popup" :style="popupStyle">
    <slot></slot>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from '@vue/composition-api';
export class PopupPosition {
  constructor({ x = null, y = null }) {
    this.x = x;
    this.y = y;
  }
  get style() {
    const { x, y } = this;
    return {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
    };
  }
}
export default {
  name: 'GrpLayerPopup',
  props: {
    popupPosition: {
      type: PopupPosition,
      default: null,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const popupRef = ref(null);
    const popupStyle = computed(() => {
      const { popupPosition } = props;
      return popupPosition?.style;
    });
    const handleClick = (pointerEvent) => {
      const { target: targetElement } = pointerEvent;
      const { value: popupElement } = popupRef;
      !popupElement.contains(targetElement) && emit('close');
    };
    const handleKeyup = (keyboardEvent) => {
      const { code, key } = keyboardEvent;
      (code || key) === 'Escape' && emit('close');
    };
    onMounted(async () => {
      await new Promise(window.requestAnimationFrame);
      window.addEventListener('click', handleClick);
      window.addEventListener('keyup', handleKeyup);
    });
    onUnmounted(() => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keyup', handleKeyup);
    });
    return { popupRef, popupStyle };
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: max-content;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
}
.close {
  cursor: pointer;
  float: right;
}
</style>
