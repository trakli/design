import ChatQuestionBlock from './ChatQuestionBlock.vue';

export default {
  title: 'AI/Blocks/ChatQuestionBlock',
  component: ChatQuestionBlock,
  args: {
    prompt: 'Which wallet should I use for this?',
    options: [
      { label: 'Main checking', message: 'Use main checking' },
      { label: 'Savings', message: 'Use savings' },
      { label: 'Credit card', message: 'Use credit card' }
    ]
  }
};

export const Default = {};
