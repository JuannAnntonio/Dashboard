<template>
    <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
        <card class="w-100">
            <h2 class="mb-0">Registrar dispositivo en sucursal de cliente</h2>
            <hr class="my-3"/>
            <b-form @submit.prevent="submitTo">
                <div class="pl-lg-4">
                    <label v-if="clientErrorMessage"
                           class="alert-label mb-0">
                        {{ this.clientErrorMessage }}
                    </label>
                    <label v-if="!clientErrorMessage"
                           class="mb-0">
                        {{ this.inputs.client.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <select class="input"
                                id="client"
                                name="client"
                                v-model="client">
                            <option v-for="client in clients" :value="client">{{ client }}</option>
                        </select>
                    </div>
                    <label v-if="branchOfficeErrorMessage"
                           class="alert-label mb-0">
                        {{ this.branchOfficeErrorMessage }}
                    </label>
                    <label v-if="!branchOfficeErrorMessage"
                           class="mb-0">
                        {{ this.inputs.branchOffice.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <select class="input"
                                id="branchOffice"
                                name="branchOffice"
                                v-model="branchOffice">
                            <option v-for="branchOffice in branchOffices" :value="branchOffice">{{ branchOffice }}</option>
                        </select>
                    </div>
                    <label v-if="IPErrorMessage"
                           class="alert-label mb-0">
                        {{ this.IPErrorMessage }}
                    </label>
                    <label v-if="!IPErrorMessage"
                           class="mb-0">
                        {{ this.inputs.IP.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : IPErrorMessage }"
                               type="text"
                               id="IP"
                               name="IP"
                               v-model="IP">
                    </div>
                    <label v-if="IdDeviceErrorMessage"
                           class="alert-label mb-0">
                        {{ this.IdDeviceErrorMessage }}
                    </label>
                    <label v-if="!IdDeviceErrorMessage"
                           class="mb-0">
                        {{ this.inputs.IdDevice.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <select class="input"
                                id="IdDevice"
                                name="IdDevice"
                                v-model="IdDevice">
                            <option v-for="IdDevice in IdDevices" :value="IdDevice">{{ IdDevice }}</option>
                        </select>
                    </div>
                    <label v-if="locationErrorMessage"
                           class="alert-label mb-0">
                        {{ this.locationErrorMessage }}
                    </label>
                    <label v-if="!locationErrorMessage"
                           class="mb-0">
                        {{ this.inputs.location.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : locationErrorMessage }"
                               type="text"
                               id="location"
                               name="location"
                               v-model="location">
                    </div>
                    <div class="mt-4 d-flex justify-content-end mb-4">
                        <button type="submit" class="login-button mr-3">
                            Buscar
                        </button>
                        <button type="submit" class="login-button">
                            Registrar
                        </button>
                    </div>
                </div>
                <hr class="my-3"/>

                <el-table class="table-responsive table" header-row-class-name="thead-light" :data="data">

                    <el-table-column label="Sucursal" min-width="155px" prop="branchOffice">

                    </el-table-column>

                    <el-table-column label="IP" min-width="175px" prop="IP">

                    </el-table-column>

                    <el-table-column label="MAC" min-width="195px" prop="MAC">

                    </el-table-column>

                    <el-table-column label="Ubicación" min-width="180px" prop="location">

                    </el-table-column>

                </el-table>
            </b-form>
        </card>
    </b-container>
</template>
<script>
import {Table, TableColumn} from "element-ui";

export default {
    data() {
        return {
            client: null,
            branchOffice: null,
            IP: null,
            IdDevice: null,
            location: null,
            clientErrorMessage: null,
            branchOfficeErrorMessage: null,
            IPErrorMessage: null,
            IdDeviceErrorMessage: null,
            locationErrorMessage: null,
            inputs: {
                client: {
                    label: 'Cliente'
                },
                branchOffice: {
                    label: 'Sucursal'
                },
                IP: {
                    label: 'IP'
                },
                IdDevice: {
                    label: 'ID de disposivo'
                },
                location: {
                    label: 'Ubicación'
                },
            },
            clients: [
                'Miniso 1',
                'Miniso 2',
                'Miniso 3',
            ],
            branchOffices: [
                'Tepeyac',
                'Coyoacan',
                'Madero'
            ],
            IdDevices: [
              '001',
              '002',
              '003'
            ],
            data: [
                {
                    branchOffice: 'Bellavista',
                    IP: '0.0.0.1',
                    MAC: '00:0a:95:9d:68:16',
                    location: 'CDMX'
                },
                {
                    branchOffice: 'Lindavista',
                    IP: '0.0.0.2',
                    MAC: '00:0a:95:9d:68:15',
                    location: 'CDMX'
                },
            ]
        };
    },
    methods: {
        submitTo() {
            if(!this.client){
                this.clientErrorMessage = 'El cliente no puede estar vacio';

                document.getElementById('client').focus();

                return;
            }

            if(!this.branchOffice){
                this.branchOfficeErrorMessage = 'La sucursal no puede estar vacia';

                document.getElementById('branchOffice').focus();

                return;
            }

            if(!this.IP){
                this.IPErrorMessage = 'La IP no puede estar vacia';

                document.getElementById('IP').focus();

                return;
            }

            if(!this.IdDevice){
                this.IdDeviceErrorMessage = 'El id de dispositivo no puede estar vacio';

                document.getElementById('IdDevice').focus();

                return;
            }

            if(!this.location){
                this.locationErrorMessage = 'La ubicación no puede estar vacia';

                document.getElementById('location').focus();

                return;
            }
        },
    },
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    watch: {
        client(value) {
            if (value.trim()) {
                this.clientErrorMessage = null;
            } else {
                this.client = '';
            }
        },
        branchOffice(value) {
            if (value.trim()) {
                this.branchOfficeErrorMessage = null;
            } else {
                this.branchOffice = '';
            }
        },
        IP(value) {
            if (value.trim()) {
                this.IPErrorMessage = null;
            } else {
                this.IP = '';
            }
        },
        IdDevice(value) {
            if (value.trim()) {
                this.IdDeviceErrorMessage = null;
            } else {
                this.IdDevice = '';
            }
        },
        location(value) {
            if (value.trim()) {
                this.locationErrorMessage = null;
            } else {
                this.location = '';
            }
        },
    }
};
</script>
<style>
.form-group {
    margin-bottom: 0.5rem;
}
</style>
