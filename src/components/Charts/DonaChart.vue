<script>
import { Doughnut, mixins } from 'vue-chartjs'
import globalOptionsMixin from "@/components/Charts/globalOptionsMixin";

export default {
  name: 'dona-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props:['chartDonaData','options'],
  data() {
    return {
      ctx: null
    };
  },
  mounted () {
    //this.renderChart(this.chartData, this.options);
    this.$watch(
      'chartDonaData',
      (newVal, oldVal) => {
         console.log('### NEWVAL: '+newVal);
        if (!oldVal) {
          this.renderChart(this.chartData, this.options);
        }
      },
      { immediate: true }
    );
  }
    
     
  
};
</script>