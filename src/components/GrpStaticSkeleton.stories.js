import GrpStaticSkeleton from './GrpStaticSkeleton.vue';

export default {
  title: 'GrpStaticSkeleton',
  component: GrpStaticSkeleton,
};

const Template = (args, { argTypes }) => ({
  components: { GrpStaticSkeleton },
  props: Object.keys(argTypes),
  template: '<GrpStaticSkeleton />',
});

export const Default = Object.assign(Template.bind({}), {
  args: {},
});
