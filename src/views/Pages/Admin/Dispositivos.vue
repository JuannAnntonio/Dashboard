<template>
  <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
    <card>
      <h2 class="mb-0">Registrar dispositivo</h2>
      <hr class="my-3" />
      <b-form @submit.prevent="saveDispositivos">
        <div class="pl-lg-4">
          <b-row>
            <b-col lg="11">
              <base-input
                type="text"
                label="ID del dispositivo:"
                placeholder="ID"
                v-model="dispositivo.id"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Cliente:"
                placeholder="cliente"
                v-model="dispositivo.cliente"
              />
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Sucursal:"
                placeholder="sucursal"
                v-model="dispositivo.sucursal"
              />
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Ubicación:"
                placeholder="ubicacion"
                v-model="dispositivo.ubicacion"
              />
            </b-col>
            <b-col lg="11">
              <base-input
                type="text"
                label="Ubicación geográfica:"
                placeholder="ubicacionGeografica"
                v-model="dispositivo.ubicacionGeografica"
              />
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
      dispositivo: {
        id: "Creative Code Inc.",
        cliente: "michael23",
        sucursal: "MADERO",
        ubicacion: "ENtrada Norte",
        ubicacionGeografica: "91992,24484"
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
