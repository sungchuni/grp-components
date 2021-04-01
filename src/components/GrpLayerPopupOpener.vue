<template>
  <div class="opener">
    <button ref="buttonRef" @click="handleToggle(true)">
      <slot name="text"></slot>
    </button>
    <GrpLayerPopup
      v-if="isShown"
      ref="popupRef"
      class="popup"
      :popup-position="popupPosition"
      @close="handleToggle(false)"
    >
      <slot name="popup"></slot>
    </GrpLayerPopup>
  </div>
</template>

<script>
import GrpLayerPopup, { PopupPosition } from './GrpLayerPopup.vue';
import { nextTick, ref } from '@vue/composition-api';
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
    const isShown = ref(false);
    const popupPosition = ref(null);
    const popupRef = ref(null);
    const handleToggle = async (shown) => {
      isShown.value = shown;
      if (shown) {
        await nextTick();
        const { popupGap } = props;
        const { width: windowWidth, height: windowHeight } = window.visualViewport;
        const {
          top: buttonTop,
          left: buttonLeft,
          width: buttonWidth,
          height: buttonHeight,
        } = buttonRef.value.getBoundingClientRect();
        const {
          width: popupWidth,
          height: popupHeight,
        } = popupRef.value.$el.getBoundingClientRect();
        popupPosition.value = new PopupPosition({
          x: buttonLeft < windowWidth * .5 ? 0 : (popupWidth - buttonWidth) * -1,
          y: buttonTop < windowHeight * .5 ? buttonHeight + popupGap : (popupHeight + popupGap) * -1,
        });
      }
    };
    return { buttonRef, handleToggle, isShown, popupPosition, popupRef };
  },
};
</script>

<style lang="scss" scoped>
.opener {
  position: relative;
  width: max-content;
  height: max-content;
}
.popup {
  position: absolute;
}
</style>
