<template>
    <b-container class="pb-6 pt-6 pt-lg-6 d-flex">
        <card class="w-100">
            <h2 class="mb-0">Registrar cliente</h2>

            <hr class="my-3"/>

            <b-form @submit.prevent="submitTo">
                <div class="pl-lg-4">
                    <label v-if="businessNameErrorMessage"
                           class="alert-label mb-0">
                        {{ this.businessNameErrorMessage }}
                    </label>
                    <label v-if="!businessNameErrorMessage"
                           class="mb-0">
                        {{ this.inputs.businessName.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : businessNameErrorMessage }"
                               type="text"
                               id="businessName"
                               name="businessName"
                               v-model="businessName">
                    </div>
                    <label v-if="aliasErrorMessage"
                           class="alert-label mb-0">
                        {{ this.aliasErrorMessage }}
                    </label>
                    <label v-if="!aliasErrorMessage"
                           class="mb-0">
                        {{ this.inputs.alias.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : aliasErrorMessage }"
                               type="text"
                               id="alias"
                               name="alias"
                               v-model="alias">
                    </div>
                    <label v-if="RFCErrorMessage"
                           class="alert-label mb-0">
                        {{ this.RFCErrorMessage }}
                    </label>
                    <label v-if="!RFCErrorMessage"
                           class="mb-0">
                        {{ this.inputs.RFC.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : RFCErrorMessage }"
                               type="text"
                               id="RFC"
                               name="RFC"
                               v-model="RFC">
                    </div>
                    <label v-if="businessActivityErrorMessage"
                           class="alert-label mb-0">
                        {{ this.businessActivityErrorMessage }}
                    </label>
                    <label v-if="!businessActivityErrorMessage"
                           class="mb-0">
                        {{ this.inputs.businessActivity.label }}
                    </label>
                    <div class="wrap-input mb-3 mt-3">
                        <input class="input"
                               :class="{ 'alert-input' : businessActivityErrorMessage }"
                               type="text"
                               id="businessActivity"
                               name="businessActivity"
                               v-model="businessActivity">
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

                <el-table-column label="Razón Social" min-width="155px" prop="businessName">

                </el-table-column>

                <el-table-column label="Alias" min-width="175px" prop="alias">

                </el-table-column>

                <el-table-column label="RFC" min-width="195px" prop="RFC">

                </el-table-column>

                <el-table-column label="Giro" min-width="180px" prop="businessActivity">

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
            businessName: null,
            alias: null,
            RFC: null,
            businessActivity: null,
            businessNameErrorMessage: null,
            aliasErrorMessage: null,
            RFCErrorMessage: null,
            businessActivityErrorMessage: null,
            inputs: {
                businessName: {
                    label: "Razón Social",
                },
                alias: {
                    label: "Alias"
                },
                RFC: {
                    label: 'RFC'
                },
                businessActivity: {
                    label: 'Giro'
                }
            },
            data: [
                {
                    businessName: 'Miniso S.A de C.V',
                    alias: 'MNS',
                    RFC: 'MINISO MADERO',
                    businessActivity: 'SALIDA SUR',
                },
                {
                    businessName: 'Miniso S.A de C.V',
                    alias: 'MNS',
                    RFC: 'MINISO MADERO',
                    businessActivity: 'SALIDA SUR',
                },
                {
                    businessName: 'Miniso S.A de C.V',
                    alias: 'MNS',
                    RFC: 'MINISO MADERO',
                    businessActivity: 'SALIDA SUR',
                }
            ]
        };
    },
    methods: {
        submitTo() {
            if(!this.businessName){
                this.businessNameErrorMessage = 'La razón social no puede estar vacia';

                document.getElementById('businessName').focus();

                return;
            }

            if(!this.alias){
                this.aliasErrorMessage = 'El alias no puede estar vacio';

                document.getElementById('alias').focus();

                return;
            }

            if(!this.RFC){
                this.RFCErrorMessage = 'El RFC no puede estar vacio';

                document.getElementById('RFC').focus();

                return;
            }

            if(!this.businessActivity){
                this.businessActivityErrorMessage = 'El giro no puede estar vacio';

                document.getElementById('businessActivity').focus();

                return;
            }
        },
    },
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    watch: {
        businessName(value) {
            if (value.trim()) {
                this.businessNameErrorMessage = null;
            } else {
                this.businessName = '';
            }
        },
        alias(value) {
            if (value.trim()) {
                this.aliasErrorMessage = null;
            } else {
                this.alias = '';
            }
        },
        RFC(value) {
            if (value.trim()) {
                this.RFCErrorMessage = null;
            } else {
                this.RFC = '';
            }
        },
        businessActivity(value) {
            if (value.trim()) {
                this.businessActivityErrorMessage = null;
            } else {
                this.businessActivity = '';
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
