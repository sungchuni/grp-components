import { contentHtmlData } from './GrpLayerPopup.stories.js';
import GrpLayerPopup from './GrpLayerPopup.vue';
import GrpLayerPopupOpener from './GrpLayerPopupOpener.vue';

export default {
  title: 'GrpLayerPopupOpener',
  component: GrpLayerPopupOpener,
};

const Template = (args) => ({
  components: { GrpLayerPopup, GrpLayerPopupOpener },
  template: `
  <GrpLayerPopupOpener v-bind="$props">
    <template #text>답변하고 싶은 질문하는 방법</template>
    <template #popup>${args.slotContent || ''}</template>
  </GrpLayerPopupOpener>`,
});

export const TopLeft = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
  decorators: [
    () => ({
      template: `
      <div style="height: calc(100vh - 2rem); display: flex;">
        <story />
      </div>
      `,
    }),
  ],
});

export const TopRight = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
  decorators: [
    () => ({
      template: `
      <div style="height: calc(100vh - 2rem); display: flex; justify-content: flex-end;">
        <story />
      </div>
      `,
    }),
  ],
});

export const BottomLeft = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
  decorators: [
    () => ({
      template: `
      <div style="height: calc(100vh - 2rem); display: flex; justify-content: flex-start; align-items: flex-end;">
        <story />
      </div>
      `,
    }),
  ],
});

export const BottomRight = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
  decorators: [
    () => ({
      template: `
      <div style="height: calc(100vh - 2rem); display: flex; justify-content: flex-end; align-items: flex-end;">
        <story />
      </div>
      `,
    }),
  ],
});
