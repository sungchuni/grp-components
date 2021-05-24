import { default as tooltip } from './grpTooltip';

export default {
  title: 'grpTooltip',
  decorators: [
    () => ({
      template: `
      <div style="display: flex; justify-content: center; padding: 3rem 1rem;">
        <story />
      </div>`,
    }),
  ],
};

const Template = (args, { argTypes }) => ({
  directives: {
    tooltip,
  },
  props: Object.keys(argTypes),
  template: `
    <div
      v-tooltip:${args.position}="'툴팁 메시지'"
      style="padding: .25rem .5rem; border: thin solid black;">plaese hover on me!</div>`,
});

export const Bottom = Object.assign(Template.bind({}), {
  args: {
    position: 'bottom',
  },
});

export const Top = Object.assign(Template.bind({}), {
  args: {
    position: 'top',
  },
});

export const Right = Object.assign(Template.bind({}), {
  args: {
    position: 'right',
  },
});

export const Left = Object.assign(Template.bind({}), {
  args: {
    position: 'left',
  },
});
