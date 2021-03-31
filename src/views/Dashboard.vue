<template>
  <b-container class="pb-6 pt-6  d-flex">
    <b-card class="w-100">
      <div class="row justify-content-start">
        <div class="col">
          <stats-card title="Sucursal">
            <h5 class="card-title text-uppercase text-muted mb-0">Sucursal</h5>
            <div class="wrap-input mb-3 mt-3">
              <select class="input">
                <option v-for="(branch, index) in branchOffices"
                        v-bind:value="branch.id"
                        v-bind:selected="index === 0"
                        v-bind:key="branch.id">
                  {{ branch.name }}
                </option>

              </select>
            </div>
            <template slot="footer">
              <span class="text-primary pr-2">Aforo máx:</span>
              <span class="text-primary font-weight-bold">{{ branch.maxCapacity }}</span>
              <br/>
              <span class="text-primary pr-2">Aforo:</span>
              <span class="text-primary font-weight-bold">{{ branch.currentCapacity }}</span>
            </template>
          </stats-card>
        </div>
        <div class="col">
          <stats-card
              title="Aforo actual"
              type="gradient-primary"
              :sub-title="this.branch.percentageOfCapacity + '%'"
              icon="ni ni-chart-bar-32"
              class="mb-2">
            <template slot="footer">
              <br/>
              <base-progress
                  type="primary"
                  :height="8"
                  :value="this.branch.percentageOfCapacity"
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
                <div class="row" v-if="this.isFreeSelection">
                  <div class="col">
                    <base-input label="Inicio:">
                      <flat-picker
                          placeholder="dd / mm / aaaa"
                          class="form-control datepicker"
                          :config="configDate"
                          v-model="startDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col">
                    <base-input label="Final:">
                      <flat-picker
                          placeholder="dd / mm / aaaa"
                          :config="configDate"
                          class="form-control datepicker"
                          v-model="endDate"
                      >
                      </flat-picker>
                    </base-input>
                  </div>
                  <div class="col">
                    <div tabindex="-1" role="group" class="bv-no-focus-ring">
                      <label class="form-control-label"><br/></label>
                      <div class="has-label d-flex">
                        <button
                            type="submit"
                            class="login-button mr-4"
                            style="min-width: 15px; height: 40px;"
                            @click="freeSelection()">
                          Buscar
                        </button>
                        <button
                            type="button"
                            class="cancel-button"
                            style="min-width: 15px; height: 40px;"
                            @click="closeFreeSelection()">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-start" v-if="!this.isFreeSelection">
              <div class="col-auto">
                <h5 class="h3 text-primary mb-0">{{ graphicTitle }}</h5>
              </div>
              <div class="col">
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                      :active="rangeSelection === 'day'"
                      @click="calculateForDay()"
                      link-classes="py-0 px-2">
                    <span class="d-none d-md-block">Día</span>
                    <span class="d-md-none">D</span>
                  </b-nav-item>
                  <b-nav-item
                      :active="rangeSelection === 'week'"
                      @click="calculateForWeek()"
                      link-classes="py-0 px-2">
                    <span class="d-none d-md-block">Semana</span>
                    <span class="d-md-none">S</span>
                  </b-nav-item>
                  <b-nav-item
                      @click="calculateForMonth()"
                      :active="rangeSelection === 'month'"
                      link-classes="py-0 px-2">
                    <span class="d-none d-md-block">Mes</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                      :active="rangeSelection === 'year'"
                      @click="calculateForYear()"
                      link-classes="py-0 px-2">
                    <span class="d-none d-md-block">Año</span>
                    <span class="d-md-none">A</span>
                  </b-nav-item>
                  <b-nav-item
                      :active="rangeSelection === 'free'"
                      @click="freeSelection()"
                      link-classes="py-0 px-2">
                    <span class="d-none d-md-block">
                      <el-tooltip
                          placement="bottom"
                          content="Fecha Personalizada">
                        <i class="ni ni-calendar-grid-58"/>
                      </el-tooltip>
                    </span>
                    <span class="d-md-none"><el-tooltip
                        placement="bottom"
                        content="Fecha Personalizada">
                        <i class="ni ni-calendar-grid-58"/> </el-tooltip></span>
                  </b-nav-item>
                </b-nav>
              </div>
            </div>
            <br/>
            <div class="row justify-content-start">
              <div class="col">
                <line-chart
                    :height="350"
                    :chart-data="lineChartData">
                </line-chart>
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-md-12 col-sm-12">
            <h5 class="h3 text-primary mb-0" style="text-align: center;">Visitantes</h5>
            <br/>
            <dona-chart
                :height="300"
                :chart-data="donutChartData"
                :options="donutChartData.options"
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
import DonaChart from "@/components/Charts/DonaChart";
import axios from "axios";

