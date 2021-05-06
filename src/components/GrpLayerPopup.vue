<template>
  <div
    v-if="$slots.default"
    ref="popupRef"
    :class="$style.popup"
    :style="popupStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  SetupContext,
  unref,
} from '@vue/composition-api';

export class PopupPosition {
  x: number | null = null
  y: number | null = null
  constructor({ x, y }: { x: number, y: number }) {
    this.x = x;
    this.y = y;
  }
  get style(): Partial<CSSStyleDeclaration> {
    const { x, y } = this;
    return {
      top: `${y}px`,
      left: `${x}px`,
    };
  }
}

export default defineComponent({
  name: 'GrpLayerPopup',
  props: {
    inLeftSide: {
      type: Boolean,
      default: false,
    },
    inTopSide: {
      type: Boolean,
      default: false,
    },
    popupGap: {
      type: Number,
      required: true,
    },
    popupPosition: {
      type: PopupPosition,
      default: null,
    },
    tooNarrow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }: SetupContext) {
    const popupRef = ref<HTMLElement | null>(null);
    const popupStyle = computed(() => {
      const {
        inTopSide,
        popupGap,
        popupPosition,
        tooNarrow,
      } = props;
      const { scrollTop } = document.scrollingElement as HTMLElement;
      const bodyBottom = document.body.offsetHeight;
      const popupRect = unref(popupRef)?.getBoundingClientRect() as DOMRectReadOnly;
      const bottomOverflowed = popupPosition && inTopSide && bodyBottom - scrollTop - popupRect?.bottom - popupPosition?.y - popupGap || 0;
      const topOverflowed = popupPosition && !inTopSide && scrollTop + popupRect?.top - popupRect?.height - popupGap - 64 || 0;
      const isOverflowed = bottomOverflowed < 0 || topOverflowed < 0;
      const calcHeight = (overflowed: number) => {
        const { height: popupHeight } = popupRect;
        const value = popupHeight + overflowed;
        return `${value}px`;
      };
      return {
        ...popupPosition?.style,
        ...(!tooNarrow && isOverflowed && { height: calcHeight(bottomOverflowed || topOverflowed) }),
        ...(!tooNarrow && isOverflowed && topOverflowed && { transform: `translateY(${Math.abs(topOverflowed)}px)` }),
      };
    });
    const handleClick = (pointerEvent: MouseEvent) => {
      const { target: targetElement } = pointerEvent;
      const popupElement = unref(popupRef) as HTMLElement;
      !popupElement.contains(targetElement as HTMLElement) && emit('close');
    };
    const handleKeyup = (keyboardEvent: KeyboardEvent) => {
      const { code, key } = keyboardEvent;
      (code || key) === 'Escape' && emit('close');
    };
    const handleResize = () => emit('close');
    onMounted(async () => {
      await new Promise(window.requestAnimationFrame);
      window.addEventListener('click', handleClick);
      window.addEventListener('keyup', handleKeyup);
      window.addEventListener('resize', handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keyup', handleKeyup);
      window.removeEventListener('resize', handleResize);
    });
    return { popupRef, popupStyle };
  },
});
</script>

<style lang="scss" module>
.popup {
  position: absolute;
  overflow: auto;
  width: max-content;
  box-sizing: border-box;
  align-content: flex-start;
  padding: 16px 20px;
  border: 1px solid #d7e2eb;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
}
</style>
