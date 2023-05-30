<template>
  <div class="md-layout">
    <notifications></notifications>
    <md-card>
      <md-card-header
        class="d-flex justify-content-between"
        data-background-color="green"
      >
        <h4 class="title h3">
          {{ $route.path.includes("editar") ? "Editar" : "Adicionar" }} conta
          bancária
        </h4>
      </md-card-header>
      <md-card-content>
        <b-form @submit.prevent="valida" novalidate class="row">
          <b-form-group label-for="descricao" class="col-6">
            <md-field :class="getValidationClass('descricao')">
              <label>Descrição</label>
              <md-input
                id="descricao"
                type="text"
                v-model="form.contaBancaria.descricao"
                autocomplete="off"
                :disabled="carregando"
              >
              </md-input>
              <span
                class="md-error"
                v-if="!$v.form.contaBancaria.descricao.required"
                >Descrição obrigatória!</span
              >
            </md-field>
          </b-form-group>

          <b-form-group label-for="ativa" class="col-6 md-layout-item">
            <md-field>
              <label>Ativa</label>
              <md-select
                id="ativa"
                v-model="form.contaBancaria.ativa"
                autocomplete="off"
                :disabled="carregando"
              >
                <md-option value="1">Sim</md-option>
                <md-option value="0">Não</md-option>
              </md-select>
            </md-field>
          </b-form-group>
          <div class="mt-3">
            <md-button type="submit" class="md-primary mb-3">
              {{ $route.path.includes("editar") ? "Salvar" : "Cadastrar" }}
            </md-button>
            <md-button style="margin-left: 15px" to="/contas_bancarias">
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        contaBancaria: {
          descricao: null,
          ativa: 1,
        },
      },
      error: null,
      carregando: false,
    };
  },
  validations: {
    form: {
      contaBancaria: {
        descricao: {
          required,
        },
      },
    },
  },
  methods: {
    async carregaDados() {
      this.carregando = true;
      const id = this.$route.params.id;
      await this.$api
        .get(`/contas_bancarias/editar/${id}`)
        .then((response) => {
          this.form.contaBancaria = response.data.ContaBancaria;
          setTimeout(() => {
            this.carregando = false;
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    valida() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.salvaDados();
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    async salvaDados() {
      this.carregando = true;
      let response;
      if (this.$route.path.includes("editar")) {
        let id = this.$route.params.id;
        response = await this.$api.put(
          `/contas_bancarias/editar/${id}`,
          this.form.contaBancaria
        );
      } else {
        response = await this.$api.post(
          "/contas_bancarias/adicionar",
          this.form.contaBancaria
        );
      }
      if (response.data.message) {
        this.$notify({
          message: response.data.message,
          icon: "done",
          type: "success",
          horizontalAlign: "center",
          verticalAlign: "top",
        });
      } else {
        this.$notify({
          message: response.data.error,
          icon: "warning",
          type: "warning",
          horizontalAlign: "center",
          verticalAlign: "top",
        });
      }
      this.$router.push("/contas_bancarias");
      this.carregando = false;
    },
  },
  created() {
    if (this.$route.path.includes("editar")) {
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
