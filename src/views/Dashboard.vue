<template>
  <b-container class="pb-6 pt-6  d-flex">
    <b-card class="w-100">
        <div class="row justify-content-start">
          <div class="col">
            <stats-card
              title="Sucursal"
              :sub-title="sucursal.nombre"
              class="mb-2"
            >
              <template slot="footer">
                Aforo máx:
                <span class="text-primary">{{ sucursal.aforoMax }}</span>
                <br />
                Aforo actual:
                <span class="text-primary">{{ sucursal.aforoActual }}</span>
              </template>
            </stats-card>
          </div>
          <div class="col">
            <stats-card
              title="Aforo actual"
              type="gradient-primary"
              :sub-title="porcentajeAforo + '%'"
              icon="ni ni-chart-bar-32"
              class="mb-2"
            >
              <template slot="footer">
                <br />
                <base-progress
                  type="primary"
                  :height="8"
                  :value="porcentajeAforo"
                />
              </template>
            </stats-card>
          </div>
        </div>

      <div class="container">
          <div class="row justify-content-start">
            <div class="col-xl-9 col-md-11 col-sm-11">
              <div class="row justify-content-start">
                <div class="col-auto">
                  <div class="row">
                    <div class="col">
                      <base-input
                        type="date"
                        label="Fecha Inicio:"
                        v-model="startDate"
                      />
                    </div>
                    <div class="col">
                      <base-input
                        type="date"
                        label="Fecha Fin:"
                        v-model="endDate"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row justify-content-start">
                <div class="col-auto">
                  <h5 class="h3  mb-0">Aforo</h5>
                </div>
                <div class="col">
                  <b-nav class="nav-pills justify-content-end">
                    <b-nav-item
                      :active="bigLineChart.activeIndex === 0"
                      @click="initBigChart(0)"
                      link-classes="py-0 px-2"
                    >
                      <span class="d-none d-md-block">Día</span>
                      <span class="d-md-none">D</span>
                    </b-nav-item>
                    <b-nav-item
                      :active="bigLineChart.activeIndex === 1"
                      @click="initBigChart(1)"
                      link-classes="py-0 px-2"
                    >
                      <span class="d-none d-md-block">Semana</span>
                      <span class="d-md-none">S</span>
                    </b-nav-item>
                    <b-nav-item
                      @click="initBigChart(2)"
                      :active="bigLineChart.activeIndex === 2"
                      link-classes="py-0 px-2"
                    >
                      <span class="d-none d-md-block">Mes</span>
                      <span class="d-md-none">M</span>
                    </b-nav-item>
                    <b-nav-item
                      :active="bigLineChart.activeIndex === 3"
                      @click="initBigChart(3)"
                      link-classes="py-0 px-2"
                    >
                      <span class="d-none d-md-block">Año</span>
                      <span class="d-md-none">A</span>
                    </b-nav-item>
                  </b-nav>
                </div>
              </div>
              <br/>
              <div class="row justify-content-start">
                <div class="col">
                  <line-chart
                    :height="350"
                    :chart-data="bigLineChart.chartData"
                    :extra-options="bigLineChart.extraOptions"
                  >
                  </line-chart>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 col-sm-5">
                <br />
                <h3 class="h3" style="text-align: center;">Aforo actual</h3>
                <br />
                <div class="row justify-content-start" style="margin-left: auto; margin-right: auto">
                  <div class="col">
                    <div id="circulo-borde">
                      <div id="circulo-centro">
                        <p>145</p>
                      </div>
                    </div>
                    <h4 class="h4" style="text-align:center">Adultos</h4>
                  </div>
                </div>
                <br />
                <div class="row justify-content-start" style="margin-left: auto; margin-right: auto">
                  <div class="col">
                    <div id="circulo-borde">
                      <div id="circulo-centro">
                        <p>54</p>
                      </div>
                    </div>
                    <h4 class="h4" style="text-align:center">Niños</h4>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </b-card>
  </b-container>
</template>
<script>
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";

// Components
import BaseProgress from "@/components/BaseProgress";

export default {
  components: {
    LineChart,
    BaseProgress,
  },
  data() {
    return {
      allData: [
        [
          { x: "9 am", y: 10 },
          { x: "10 am", y: 20 },
          { x: "11 am", y: 20 },
          { x: "12 pm", y: 50 },
          { x: "1 pm", y: 20 },
          { x: "2 pm", y: 40 },
          { x: "3 pm", y: 20 },
          { x: "4 pm", y: 80 },
          { x: "5 pm", y: 20 },
          { x: "6 pm", y: 90 },
          { x: "7 pm", y: 5 },
        ],
        [
          { x: "Lunes", y: 20 },
          { x: "Martes", y: 50 },
          { x: "Miercoles", y: 20 },
          { x: "Jueves", y: 20 },
          { x: "Viernes", y: 80 },
          { x: "Sabado", y: 20 },
          { x: "Domingo", y: 120 },
        ],
        [
          { x: "Ene", y: 140 },
          { x: "Feb", y: 160 },
          { x: "Mar", y: 200 },
          { x: "Abr", y: 120 },
          { x: "May", y: 20 },
          { x: "Jun", y: 20 },
          { x: "Jul", y: 120 },
          { x: "Ago", y: 20 },
          { x: "Sep", y: 20 },
          { x: "Oct", y: 180 },
          { x: "Nov", y: 120 },
          { x: "Dic", y: 215 },
        ],
        [
          { x: "2015", y: 17000 },
          { x: "2016", y: 15850 },
          { x: "2017", y: 16592 },
          { x: "2018", y: 35920 },
          { x: "2019", y: 13580 },
          { x: "2020", y: 32420 },
          { x: "2021", y: 23120 },
        ],
      ],
      labelX: [],
      labelY: [],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Aforo",
              data: this.labelY,
            },
          ],
          labels: this.labelX,
        },
        extraOptions: chartConfigs.blueChartOptions,
      },

      sucursal: {
        nombre: "MINISO MADERO",
        aforoMax: 200,
        aforoActual: 180,
      },
      porcentajeAforo: "0%",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    initBigChart(index) {
      var labelX = [];
      var labelY = [];
      this.bigLineChart.chartData = {};

      this.allData[index].forEach(function(element) {
        labelX.push(element.x);
        labelY.push(element.y);
      });

      this.labelX = labelX;
      this.labelY = labelY;
      console.log(this.labelX);
      var chartData = {
        datasets: [
          {
            label: "Aforo",
            data: this.labelY,
          },
        ],
        labels: this.labelX,
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    calculaPorcentajeAforo() {
      this.porcentajeAforo =
        (this.sucursal.aforoActual / this.sucursal.aforoMax) * 100;
    },
  },
  created() {
    this.calculaPorcentajeAforo();
    this.initBigChart(3);
  },
};
</script>
<style>
.container {
  max-width: 95%!important;
}
.card{
  width: 100%;
}
#circulo-borde {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

#circulo-centro {
  width: 85%;
  height: 85%;
  border-radius: 50%;
  background-color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}



</style>
