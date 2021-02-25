<template>
  <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
    <card>
      <h2 class="mb-0">Registrar sucursal</h2>
      <hr class="my-3" />
      <b-form @submit.prevent="saveSucursal">
        <div class="pl-lg-4">
          <b-row>
            <b-col lg="11">
              <base-input
                type="text"
                label="Nombre de la sucursal:"
                v-model="sucursal.nombre"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Aforo:"
                v-model="sucursal.aforo"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Cliente:"
                v-model="sucursal.cliente"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Ubicación geográfica:"
                v-model="sucursal.ubicacion"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-button type="success">Registrar</base-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </card>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      sucursal: {
        nombre: "MINISO Madero",
        aforo: "192",
        cliemte: "MINISO",
        ubicacion: "2134,94845"
      }
    };
  }
};
</script>
<style>
.form-group {
    margin-bottom: 0.5rem;
}
</style>
