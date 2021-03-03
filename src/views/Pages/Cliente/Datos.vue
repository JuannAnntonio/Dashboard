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
              <button class="btn" style="width: 195px;"><span><i class="fa fa-download"></i> Descargar informe</span></button>
            </div>
          </div>
      </div>

      <el-table class="table-responsive table" header-row-class-name="thead-light" :data="datos">

        <el-table-column label="Cliente" min-width="178px" prop="cliente"/>
        <el-table-column label="Sucursal" min-width="175px" prop="sucursal" />
        <el-table-column label="Tipo Disp." min-width="135px" prop="tipoDispositivo"/>
        <el-table-column label="Ubicación Disp." min-width="189px" prop="ubicacionDispositivo"/>
        <el-table-column label="Fecha" min-width="191px" prop="fecha"/>
        <el-table-column label="Altura" min-width="118px" prop="altura"/>
        <el-table-column label="Dirección" min-width="140px" prop="direccion"/>
        <el-table-column label="Sub Total" min-width="135px" prop="subTotal"/>

        <el-table-column label="Estado" min-width="220px" prop="status">
          <template v-slot="{ row }">
            <span class="badge" :class="`bg-${row.status.statusType}`" >{{row.status.descripcion}}
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
.badge {
  font-size: 95%;
  color: white;
}
.btn>span {
  color: var(--primary);
}

</style>
