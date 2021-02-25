<template>
  <b-container class="pb-6 pt-6  d-flex">
    <b-card no-body>
      <b-card-header class="border-0">
        <h3 class="mb-0">Descarga de datos</h3>
      </b-card-header>

      <div class="container">

          <div class="row justify-content-start">
            <div class="col">
              <base-input
                type="text"
                label="Sucursal:"
                placeholder="Sucursal"
                v-model="model.sucursal"
              >
              </base-input>
            </div>
            <div class="col">
              <base-input
                type="text"
                label="Ubicación:"
                placeholder="Ubicación"
                v-model="model.ubicacion"
              >
              </base-input>
            </div>
            <div class="col">
              <base-input
                type="date"
                label="Fecha Inicio:"
                v-model="model.startDate"
              >
              </base-input>
            </div>
            <div class="col">
              <base-input
                type="date"
                label="Fecha Fin:"
                v-model="model.endDate"
              >
              </base-input>
            </div>
            <div class="col align-self-center">
              <button class="btn" style="width: 195px;"><i class="fa fa-download"></i> Descargar informe</button>
            </div>
          </div>
      </div>

      <el-table
        class="table-responsive table"
        header-row-class-name="thead-light"
        :data="datos"
      >
        <el-table-column label="# Dispositivo" min-width="155px" prop="id">
        </el-table-column>
        <el-table-column
          label="MAC Dispositivo"
          prop="macDispositivo"
          min-width="175px"
        >
        </el-table-column>

        <el-table-column label="Sucursal" min-width="195px" prop="sucursal">
        </el-table-column>

        <el-table-column label="Ubicación" min-width="180px" prop="ubicacion">
        </el-table-column>

        <el-table-column label="Registro" min-width="200px" prop="registro">
        </el-table-column>

        <el-table-column label="Estatus" prop="status" min-width="240px">
          <template v-slot="{ row }">
            <badge class="badge-dot mr-4">
              <i :class="`bg-${row.status.statusType}`"></i>
              <span class="status" :class="`text-${row.status.statusType}`">{{
                row.status.descripcion
              }}</span>
            </badge>
          </template>
        </el-table-column>
      </el-table>

      <!--b-card-footer class="py-4 d-flex justify-content-end">
        <base-pagination
          v-model="currentPage"
          :per-page="10"
          :total="50"
        ></base-pagination>
      </b-card-footer-->
    </b-card>
  </b-container>
</template>
<script>
import datos from "./datos";
import { Table, TableColumn } from "element-ui";
export default {
  name: "reporte-dispositivos",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      datos,
      currentPage: 1,
      model: {}
    };
  }
};
</script>

<style>
.container {
  max-width: 1180px;
}
</style>
