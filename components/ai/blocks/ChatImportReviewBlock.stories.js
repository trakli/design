import ChatImportReviewBlock from './ChatImportReviewBlock.vue';

export default {
  title: 'AI/Blocks/ChatImportReviewBlock',
  component: ChatImportReviewBlock,
  args: {
    block: {
      file_name: 'transactions.csv',
      import_session_id: 42,
      status: 'ready'
    },
    getSession: () => Promise.resolve({ status: 'ready' })
  }
};

export const Default = {};

export const Analyzing = {
  args: {
    block: { file_name: 'transactions.csv', import_session_id: 42, status: 'analyzing' }
  }
};
