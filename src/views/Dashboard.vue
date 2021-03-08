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
              Aforo:
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
                <div class="row" v-if="optionDate">
                  <div class="col">
                    <base-input label="Fecha Inicio:">
                      <flat-picker
                        placeholder="dd / mm / aaaa"
                        class="form-control datepicker"
                        :config="configEndDate"
                        v-model="startDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input label="Fecha Final:">
                      <flat-picker
                        placeholder="dd / mm / aaaa"
                        :config="configEndDate"
                        class="form-control datepicker"
                        v-model="endDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div
                    class="col"
                    style="margin: auto;margin-bottom: 5px;margin-top: 25px;"
                  >
                    <button
                      type="submit"
                      size="sm"
                      class="login-button"
                      style="min-width: 20px; height: 40px; margin:auto;"
                    >
                      Buscar
                    </button>
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
                    @click="
                      optionDate = false;
                      initBigChart(0);
                    "
                    link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Día</span>
                    <span class="d-md-none">D</span>
                  </b-nav-item>
                  <b-nav-item
                    :active="bigLineChart.activeIndex === 1"
                    @click="
                      optionDate = false;
                      initBigChart(1);
                    "
                    link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Semana</span>
                    <span class="d-md-none">S</span>
                  </b-nav-item>
                  <b-nav-item
                    @click="
                      optionDate = false;
                      initBigChart(2);
                    "
                    :active="bigLineChart.activeIndex === 2"
                    link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Mes</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                    :active="bigLineChart.activeIndex === 3"
                    @click="
                      optionDate = false;
                      initBigChart(3);
                    "
                    link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Año</span>
                    <span class="d-md-none">A</span>
                  </b-nav-item>
                  <b-nav-item
                    :active="bigLineChart.activeIndex === 4"
                    @click="
                      optionDate = true;
                      bigLineChart.activeIndex = 4;
                    "
                    link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Personalizar</span>
                    <span class="d-md-none">P</span>
                  </b-nav-item>
                </b-nav>
              </div>
            </div>
            <br />
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
            <h3 class="h3" style="text-align: center;">Visitantes</h3>
            <br />
            <div
              class="row justify-content-start"
              style="margin-left: auto; margin-right: auto"
            >
              <div class="col">
                <div id="circulo-borde">
                  <div id="circulo-centro">
                    <p>{{ sucursal.adultos }}</p>
                  </div>
                </div>
                <h4 class="h4" style="text-align:center">Adultos</h4>
              </div>
            </div>
            <br />
            <div
              class="row justify-content-start"
              style="margin-left: auto; margin-right: auto"
            >
              <div class="col">
                <div id="circulo-borde">
                  <div id="circulo-centro">
                    <p>{{ sucursal.niños }}</p>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import LineChart from "@/components/Charts/LineChart";
import BaseProgress from "@/components/BaseProgress";
import datos from "./Pages/dataDashboard";

export default {
  components: {
    LineChart,
    BaseProgress,
    flatPicker,
  },
  data() {
    return {
      optionDate: false,
      datos,
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
        extraOptions: {
          /*elements: {
            point: {
              radius: 3,
              backgroundColor: "red",
            },
            line: {
              tension: 0.4,
              borderWidth: 2,
              borderColor: "red",
              backgroundColor: "transparent",
              borderCapStyle: "rounded",
            },
          }*/
        },
      },
      sucursal: {
        nombre: "",
        aforoMax: 0,
        aforoActual: 0,
        niños: 0,
        adultos: 0,
      },
      porcentajeAforo: "0",
      startDate: "",
      endDate: "",
      maxDate: "",
      configEndDate: {
        maxDate: new Date(),
        dateFormat: "d-M-Y",
        altInput: true,
      },
    };
  },
  methods: {
    initBigChart(index) {
      var labelX = [];
      var labelY = [];
      this.bigLineChart.chartData = {};

      //console.log(this.datos[index].aforo);
      var niños = 0;
      var adultos = 0;
      var aforoMax = 0;
      var sucursal = "";
      this.datos[index].aforo.forEach(function(element) {
        labelX.push(element.grafica.x);
        labelY.push(element.grafica.y);
        aforoMax = element.aforoMax;
        sucursal = element.sucursal;
        niños += element.niño;
        adultos += element.adulto;
      });

      this.sucursal.aforoMax = aforoMax;
      this.sucursal.nombre = sucursal;
      this.sucursal.niños = niños;
      this.sucursal.adultos = adultos;
      this.sucursal.aforoActual = Math.trunc((niños + adultos) / 5);
      this.labelX = labelX;
      this.labelY = labelY;

      //console.log(this.labelX);
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

      this.calculaPorcentajeAforo();
    },
    calculaPorcentajeAforo() {
      //console.log(this.sucursal.aforoActual);
      //console.log(this.sucursal.aforoMax);
      this.porcentajeAforo =
        (this.sucursal.aforoActual / this.sucursal.aforoMax) * 100;
      //console.log(this.porcentajeAforo);
    },
  },
  created() {
    this.initBigChart(3);
  },
};
</script>
<style>
.container {
  max-width: 95% !important;
}
.card {
  width: 100%;
}
.text-primary {
  font-weight: bolder;
  color: var(--primary) !important;
}
.bg-gradient-primary {
  background: var(--primary) !important;
}
.bg-primary {
  background-color: var(--primary) !important;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: var(--secondary) !important;
  background-color: var(--primary) !important;
}
.nav-pills .nav-link {
  color: var(--primary) !important;
}
.row {
  padding-bottom: 2px;
  padding-top: 2px;
}
.col-md-6 {
  max-width: 30% !important;
}
.flatpickr-input[readonly],
.form-control[readonly] {
  background-color: #fff;
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
