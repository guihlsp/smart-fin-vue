<template>
    <b-row class="vh-100 vw-100 row-login">
        <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
            <notifications></notifications>
            <div class="col-8">
                <h2 class="text-center mb-5">Faça o login</h2>
                <b-form @submit.prevent="valida" novalidate>
                    <b-form-group label-for="email">
                        <md-field :class="getValidationClass('email')">
                            <label class="d-flex justify-content-between">
                                E-mail
                            </label>
                            <md-input id="email" type="email" v-model="form.email" placeholder="Insira seu e-mail"
                                autocomplete="off" :disabled="sending">
                            </md-input>
                            <md-icon><a>email</a></md-icon>
                            <span class="md-error" v-if="!$v.form.email.required">E-mail obrigatório</span>
                        </md-field>
                    </b-form-group>

                    <b-form-group label-for="password">
                        <md-field :md-toggle-password="false" :class="getValidationClass('password')">
                            <label>
                                Senha
                            </label>
                            <md-input id="password" type="password" v-model="form.password" placeholder="Digite sua senha"
                                autocomplete="off" :disabled="sending">
                            </md-input>
                            <md-icon v-if="exibeSenha"><a @click="exibirSenha" style="cursor: pointer;">visibility</a></md-icon>
                            <md-icon v-else><a @click="exibirSenha" style="cursor: pointer;">visibility_off</a></md-icon>
                            <span class="md-error" v-if="!$v.form.password.required">Senha obrigatória</span>
                        </md-field>
                    </b-form-group>
                    <b-form-group>
                        <div class="d-flex justify-content-between">
                            <md-checkbox class="mt-0" v-model="keepLogin">Manter conectado</md-checkbox>
                            <small>
                                <a href="#">Esqueceu sua senha?</a>
                            </small>
                        </div>
                    </b-form-group>
                    <div class="row mt-3">
                        <md-button type="submit" class="md-success submit-button mb-3">
                            <md-icon>login</md-icon>Acessar conta
                        </md-button>
                        <hr>
                        <md-button type="button" variant="md-default outline-secondary" @click="cadastro()">
                            <md-icon>person_add</md-icon>Não tenho conta
                        </md-button>
                    </div>
                </b-form>
            </div>
        </b-col>
        <b-col sm="7" class="d-flex justify-content-center align-items-center">
            <img src="@/assets/img/login.svg" class="img-login" />
        </b-col>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
    </b-row>
</template>
  
<script>
import { validationMixin } from 'vuelidate'
import {
    required,
    email,
} from 'vuelidate/lib/validators'


export default {
    name: 'LoginComponent',
    mixins: [validationMixin],
    data() {
        return {
            form: {
                email: null,
                password: null,
            },
            keepLogin: false,
            error: null,
            sending: false,
            exibeSenha: false
        };
    },
    validations: {
        form: {
            password: {
                required
            },
            email: {
                required,
                email
            }
        }
    },
    computed(){
        this.exibirSenha();
    },
    methods: {
        valida() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.login()
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
        clearForm() {
            this.$v.$reset()
            this.form.email = null
            this.form.password = null
            this.sending = false
        },
        async login() {
            this.sending = true
            const response = await this.$api.post('/login', { email: this.form.email, password: this.form.password });
            window.setTimeout(() => {
                if (response.data.message) {
                    localStorage.setItem('token', 'Bearer ' + response.data.token);
                    this.$notify({
                        message: response.data.message,
                        icon: 'done',
                        type: 'success',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                    });
                    this.clearForm()
                    this.$router.push('/dashboard')
                } else {
                    this.$notify({
                        message: response.data.error,
                        icon: 'warning',
                        type: 'warning',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                    });
                }
                this.sending = false
            }, 1500)
        },
        cadastro() {
            this.$router.push('/cadastro');
        },
        exibirSenha(){
            var senha = document.getElementById("password");
            if (senha.type == "password") {
                senha.type = "text";
                this.exibeSenha = true
            } else {
                senha.type = "password";
                this.exibeSenha = false
            }
        }
    }
}
</script>
  
<style>
.row-login {
    margin-left: 0;
}

.left-login {
    background-color: #F2F2F2;
}

.img-login {
    width: 600px;
    height: 600px;
}
</style>

<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
</style>
  