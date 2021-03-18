<template>
  <b-container class="pb-6 pt-6  d-flex">
    <b-card class="w-100">
      <div class="row justify-content-start">
        <div class="col">
          <stats-card title="Sucursal">
            <h5 class="card-title text-uppercase text-muted mb-0">Sucursal</h5>
            <div class="wrap-input mb-3 mt-3">
              <select class="input" id="sucursal" v-model="sucursal">
                <option
                    v-bind:key="sucursal.id"
                    v-for="sucursal in sucursales"
                    :value="sucursal">
                  {{ sucursal.nombre }}
                </option>
              </select>
            </div>
            <template slot="footer">
              Aforo máx:
              <span class="text-primary">{{ sucursal.aforoMax }}</span>
              <br/>
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
              <br/>
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
          <div class="col-xl-7 col-md-12 col-sm-12">
            <div class="row justify-content-start">
              <div class="col-auto">
                <div class="row" v-if="optionDate">
                  <div class="col">
                    <base-input label="Inicio:">
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
                    <base-input label="Final:">
                      <flat-picker
                          placeholder="dd / mm / aaaa"
                          :config="configEndDate"
                          class="form-control datepicker"
                          v-model="endDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col">
                    <div tabindex="-1" role="group" class="bv-no-focus-ring">
                      <label class="form-control-label"><br/></label>
                      <div class="has-label">
                        <button
                            type="submit"
                            class="login-button"
                            style="min-width: 15px; height: 40px;"
                            @click="range();"
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-start">
              <div class="col-auto">
                <h5 class="h3 text-primary mb-0">{{ tituloGrafica }}</h5>
              </div>
              <div class="col">
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                      :active="bigLineChart.activeIndex === 0"
                      @click="
                      optionDate = false;
                      calculateForDay();
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
                      calculateForWeek();
                    "
                      link-classes="py-0 px-2"
                  >
                    <span class="d-none d-md-block">Semana</span>
                    <span class="d-md-none">S</span>
                  </b-nav-item>
                  <b-nav-item
                      @click="
                      optionDate = false;
                      calculateForMonth();
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
                      calculateForYear();
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
                    <span class="d-none d-md-block">
                      <el-tooltip
                          placement="bottom"
                          content="Fecha Personalizada"
                      >
                        <i class="ni ni-calendar-grid-58"/>
                      </el-tooltip>
                    </span>
                    <span class="d-md-none"
                    ><el-tooltip
                        placement="bottom"
                        content="Fecha Personalizada"
                    >
                        <i class="ni ni-calendar-grid-58"/> </el-tooltip
                    ></span>
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
          <div class="col-xl-5 col-md-12 col-sm-12">
            <h5 class="h3 text-primary mb-0" style="text-align: center;">Visitantes</h5>
            <br/>
            <dona-chart
                :height="300"
                :chart-data="chartDonaData"
                :options="optionsPieData"
            />
          </div>
        </div>
        <br/>
        <div class="row justify-content-start">
          <div class="col">
            <h5 class="h3 text-primary mb-0" style="text-align: center;">Mapa de calor</h5>
            <img src="img/svg/MapadeCalorProp1.svg"/>
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
import DonaChart from "@/components/Charts/DonaChart";
import datos from "./Pages/dataDashboard";

