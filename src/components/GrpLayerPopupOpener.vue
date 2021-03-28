<template>
  <div class="opener">
    <button class="opener" @click="handleToggle($event, true)">
      <slot name="text"></slot>
    </button>
    <GrpLayerPopup
      ref="popupRef"
      :popup-position="popupPosition"
      @close="handleToggle($event, false)"
    >
      <slot v-if="isShown" name="popup"></slot>
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
  setup() {
    const isShown = ref(false);
    const popupPosition = ref(null);
    const popupRef = ref(null);
    const handleToggle = async (event, shown) => {
      isShown.value = shown;
      const { clientX, clientY } = event;
      const { width: windowWidth, height: windowHeight } = window.visualViewport;
      if (shown) {
        await nextTick();
        const { width, height } = popupRef.value.$el.getBoundingClientRect();
        popupPosition.value = new PopupPosition({
          x: clientX < windowWidth * .5 ? clientX : clientX - width,
          y: clientY < windowHeight * .5 ? clientY : clientY - height,
        });
      }
    };
    return { handleToggle, isShown, popupPosition, popupRef };
  },
};
</script>
