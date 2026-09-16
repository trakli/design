import ContentListView from './ContentListView.vue';

export default {
  title: 'Components/ContentListView',
  component: ContentListView,
  tags: ['autodocs'],
  argTypes: {
    initialView: { control: 'select', options: ['table', 'cards'] },
    cardLayout: { control: 'select', options: ['grid', 'horizontal'] }
  }
};

const sampleEntities = Array.from({ length: 25 }, (_, i) => ({
  id: `cat-${i + 1}`,
  name: `Category ${i + 1}`,
  description: `Description for category ${i + 1}`,
  type: i % 2 === 0 ? 'Expense' : 'Income',
  icon: 'Folder'
}));

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'type', label: 'Type', sortable: true }
];

const sampleCardFields = [
  { key: 'description', label: 'Details' },
  { key: 'type', label: 'Type' }
];

export const TableView = {
  args: {
    pageName: 'Category',
    pageNamePlural: 'Categories',
    entities: sampleEntities,
    columns: sampleColumns,
    cardFields: sampleCardFields,
    initialView: 'table'
  }
};

export const CardsView = {
  args: {
    pageName: 'Category',
    pageNamePlural: 'Categories',
    entities: sampleEntities,
    columns: sampleColumns,
    cardFields: sampleCardFields,
    initialView: 'cards'
  }
};
