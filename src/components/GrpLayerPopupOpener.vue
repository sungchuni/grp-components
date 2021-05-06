<template>
  <div :class="$style.opener">
    <div ref="buttonRef" @click="handleToggle(true)">
      <slot name="button"></slot>
    </div>
    <GrpLayerPopup
      v-if="isShown"
      ref="popupRef"
      :class="$style.popup"
      :style="popupStyle"
      :in-left-side="inLeftSide"
      :in-top-side="inTopSide"
      :popup-gap="popupGap || 0"
      :popup-position="popupPosition"
      :too-narrow="tooNarrowRef"
      @close="handleToggle(false)">
      <slot name="popup"></slot>
    </GrpLayerPopup>
  </div>
</template>

<script>
import { nextTick, reactive, ref, unref } from '@vue/composition-api';
import GrpLayerPopup, { PopupPosition } from './GrpLayerPopup.vue';

const NARROW_GAP = 20;

export default {
  name: 'GrpLayerPopupOpener',
  components: {
    GrpLayerPopup,
  },
  props: {
    popupGap: {
      type: Number,
      default: 6,
    },
  },
  setup(props) {
    const buttonRef = ref(null);
    const inLeftSide = ref(false);
    const inTopSide = ref(false);
    const isShown = ref(false);
    const popupPosition = ref(null);
    const popupRef = ref(null);
    const popupStyle = reactive({});
    const tooNarrowRef = ref(false);
    const handleToggle = async (shown) => {
      isShown.value = shown;
      await nextTick();
      if (shown) {
        const { popupGap } = props;
        const windowWidth = window.visualViewport?.width || window.innerWidth;
        const windowHeight = window.visualViewport?.height || window.innerHeight;
        const {
          top: buttonTop,
          left: buttonLeft,
          width: buttonWidth,
          height: buttonHeight,
        } = unref(buttonRef)?.getBoundingClientRect();
        inLeftSide.value = buttonLeft < windowWidth * .5;
        inTopSide.value = buttonTop < windowHeight * .5;
        const {
          width: popupWidth,
          height: popupHeight,
        } = unref(popupRef)?.$el.getBoundingClientRect();
        tooNarrowRef.value = windowWidth - popupGap * 2 < popupWidth;
        const tooNarrow = unref(tooNarrowRef);
        if (tooNarrow) {
          Object.assign(popupStyle, {
            maxWidth: `calc(100vw - ${NARROW_GAP * 2}px)`,
            maxHeight: `calc(100vh - 128px - ${popupGap * 2}px)`,
          });
        }
        const x = tooNarrow
          ? -buttonLeft + NARROW_GAP
          : unref(inLeftSide) ? 0 : -(popupWidth - buttonWidth);
        const y = tooNarrow || unref(inTopSide)
          ? buttonHeight + popupGap
          : -(popupHeight + popupGap);
        popupPosition.value = new PopupPosition({ x, y });
      } else {
        for (const key in popupStyle) delete popupStyle[key];
        popupPosition.value = null;
      }
    };
    return {
      buttonRef,
      handleToggle,
      inLeftSide,
      inTopSide,
      isShown,
      popupPosition,
      popupRef,
      popupStyle,
      tooNarrowRef,
    };
  },
};
</script>

<style lang="scss" module>
.opener {
  position: relative;
  width: max-content;
  height: max-content;
}
.popup {
  position: absolute;
  z-index: 20;
}
</style>
