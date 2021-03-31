<script>
import { Doughnut, mixins } from 'vue-chartjs'
import globalOptionsMixin from "@/components/Charts/globalOptionsMixin";

export default {
  name: 'dona-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ctx: null
    };
  },
  mounted() {
    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        console.log("donut " + !oldVal);
        if (!oldVal) {
          this.renderChart(this.chartData, this.options);
        }
      },
      { immediate: true }
    );
  }
    
     
  
};
</script>