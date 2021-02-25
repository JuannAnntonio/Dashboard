<template>
  <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
    <card>
      <h2 class="mb-0">Registrar cliente</h2>
      <hr class="my-3" />
      <b-form @submit.prevent="saveCliente">
        <div class="pl-lg-4">
          <b-row>
            <b-col lg="11">
              <base-input
                type="text"
                label="Nombre del cliente:"
                placeholder="Username"
                v-model="cliente.nombre"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <ColourPicker
                v-model="cliente.color"
                :color="cliente.color"
                picker="chrome"
                label="Color"
              />
            </b-col>
            <b-col lg="11">
              <base-input
                type="email"
                label="Correo:"
                placeholder="mike@email.com"
                v-model="cliente.email"
              >
              </base-input>
            </b-col>
            <b-col lg="11">
              <base-input
                type="file"
                label="Logo:"
                placeholder="Ningún archivo seleccionado"
                v-model="cliente.logo"
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
import ColourPicker from "vue-colour-picker";

export default {
  data() {
    return {
      cliente: {
        nombre: "MINISO",
        color: "#000000",
        email: "dev.juan.perez@miniso.com",
        logo: ""
      }
    };
  },
  methods: {},
  components: {
    ColourPicker: ColourPicker
  }
};
</script>
<style>
.form-group {
    margin-bottom: 0.5rem;
}
</style>
