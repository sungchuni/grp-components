<template>
  <div v-if="$slots.default" class="popup" :style="popupStyle">
    <header>
      <button class="close" @click="$emit('close', $event)">
        x
      </button>
    </header>
    <section>
      <slot></slot>
    </section>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
const DEFAULT_BACKGROUND_COLOR = '#E9ECF3';
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
    popupBackgroundColor: {
      type: String,
      default: '',
    },
    popupPosition: {
      type: PopupPosition,
      default: null,
    },
  },
  setup(props) {
    const popupStyle = computed(() => {
      const { popupBackgroundColor, popupPosition } = props;
      const backgroundColor = popupBackgroundColor || DEFAULT_BACKGROUND_COLOR;
      const position = popupPosition?.style;
      return {
        backgroundColor,
        ...position,
      };
    });
    return {
      popupStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: fit-content;
  padding: 1rem;
  border: thin solid black;
}
.close {
  cursor: pointer;
  float: right;
}
</style>
