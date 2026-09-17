import ChatCalloutBlock from './ChatCalloutBlock.vue';

export default {
  title: 'AI/Blocks/ChatCalloutBlock',
  component: ChatCalloutBlock,
  args: {
    title: 'Heads up',
    text: 'Your import is being processed in the background.',
    variant: 'info'
  }
};

export const Default = {};

export const Success = {
  args: {
    variant: 'success',
    title: 'Done',
    text: 'Import completed successfully.'
  }
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Review needed',
    text: 'Some transactions need your attention.'
  }
};

export const Danger = {
  args: {
    variant: 'danger',
    title: 'Import failed',
    text: 'The file could not be parsed.'
  }
};
