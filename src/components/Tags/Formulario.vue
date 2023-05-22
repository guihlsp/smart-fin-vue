<template>
    <div class="md-layout">
        <notifications></notifications>
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">{{ $route.path.includes('editar') ? 'Editar' : 'Adicionar' }} tag</h4>
            </md-card-header>
            <md-card-content>
                <b-form @submit.prevent="valida" novalidate class="row">
                    <b-form-group label-for="descricao" class="col-6">
                        <md-field :class="getValidationClass('descricao')">
                            <label>Descrição</label>
                            <md-input id="descricao" type="text" v-model="form.tag.descricao" autocomplete="off"
                                :disabled="carregando">
                            </md-input>
                            <verte id="color-picker" :enableAlpha="false" :showHistory="null" picker="square" model="hex">
                                <svg viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z"/>
                                </svg>
                            </verte>
                            <span class="md-error" v-if="!$v.form.tag.descricao.required">Descrição obrigatória!</span>
                        </md-field>
                    </b-form-group>

                    <b-form-group label-for="ativa" class="col-6 md-layout-item">
                        <md-field>
                            <label>Ativa</label>
                            <md-select id="ativa" v-model="form.tag.ativa" autocomplete="off" :disabled="carregando">
                                <md-option value=1>Sim</md-option>
                                <md-option value=0>Não</md-option>
                            </md-select>
                        </md-field>
                    </b-form-group>
                    <div class="mt-3">
                        <md-button type="submit" class="md-primary mb-3">
                            {{ $route.path.includes('editar') ? 'Salvar' : 'Cadastrar' }}
                        </md-button>
                        <md-button style="margin-left: 15px" to="/tags">
                            Cancelar
                        </md-button>
                    </div>
                </b-form>
            </md-card-content>
        </md-card>
        <md-progress-bar md-mode="indeterminate" v-if="carregando" />
    </div>
</template>
  
<script>

import Verte from 'verte'
import 'verte/dist/verte.css';
import { validationMixin } from 'vuelidate'
import {
    required,
} from 'vuelidate/lib/validators'


export default {
    components: {
        Verte
    },
    mixins: [validationMixin],
    data() {
        return {
            form: {
                tag: {
                    descricao: null,
                    ativa: 1,
                }
            },
            error: null,
            carregando: false,
        };
    },
    validations: {
        form: {
            tag: {
                descricao: {
                    required
                }
            }
        }
    },
    methods: {
        async carregaDados() {
            this.carregando = true
            const id = this.$route.params.id;
            await this.$api.get(`/tags/editar/${id}`)
                .then(response => {
                    this.form.tag = response.data.Tag;
                    setTimeout(() => {
                        this.carregando = false
                    }, 500)
                }).catch(error => {
                    console.error(error);
                });
        },
        valida() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.salvaDados()
            }
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        async salvaDados() {
            let colorPicker = document.getElementById("color-picker");
            let valorPicker = colorPicker.value;

            console.log(valorPicker);
            this.carregando = true
            let response;
            if (this.$route.path.includes('editar')) {
                let id = this.$route.params.id;
                response = await this.$api.put(`/tags/editar/${id}`, this.form.tag)
            } else {
                response = await this.$api.post('/tags/adicionar', this.form.tag)
            }
            if (response.data.message) {
                this.$notify({
                    message: response.data.message,
                    icon: 'done',
                    type: 'success',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                });
            } else {
                this.$notify({
                    message: response.data.error,
                    icon: 'warning',
                    type: 'warning',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                });
            }
            this.$router.push('/tags')
            this.carregando = false
        }
    },
    created() {
        if (this.$route.path.includes('editar')) {
            this.carregaDados();
        }
        
    },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
</style>