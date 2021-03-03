<template>
    <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
        <card class="w-100">
            <h2 class="mb-0">Registrar sucursal</h2>
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
                        <input class="input"
                               :class="{ 'alert-input' : branchOfficeErrorMessage }"
                               type="text"
                               id="branchOffice"
                               name="branchOffice"
                               v-model="branchOffice">
                    </div>
                    <label v-if="latitudeErrorMessage"
                           class="alert-label mb-0">
                        {{ this.latitudeErrorMessage }}
                    </label>
                    <label v-if="!latitudeErrorMessage"
                           class="mb-0">
                        {{ this.inputs.latitude.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : latitudeErrorMessage }"
                               type="text"
                               id="latitude"
                               name="latitude"
                               v-model="latitude">
                    </div>
                    <label v-if="lengthErrorMessage"
                           class="alert-label mb-0">
                        {{ this.lengthErrorMessage }}
                    </label>
                    <label v-if="!lengthErrorMessage"
                           class="mb-0">
                        {{ this.inputs.length.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : lengthErrorMessage }"
                               type="text"
                               id="length"
                               name="length"
                               v-model="length">
                    </div>
                    <div class="row">
                        <div class="col">
                            <label v-if="capacityErrorMessage"
                                   class="alert-label mb-0">
                                {{ this.capacityErrorMessage }}
                            </label>
                            <label v-if="!capacityErrorMessage"
                                   class="mb-0">
                                {{ this.inputs.capacity.label }}
                            </label>
                            <div class="wrap-input mb-3 mt-3">
                                <input class="input"
                                       :class="{ 'alert-input' : capacityErrorMessage }"
                                       type="text"
                                       id="capacity"
                                       name="capacity"
                                       v-model="capacity">
                            </div>
                        </div>
                        <div class="col">
                            <label v-if="staffErrorMessage"
                                   class="alert-label mb-0">
                                {{ this.staffErrorMessage }}
                            </label>
                            <label v-if="!staffErrorMessage"
                                   class="mb-0">
                                {{ this.inputs.staff.label }}
                            </label>
                            <div class="wrap-input mb-3 mt-3">
                                <input class="input"
                                       :class="{ 'alert-input' : staffErrorMessage }"
                                       type="text"
                                       id="staff"
                                       name="staff"
                                       v-model="staff">
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end mb-4">
                        <button type="submit" class="login-button">
                            Registrar
                        </button>
                    </div>
                </div>
            </b-form>
            <hr class="my-3"/>

            <el-table class="table-responsive table" header-row-class-name="thead-light" :data="data">

                <el-table-column label="Cliente" min-width="155px" prop="client">

                </el-table-column>

                <el-table-column label="Sucursal" min-width="175px" prop="branchOffice">

                </el-table-column>

                <el-table-column label="Latitud" min-width="195px" prop="latitude">

                </el-table-column>

                <el-table-column label="Longitud" min-width="180px" prop="length">

                </el-table-column>

                <el-table-column label="Aforo" min-width="180px" prop="capacity">

                </el-table-column>

                <el-table-column label="Staff" min-width="180px" prop="staff">

                </el-table-column>

            </el-table>
        </card>
    </b-container>
</template>
<script>
import {Table, TableColumn} from "element-ui";

export default {
    data: function () {
        return {
            client: null,
            branchOffice: null,
            latitude: null,
            length: null,
            capacity: null,
            staff: null,
            clientErrorMessage: null,
            branchOfficeErrorMessage: null,
            latitudeErrorMessage: null,
            lengthErrorMessage: null,
            capacityErrorMessage: null,
            staffErrorMessage: null,
            inputs: {
                client: {
                    label: "Cliente",
                },
                branchOffice: {
                    label: "Sucursal"
                },
                latitude: {
                    label: 'Latitud'
                },
                length: {
                    label: 'Longitud'
                },
                capacity: {
                    label: 'Aforo'
                },
                staff: {
                    label: 'Staff'
                }
            },
            clients: [
                'Miniso 1',
                'Miniso 2',
                'Miniso 3',
            ],
            data: [
                {
                    client: 'Miniso S.A de C.V',
                    branchOffice: 'Madero',
                    latitude: '3 mts',
                    length: '20 mts',
                    capacity: 60,
                    staff: 7,
                },
                {
                    client: 'Miniso S.A de C.V',
                    branchOffice: 'Coyoacan',
                    latitude: '3 mts',
                    length: '20 mts',
                    capacity: 60,
                    staff: 7,
                },
                {
                    client: 'Miniso S.A de C.V',
                    branchOffice: 'Tepeyac',
                    latitude: '3 mts',
                    length: '20 mts',
                    capacity: 60,
                    staff: 7,
                }
            ],
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

            if(!this.latitude){
                this.latitudeErrorMessage = 'La latitud no puede estar vacia';

                document.getElementById('latitude').focus();

                return;
            }

            if(!this.length){
                this.lengthErrorMessage = 'La longitud no puede estar vacia';

                document.getElementById('length').focus();

                return;
            }

            if(!this.capacity){
                this.capacityErrorMessage = 'El aforo no puede estar vacio';

                document.getElementById('capacity').focus();

                return;
            }

            if(!this.staff){
                this.staffErrorMessage = 'El staff no puede estar vacio';

                document.getElementById('staff').focus();

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
        latitude(value) {
            if (value.trim()) {
                this.latitudeErrorMessage = null;
            } else {
                this.latitude = '';
            }
        },
        length(value) {
            if (value.trim()) {
                this.lengthErrorMessage = null;
            } else {
                this.length = '';
            }
        },
        capacity(value) {
            if (value.trim()) {
                this.capacityErrorMessage = null;
            } else {
                this.capacity = '';
            }
        },
        staff(value) {
            if (value.trim()) {
                this.staffErrorMessage = null;
            } else {
                this.staff = '';
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