export default {
  components: {
    LineChart,
    BaseProgress,
    flatPicker,
    DonaChart,
  },
  data() {
    return {
      optionDate: false,
      datos,
      tituloGrafica: '',
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
        nombre: "Plaza Virtual",
        aforoMax: 0,
        aforoActual: 0,
        ninios: 0,
        adultos: 0,
      },
      sucursales: [
        {id: 1, nombre: "Plaza Virtual"},
        {id: 2, nombre: "Plaza Madero"},
      ],
      dataPastel: [],
      optionsPieData: {
        cutoutPercentage: 50,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "black",
            padding: 50,
            boxWidth: 80,
          },
        },
      },
      chartDonaData: {
        labels: ["Adultos", "Niños"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#5e72e4", "#9ba8f49c "],
            borderColor: "black",
            hoverBackgroundColor: ["#5e72e4", "#9ba8f49c "],
            hoverBorderColor: "red",
          },
        ],
      },

      porcentajeAforo: "0",
      startDate: "2021-03-01",
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
    range() {
      let initDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);

      let diferenciaDias = endDate.getTime() - initDate.getTime()
      console.log(Math.round(diferenciaDias / (1000 * 60 * 60 * 24)))

      if (diferenciaDias == 0) {
        this.calculateForDay();
      } else if (diferenciaDias <= 7) {
        this.calculateForWeek();
      } else if (diferenciaDias >= 32) {
        this.calculateForMonth();
      } else if (diferenciaDias >= 366) {
        this.calculateForYear();
      }
    },
    calculateForDay() {
      this.bigLineChart.activeIndex = 0;
      this.tituloGrafica = "Resumen actual"
      this.initBigChart(4);
    },
    calculateForWeek() {
      this.bigLineChart.activeIndex = 1;
      this.tituloGrafica = "Resumen semanal"
      this.initBigChart(1);
    },
    calculateForMonth() {
      this.bigLineChart.activeIndex = 2;
      this.tituloGrafica = "Resumen mensual"
      this.initBigChart(5);
    },
    calculateForYear() {
      this.bigLineChart.activeIndex = 3;
      this.tituloGrafica = "Resumen anual"
      this.initBigChart(3);
    },
    initBigChart(index) {
      const labelX = [];
      const labelY = [];
      this.bigLineChart.chartData = {};

      let ninios = 0;
      let adultos = 0;
      let aforoMax = 0;
      let sucursal = "";

      const self = this;

      if (index === 4) {
        this.datos[index].aforo.forEach(function (element) {
          const date = element.fecha.substring(0, 4) + "-" + element.fecha.substring(4, 6) + "-" + element.fecha.substring(6);

          if (date === self.startDate) {
            labelX.push(element.x);
            labelY.push(parseInt(element.y));
            aforoMax += parseInt(element.aforoMax);
            sucursal = element.sucursal;
            ninios += parseInt(element.niño);
            adultos += parseInt(element.adulto);
          }
        });
      } else if (index === 5) {
        this.datos[index].aforo.forEach(function (element) {
          const month = element.fecha.substring(4, 6);

          if (month === "03") {
            labelX.push(element.x);
            labelY.push(parseInt(element.y));
            aforoMax += parseInt(element.aforoMax);
            sucursal = element.sucursal;
            ninios += parseInt(element.niño);
            adultos += parseInt(element.adulto);
          }
        });
      } else if (index === 1) {
        this.datos[5].aforo.forEach(function (element) {
          const day = element.fecha.substring(6);
          const month = element.fecha.substring(4, 6);

          if (parseInt(day) < 8 && month === "03") {
            labelX.push(element.x);
            labelY.push(parseInt(element.y));
            aforoMax += parseInt(element.aforoMax);
            sucursal = element.sucursal;
            ninios += parseInt(element.niño);
            adultos += parseInt(element.adulto);
          }
        });
      }

      this.sucursal.nombre = sucursal;
      this.sucursal.ninios = ninios;
      this.sucursal.adultos = adultos;
      this.sucursal.aforoMax = aforoMax;
      this.sucursal.aforoActual = Math.trunc((ninios + adultos) / 5);
      this.labelX = labelX;
      this.labelY = labelY;

      var donaData = {
        labels: ["Adultos", "Niños"],
        datasets: [
          {
            data: [adultos, ninios],
            backgroundColor: ["#5e72e4", "#9ba8f49c "],
            borderColor: "black",
            hoverBorderColor: "black",
            hoverBackgroundColor: ["#5e72e4", "#9ba8f49c "],
          },
        ],
      };

      this.chartDonaData = donaData;
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
    this.calculateForDay();
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
