<template>
  <b-container class="pb-6 pt-6  d-flex" style="width: 90%">
    <b-card no-body>
      <b-card-header class="border-0">
        <h3 class="mb-0">Reporte de dispositivos</h3>
      </b-card-header>

      <el-table
        class="table-responsive table"
        header-row-class-name="thead-light"
        :data="dispositivos"
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
            <span class="badge bg-secondary">{{row.status.descripcion}}
            </span>
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
import dispositivos from "./administracion";
import { Table, TableColumn } from "element-ui";
export default {
  name: "reporte-dispositivos",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      dispositivos,
      currentPage: 1
    };
  }
};
</script>
<style>
.container {
  max-width: 1180px;
}
</style>
