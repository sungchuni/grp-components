import { action } from '@storybook/addon-actions';
import GrpLayerPopup from './GrpLayerPopup.vue';

export default {
  title: 'GrpLayerPopup',
  component: GrpLayerPopup,
  excludeStories: /.*Data$/,
};

export const contentHtmlData = `<h3>좋은 제목 만들기</h3>
<ul>
  <li>질문의 내용이 구체적으로 드러날 수 있게 해주세요.</li>
  <li>제목을 정하기 어렵다면, 질문을 먼저 작성해보세요.</li>
  <li>작성된 질문 내용을 바탕으로 알맞는 제목이 떠오를 수 있어요.</li>
</ul>
<h4>좋은 예</h4>
<ul>
  <li>Javascript에서 Clousure는 어떻게 동작하나요?</li>
  <li>Java += 연산자가 다른 타입에서는 이상하게 동작합니다.</li>
</ul>
<h3>답변하고 싶은 질문 하기</h3>
<ul>
  <li>고민하고 있는 문제를 간단 명료하게 정리해보세요.</li>
  <li>문제에 대한 배경을 충분히 설명해주세요.</li>
  <li>문제를 해결하기 위해 시도한 것들을 작성해보세요.</li>
  <li>적당한 예시가 있다면, 예시(소스 코드, 오류 메시지 등)도 함께 작성해주세요.</li>
  <li>하지만 불필요한 예시나 내용은 작성하지 않는 것이 좋을 수 있어요.</li>
</ul>
<p>* 질문이 길수록 읽고 싶지 않아져요. 명료하게 정리해봅시다!</p>`;

const Template = (args, { argTypes }) => ({
  components: { GrpLayerPopup },
  props: Object.keys(argTypes),
  setup() {
    const handleClose = action('close');
    return { handleClose };
  },
  template: `
  <GrpLayerPopup
    v-bind="$props"
    @close="handleClose"
  >${args.slotContent || ''}</GrpLayerPopup>
  `,
});

export const ContentInSlot = Object.assign(Template.bind({}), {
  args: {
    slotContent: contentHtmlData,
  },
});

export const Empty = Object.assign(Template.bind({}), {
  args: {},
});
