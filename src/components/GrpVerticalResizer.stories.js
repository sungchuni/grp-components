import { action } from '@storybook/addon-actions';
import GrpVerticalResizer from './GrpVerticalResizer.vue';

export default {
  title: 'GrpVerticalResizer',
  component: GrpVerticalResizer,
};

const contentHtmlData = `<h1>head 1</h1>
<p>paragraph</p>
<ul>
  <li>unordered list item 1</li>
  <li>unordered list item 2</li>
  <li>unordered list item 3</li>
</ul>`;

const Template = (args) => ({
  components: { GrpVerticalResizer },
  setup() {
    const handleResize = action('resize');
    return { handleResize };
  },
  template: `
  <GrpVerticalResizer v-bind="$props" @resize="handleResize">
    ${args.slotContent}
  </GrpVerticalResizer>`,
});

export const Default = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
});
