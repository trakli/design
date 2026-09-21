import ImportAnalyzing from './ImportAnalyzing.vue';

export default {
  title: 'Domain/Imports/ImportAnalyzing',
  component: ImportAnalyzing,
  args: {
    fileName: 'march-statement.pdf',
    status: 'extracting'
  }
};

export const Extracting = {};

export const Checking = {
  args: { status: 'checking' }
};
