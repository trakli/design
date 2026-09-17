import CanvasPanel from './CanvasPanel.vue';

export default {
  title: 'AI/CanvasPanel',
  component: CanvasPanel,
  args: {
    sessionId: 7,
    messageId: 12,
    canvas: {
      title: 'Monthly report',
      blocks: [
        { type: 'markdown', text: '## Overview\n\nYour finances are healthy.' },
        {
          type: 'kpi',
          title: 'KPIs',
          items: [{ label: 'Balance', value: 24850.5, currency: 'USD' }]
        }
      ]
    }
  }
};

export const Default = {};
