import { action } from '@storybook/addon-actions';
import { ref } from '@vue/composition-api';
import GrpToast from './GrpToast.vue';

export default {
  title: 'GrpToast',
  component: GrpToast,
  argTypes: {
    toastBackgroundColor: {
      control: {
        type: 'color',
      },
    },
    toastBorderRadius: {
      control: {
        type: 'number',
        min: 0,
      },
    },
    toastMargin: {
      control: {
        type: 'number',
      },
    },
    toastPosition: {
      control: {
        type: 'radio',
        options: [
          'bottom center',
          'bottom left',
          'bottom right',
          'top center',
          'top left',
          'top right',
        ],
      },
    },
    toastTime: {
      control: {
        type: 'number',
        min: 0,
        step: 100,
      },
    },
  },
};

const contentHtmlData = `<div style="padding: 8px">
  <p>i am the message</p>
  <ul>
    <li>i am the item 1</li>
    <li>i am the item 2</li>
    <li>i am the item 3</li>
  </ul>
</div>`;

const Template = (args, { argTypes }) => ({
  components: { GrpToast },
  props: Object.keys(argTypes),
  setup() {
    const destroyed = ref(false);
    const handleDestroy = (() => {
      const handlerFunction = action('destroyed');
      return () => {
        destroyed.value = true;
        handlerFunction();
      };
    })();
    return { destroyed, handleDestroy };
  },
  template: `
  <GrpToast v-if="!destroyed" v-bind="$props" @destroy="handleDestroy">
    ${args.slotContent}
  </GrpToast>`,
});

export const TopCenter = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'top center',
  },
});

export const TopRight = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'top right',
  },
});

export const TopLeft = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'top left',
  },
});

export const BottomCenter = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'bottom center',
  },
});

export const BottomRight = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'bottom right',
  },
});

export const BottomLeft = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: 'bottom left',
  },
});

export const WrongPosition = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
    toastPosition: '',
  },
});
