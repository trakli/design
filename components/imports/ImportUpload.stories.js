import ImportUpload from './ImportUpload.vue';

export default {
  title: 'Domain/Imports/ImportUpload',
  component: ImportUpload,
  args: {
    isAnalyzing: false
  }
};

export const Default = {};

export const Analyzing = {
  args: { isAnalyzing: true }
};
