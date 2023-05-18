<template>
  <b-row class="vh-100 vw-100 row-cadastro">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-cadastro">
      <notifications></notifications>
      <div class="col-8">
        <h2 class="text-center mb-5 title-cadastro">Faça o cadastro</h2>
        <b-form @submit.prevent="valida" novalidate>
          <b-form-group label-for="name">
            <md-field :class="getValidationClass('name')">
              <label class="d-flex justify-content-between">
                Nome completo
              </label>
              <md-input id="name" type="name" v-model="form.name" placeholder="Insira seu nome completo"
                autocomplete="off" :disabled="sending">
              </md-input>
              <md-icon><a>person</a></md-icon>
              <span class="md-error" v-if="!$v.form.name.required || !$v.form.name.minlength">Nome completo
                obrigatório</span>
            </md-field>
          </b-form-group>
          <b-form-group label-for="email">
            <md-field :class="getValidationClass('email')">
              <label class="d-flex justify-content-between">
                E-mail
              </label>
              <md-input id="email" type="email" v-model="form.email" placeholder="Insira seu e-mail" autocomplete="off"
                :disabled="sending">
              </md-input>
              <md-icon><a>email</a></md-icon>
              <span class="md-error" v-if="!$v.form.email.required">E-mail obrigatório</span>
            </md-field>
          </b-form-group>
          <b-form-group label-for="password">
            <md-field :md-toggle-password="false" :class="getValidationClass('password')">
              <label class="d-flex justify-content-between">
                Senha
              </label>
              <md-input id="password" type="password" :md-toggle-password='false' v-model="form.password" placeholder="Digite sua senha"
                autocomplete="off" :disabled="sending" >
              </md-input>
              <md-icon><a>lock</a></md-icon>
            </md-field>
            <span class="md-error" v-if="!$v.form.password.required">Senha obrigatória</span>
            <br>
            <i> Ao se cadastrar, você concorda com os <a style="cursor: pointer;" @click="showDialog = true">termos e condições</a></i>
          </b-form-group>
          <div class="row mt-3">
            <md-button type="submit" class="md-success submit-button mb-3">
              <md-icon>how_to_reg</md-icon>Criar nova conta
            </md-button>
            <hr>
            <md-button type="button" class="md-default" @click="login()">
              <md-icon>login</md-icon>Já possuo conta
            </md-button>
          </div>
        </b-form>
      </div>
    </b-col>
    <b-col sm="7" class="d-flex justify-content-center align-items-center">
      <img src="@/assets/img/login.svg" class="img-cadastro" />
    </b-col>
    <md-dialog :md-fullscreen='false' :md-confirm-text="'Ok'" :md-active.sync="showDialog">
      <md-dialog-title>Termos de Uso - SmartFin</md-dialog-title>
      <md-dialog-content>
        <Termos/>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="showDialog = false">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </b-row>
</template>

<script>
import Termos from '@/components/Termos.vue'
import {validationMixin} from 'vuelidate'
import {required, email, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'Cadastro',
  mixins: [validationMixin],
  components: {
    Termos
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      showDialog: false,
      error: null,
      sending: false,
      disabled: true,
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required
      },
    }
  },
  methods: {
    valida() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.cadastro()
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
      this.form.name = null
      this.form.email = null
      this.form.password = null
      this.sending = false
    },
    async cadastro() {
      const response = await this.$api.post('/cadastrar', this.form)
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
          // this.$router.push('/dashboard')
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
    login() {
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.row-cadastro {
  margin-left: 0;
}

.left-cadastro {
  background-color: #F2F2F2;
}

.title-cadastro {
  font-weight: b;
}

.img-cadastro {
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