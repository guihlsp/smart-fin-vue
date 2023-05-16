<template>
  <b-row class="vh-100 vw-100 row-cadastro">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-cadastro">
      <div class="col-8">
        <h2 class="text-center mb-5 title-cadastro">Faça o cadastro</h2>
        <b-form @submit.prevent="cadastro">
          <b-form-group label="Nome" label-for="name">
            <b-form-input id="name" type="text" v-model="usuario.name" placeholder="João da Silva" autocomplete="off" aria-autocomplete="none">
            </b-form-input>
          </b-form-group>
          <b-form-group label="E-mail" label-for="email" class="mt-2">
            <b-form-input id="email" type="email" v-model="usuario.email" placeholder="joaodasilva@gmail.com"
              autocomplete="off">
            </b-form-input>
          </b-form-group>

          <b-form-group label-for="password" class="mt-2">
            <label class="d-flex justify-content-between">
              Senha
            </label>
            <b-form-input id="password" type="password" v-model="usuario.password" placeholder="Digite sua senha" autocomplete="off" aria-autocomplete="none">
            </b-form-input>
            <md-checkbox v-model="usuario.termos">Aceitar termos e condições</md-checkbox>
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
  </b-row>
</template>

<script>

export default {
  name: 'Cadastro',
  data() {
    return {
      usuario: {
        name: '',
        email: '',
        password: '',
        termos: false,
        error: null,
        showAlert: false
      }
    };
  },
  methods: {
    async cadastro() {
      const response = await this.$api.post('/cadastro', this.usuario);
      if (response.status == 200) {
        localStorage.setItem('token', 'Bearer ' + response.data.token);
        this.$notify({
          message: 'Cadastro realizado com sucesso.',
          icon: 'fa fa-check',
          type: 'success'
        });
        this.$router.push('/dashboard');
      } else {
        this.$notify({
          message: 'Os dados informados não são válidos.',
          icon: 'fa-times',
          type: 'danger'
        });
      }
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
  font-weight: bold;
}

.img-cadastro {
  width: 600px;
  height: 600px;
}

.alert-position {
  z-index: 9999999;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