const PERIODS = {
  BY_DAY: "day",
  BY_WEEK: "week",
  BY_MONTH: "month",
  BY_YEAR: "year",
  FREE_SELECTION: "free",
};

export default {
  data() {
    return {
      isFreeSelection: false,
      branch: {
        id: 0,
        name: "",
        maxCapacity: 0,
        currentCapacity: 0,
        children: 0,
        adults: 0,
        percentageOfCapacity: 0,
      },
      rangeSelection: PERIODS.BY_MONTH,
      branchOffices: [],
      currentDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      graphicTitle: "",
      lineChartData: {
        datasets: [
          {
            label: "",
            dataY: [],
          },
        ],
        labelsX: [],
      },
      donutChartData: {
        labels: ["Adultos", "Niños"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#33339B", "#9ba8f49c"],
            borderColor: "black",
            hoverBackgroundColor: ["#33339B", "#9ba8f49c"],
            hoverBorderColor: "red",
          },
        ],
        options: {
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
        }
      },
      configDate: {
        maxDate: new Date(),
        dateFormat: "d-M-Y",
        altInput: true,
      },
    }
  },
  components: {
    LineChart,
    flatPicker,
    DonaChart,
  },
  mounted() {
    this.rangeSelection = PERIODS.BY_DAY;
    this.call(1, this.formatDate(this.startDate), this.formatDate(this.endDate));
  },
  methods: {
    calculateForDay() {
      this.graphicTitle = "Resumen de hoy";
      this.isFreeSelection = false;
      this.rangeSelection = PERIODS.BY_DAY;
      let formattedDate = this.formatDate(this.currentDate);
      this.call(1, formattedDate, formattedDate);
    },
    calculateForWeek() {
      this.graphicTitle = "Resumen semanal";
      this.isFreeSelection = false;
      this.rangeSelection = PERIODS.BY_WEEK;
      let month = this.currentDate.getMonth();
      let year = this.currentDate.getFullYear()
      let firstDayOfWeekend = this.startOfWeek(new Date()).getDate();
      let lastDayOfWeekend = this.endOfWeek(new Date()).getDate();
      let monthOfWeek = this.endOfWeek(new Date()).getMonth();
      let startDate = this.formatDate(new Date(year, month, firstDayOfWeekend));
      let endDate = this.formatDate(new Date(year, monthOfWeek, lastDayOfWeekend));
      this.call(2, startDate, endDate);
    },
    calculateForMonth() {
      this.graphicTitle = "Resumen mensual";
      this.isFreeSelection = false;
      this.rangeSelection = PERIODS.BY_MONTH;
      let firstDayOfMonth = 1;
      let month = this.currentDate.getMonth();
      let year = this.currentDate.getFullYear()
      let startDate = this.formatDate(new Date(year, month, firstDayOfMonth));
      let endDate = this.formatDate(new Date(year, month + 1, 0));
      this.call(3, startDate, endDate);
    },
    calculateForYear() {
      this.graphicTitle = "Resumen anual";
      this.isFreeSelection = false;
      this.rangeSelection = PERIODS.BY_YEAR;
      let lastDayOfYear = 31;
      let firstMonthOfYear = 1;
      let lastMonthOfYear = this.currentDate.getMonth();
      let year = this.currentDate.getFullYear()
      let startDate = this.formatDate(new Date(year, 0, firstMonthOfYear));
      let endDate = this.formatDate(new Date(year, lastMonthOfYear, lastDayOfYear));
      this.call(4, startDate, endDate);
    },
    freeSelection() {
      this.graphicTitle = `Fecha del ${this.startDate.getDate()} al ${this.endDate.getDate()}`;
      this.isFreeSelection = true;
      this.rangeSelection = PERIODS.FREE_SELECTION;
      let initDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      let daysDifference = endDate.getTime() - initDate.getTime()

      if (daysDifference === 0) {
        this.call(1, this.formatDate(this.startDate), this.formatDate(this.endDate));
      } else if (daysDifference <= 7) {
        this.call(2, this.formatDate(this.startDate), this.formatDate(this.endDate));
      } else if (daysDifference >= 32) {
        this.call(3, this.formatDate(this.startDate), this.formatDate(this.endDate));
      } else if (daysDifference >= 366) {
        this.call(4, this.formatDate(this.startDate), this.formatDate(this.endDate));
      } else {
        this.call(5, this.formatDate(this.startDate), this.formatDate(this.endDate));
      }
    },
    startOfWeek(date) {
      const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    endOfWeek(date) {
      const lastDay = date.getDate() - (date.getDay() - 1) + 6;
      return new Date(date.setDate(lastDay));
    },
    call(type, startDate, endDate) {
      this.branch.percentageOfCapacity = 0;
      this.branch.currentCapacity = 0;
      this.branch.maxCapacity = 0;
      this.branch.children=0;
      this.branch.adults =0;
      axios.get(`https://connectedmetrics.live/back/datos.php?v007=${type}&v001=${startDate}&v002=${endDate}`)
          .then(response => {
            let index = 0;
            let coordinateX = [];
            let coordinateY = [];

            if (response.data.length === 0) {
              console.log("no mames entré");
              this.branch.percentageOfCapacity = 0;
              this.branch.currentCapacity = 0;
              this.branch.maxCapacity = 0;
              this.donutChartData = {
                labels: [],
                datasets: [],
              };

              this.lineChartData = {
                datasets: [
                  {
                    data: [],
                    backgroundColor: ["#33339B", "#9ba8f49c"],
                    borderColor: "black",
                    hoverBorderColor: "black",
                    hoverBackgroundColor: ["#33339B", "#9ba8f49c"],
                  }
                ],
                labels: coordinateX,
              };

              return;
            }
            
            response.data.forEach((element) => {
              index++;
              this.branch.name = element.customer;
              this.branch.children += element.kids;
              this.branch.adults += element.adults;
              this.branch.maxCapacity += element.maxCapacity;
              coordinateX.push(element.x);
              coordinateY.push(element.y);

              if (this.branchOffices.length === 0) {
                this.branchOffices.push({
                  id: index,
                  name: element.branch
                })
              }
            });

            this.donutChartData = {
              labels: ["Adultos", "Niños"],
              datasets: [
                {
                  data: [this.branch.adults, this.branch.children],
                  backgroundColor: ["#33339B", "#9ba8f49c"],
                  borderColor: "black",
                  hoverBorderColor: "black",
                  hoverBackgroundColor: ["#33339B", "#9ba8f49c"],
                },
              ],
            };

            this.lineChartData = {
              datasets: [
                {
                  label: "Aforo",
                  data: coordinateY,
                },
              ],
              labels: coordinateX,
            };
            this.branch.currentCapacity = Math.trunc((this.branch.children + this.branch.adults) / response.data.length);
            this.branch.percentageOfCapacity = parseFloat(((this.branch.currentCapacity / this.branch.maxCapacity) * 100).toFixed(2));
            this.branch.percentageOfCapacity = this.branch.percentageOfCapacity>100?100:this.branch.percentageOfCapacity;
            console.log(this.branch.children);
            console.log(this.branch.adults);
          });
    },
    formatDate(date) {
      return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2);
    },
    closeFreeSelection() {
      this.isFreeSelection = false;
      this.rangeSelection = PERIODS.BY_DAY;
    }
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
