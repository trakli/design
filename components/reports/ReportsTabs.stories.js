import ReportsTabs from './ReportsTabs.vue';
import { ref } from 'vue';
import { BarChart2, TrendingUp, PieChart, Activity } from 'lucide-vue-next';

export default {
  title: 'Reports/ReportsTabs',
  component: ReportsTabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
};

const tabs = [
  { value: 'overview',    label: 'Overview',    icon: BarChart2,   count: 4 },
  { value: 'cashflow',    label: 'Cashflow',    icon: TrendingUp },
  { value: 'categories',  label: 'Categories',  icon: PieChart,    count: 12 },
  { value: 'net-worth',   label: 'Net Worth',   icon: Activity }
];

export const Default = {
  render: () => ({
    components: { ReportsTabs },
    setup() {
      const active = ref('overview');
      return { tabs, active };
    },
    template: `<ReportsTabs :tabs="tabs" v-model="active" />`
  })
};
