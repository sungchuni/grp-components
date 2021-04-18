import { reactive } from '@vue/composition-api';
import { appendToast } from '../services/toast';
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
    toastColor: {
      control: {
        type: 'color',
      },
    },
    toastId: {
      type: null,
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
      defaultValue: 'top center',
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

const messageData = '토스트 메시지 입니다.';

const Template = (args, { argTypes }) => ({
  components: { GrpToast },
  props: Object.keys(argTypes),
  setup(props) {
    const model = reactive({});
    const handleClick = () => {
      const { message } = model;
      appendToast(message || args.message, props);
    };
    return { handleClick, model };
  },
  template: `<form @submit.prevent>
    <input v-model.trim="model.message" type="string" name="toast-message" placeholder="toast message">
    <button @click="handleClick($props)">
      invoke toast
    </button>
  </form>`,
});

export const Default = Object.assign(Template.bind({}), {
  args: {
    message: messageData,
  },
});
