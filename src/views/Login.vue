<template>
    <b-row class="vh-100 vw-100 row-login">
        <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
            <div class="col-8">
                <h2 class="text-center mb-5 title-login">Faça o login</h2>
                <b-form @submit.prevent="login">
                    <b-form-group label="E-mail" label-for="email">
                        <b-form-input
                            id="email" 
                            type="email" 
                            v-model="email"
                            placeholder="exemplo@email.com" 
                            autocomplete="off">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label-for="password">
                        <label class="d-flex justify-content-between">
                            Senha
                            <small>
                                <a href="#">Esqueceu sua senha?</a>
                            </small>
                        </label>
                        <b-form-input 
                            id="password" 
                            type="password" 
                            v-model="password"
                            placeholder="Digite sua senha"
                            >
                        </b-form-input>
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
    </b-row>
</template>
  
<script>

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            password: '',
            error: null,
            showAlert: false
        };
    },
    methods: {
        async login() {
            const response = await this.$api.post('/login', { email: this.email, password: this.password });
            if (response.status == 200) {
                localStorage.setItem('token', 'Bearer ' + response.data.token);
                this.$notify({
                    message: response.message,
                    icon: 'fa fa-check',
                    type: 'success'
                });
            } else {
                this.$notify({
                    message: response.message,
                    icon: 'fa-times',
                    type: 'danger'
                });
            }
        },
        cadastro() {
            this.$router.push('/cadastro');
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

.title-login {
    font-weight: bold;
}

.img-login {
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
  