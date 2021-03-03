<template>
    <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
        <card class="w-100">
            <h2 class="mb-0">Registrar dispositivo</h2>
            <hr class="my-3"/>
            <b-form @submit.prevent="submitTo">
                <div class="pl-lg-4">
                    <label v-if="deviceTypeErrorMessage"
                           class="alert-label mb-0">
                        {{ this.deviceTypeErrorMessage }}
                    </label>
                    <label v-if="!deviceTypeErrorMessage"
                           class="mb-0">
                        {{ this.inputs.deviceType.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <select class="input"
                                id="deviceType"
                                name="deviceType"
                                v-model="deviceType">
                            <option v-for="device in devices" :value="device">{{ device }}</option>
                        </select>
                    </div>
                    <label v-if="MACAddressErrorMessage"
                           class="alert-label mb-0">
                        {{ this.MACAddressErrorMessage }}
                    </label>
                    <label v-if="!MACAddressErrorMessage"
                           class="mb-0">
                        {{ this.inputs.MACAddress.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : MACAddressErrorMessage }"
                               type="text"
                               id="MACAddress"
                               name="MACAddress"
                               v-model="MACAddress">
                    </div>
                    <label v-if="versionErrorMessage"
                           class="alert-label mb-0">
                        {{ this.versionErrorMessage }}
                    </label>
                    <label v-if="!versionErrorMessage"
                           class="mb-0">
                        {{ this.inputs.version.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : versionErrorMessage }"
                               type="text"
                               id="version"
                               name="version"
                               v-model="version">
                    </div>
                    <label v-if="nSerieErrorMessage"
                           class="alert-label mb-0">
                        {{ this.nSerieErrorMessage }}
                    </label>
                    <label v-if="!nSerieErrorMessage"
                           class="mb-0">
                        {{ this.inputs.nSerie.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : nSerieErrorMessage }"
                               type="text"
                               id="nSerie"
                               name="nSerie"
                               v-model="nSerie">
                    </div>
                    <label v-if="MovtoClassErrorMessage"
                           class="alert-label mb-0">
                        {{ this.MovtoClassErrorMessage }}
                    </label>
                    <label v-if="!MovtoClassErrorMessage"
                           class="mb-0">
                        {{ this.inputs.MovtoClass.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : MovtoClassErrorMessage }"
                               type="text"
                               id="MovtoClass"
                               name="MovtoClass"
                               v-model="MovtoClass">
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

                    <el-table-column label="Dispositivo" min-width="155px" prop="deviceType">

                    </el-table-column>

                    <el-table-column label="MAC Address" min-width="175px" prop="MACAddress">

                    </el-table-column>

                    <el-table-column label="Versión" min-width="195px" prop="version">

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
            deviceType: null,
            MACAddress: null,
            version: null,
            nSerie: null,
            MovtoClass: null,
            deviceTypeErrorMessage: null,
            MACAddressErrorMessage: null,
            versionErrorMessage: null,
            nSerieErrorMessage: null,
            MovtoClassErrorMessage: null,
            inputs: {
                deviceType: {
                    label: 'Tipo de dispositivo'
                },
                MACAddress: {
                    label: 'MAC Address'
                },
                version: {
                    label: 'Versión'
                },
                nSerie: {
                    label: 'Número de serie'
                },
                MovtoClass: {
                    label: 'Clase de Movto'
                },
            },
            devices: [
                'Sensor',
                'Sensor 2',
                'Sensor 3'
            ],
            data: [
                {
                    deviceType: 'Sensor',
                    MACAddress: '00:0a:95:9d:68:16',
                    version: '1.0',
                    location: 'Coyoacan'
                },
                {
                    deviceType: 'Sensor 2',
                    MACAddress: '00:0a:95:9d:68:10',
                    version: '1.0',
                    location: 'Madero'
                },
            ]
        };
    },
    methods: {
        submitTo() {
            if(!this.deviceType){
                this.deviceTypeErrorMessage = 'El tipo de dispositivo no puede estar vacio';

                document.getElementById('deviceType').focus();

                return;
            }

            if(!this.MACAddress){
                this.MACAddressErrorMessage = 'El MAC Address no puede estar vacio';

                document.getElementById('MACAddress').focus();

                return;
            }

            if(!this.version){
                this.versionErrorMessage = 'La versión no puede estar vacia';

                document.getElementById('version').focus();

                return;
            }

            if(!this.nSerie){
                this.nSerieErrorMessage = 'El número de serie no puede estar vacio';

                document.getElementById('nSerie').focus();

                return;
            }

            if(!this.MovtoClass){
                this.MovtoClassErrorMessage = 'La clase de movto no puede estar vacia';

                document.getElementById('MovtoClass').focus();

                return;
            }
        },
    },
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    watch: {
        deviceType(value) {
            if (value.trim()) {
                this.deviceTypeErrorMessage = null;
            } else {
                this.deviceType = '';
            }
        },
        MACAddress(value) {
            if (value.trim()) {
                this.MACAddressErrorMessage = null;
            } else {
                this.MACAddress = '';
            }
        },
        version(value) {
            if (value.trim()) {
                this.versionErrorMessage = null;
            } else {
                this.version = '';
            }
        },
        nSerie(value) {
            if (value.trim()) {
                this.nSerieErrorMessage = null;
            } else {
                this.nSerie = '';
            }
        },
        MovtoClass(value) {
            if (value.trim()) {
                this.MovtoClassErrorMessage = null;
            } else {
                this.MovtoClass = '';
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
