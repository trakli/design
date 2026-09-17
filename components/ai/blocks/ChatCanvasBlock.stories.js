import ChatCanvasBlock from './ChatCanvasBlock.vue';

export default {
  title: 'AI/Blocks/ChatCanvasBlock',
  component: ChatCanvasBlock,
  args: {
    block: {
      title: 'Monthly report',
      blocks: [
        { type: 'markdown', text: '## Overview\n\nYour finances are healthy.' },
        { type: 'kpi', title: 'KPIs', items: [{ label: 'Balance', value: 24850.5, currency: 'USD' }] },
        { type: 'table', title: 'Breakdown', rows: [{ category: 'Groceries', amount: 84.2 }] }
      ]
    }
  }
};

export const Default = {};
