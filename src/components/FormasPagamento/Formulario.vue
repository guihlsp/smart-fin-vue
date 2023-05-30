<template>
  <div class="md-layout">
    <notifications></notifications>
    <md-card>
      <md-card-header
        class="d-flex justify-content-between"
        data-background-color="green"
      >
        <h4 class="title h3">
          {{ $route.path.includes("editar") ? "Editar" : "Adicionar" }} forma de
          pagamento
        </h4>
      </md-card-header>
      <md-card-content>
        <b-form @submit.prevent="valida" novalidate>
          <div class="row">
            <b-form-group label-for="nome" class="col-4">
              <md-field :class="getValidationClass('nome')">
                <label>Nome</label>
                <md-input
                  id="nome"
                  type="text"
                  v-model="form.formaPagamento.nome"
                  autocomplete="off"
                  :disabled="carregando"
                >
                </md-input>
                <span
                  class="md-error"
                  v-if="!$v.form.formaPagamento.nome.required"
                  >Descrição obrigatória!</span
                >
              </md-field>
            </b-form-group>

            <b-form-group label-for="tipo" class="col-4">
              <md-field :class="getValidationClass('tipo')">
                <label>Tipo</label>
                <md-select
                  id="tipo"
                  v-model="form.formaPagamento.tipo"
                  autocomplete="off"
                  :disabled="carregando"
                >
                  <md-option value="DI">Dinheiro</md-option>
                  <md-option value="CA">Cartão</md-option>
                  <md-option value="PI">Pix</md-option>
                  <md-option value="TR">Transferência</md-option>
                </md-select>
                <span
                  class="md-error"
                  v-if="!$v.form.formaPagamento.tipo.required"
                  >Descrição obrigatória!</span
                >
              </md-field>
            </b-form-group>

            <b-form-group
              v-if="cartaoAtivo"
              label-for="tipo_cartao"
              class="col-4"
            >
              <md-field :class="getValidationClass('tipo')">
                <label>Tipo de cartão</label>
                <md-select
                  id="tipo_cartao"
                  v-model="form.formaPagamento.tipo_cartao"
                  autocomplete="off"
                  :disabled="carregando"
                >
                  <md-option value="CD">Crédito/Débito</md-option>
                  <md-option value="C">Crédito</md-option>
                  <md-option value="D">Débito</md-option>
                </md-select>
              </md-field>
            </b-form-group>

            <b-form-group
              label-for="conta_bancaria_id"
              class="col-4 md-layout-item"
            >
              <md-field>
                <label>Conta bancária</label>
                <md-select
                  md-align-trigger
                  id="conta_bancaria_id"
                  v-model="form.formaPagamento.conta_bancaria_id"
                  autocomplete="off"
                  :disabled="carregando"
                >
                  <md-option
                    v-for="contaBancaria in contasBancarias"
                    :key="contaBancaria.id"
                    :value="contaBancaria.id"
                  >
                    {{ contaBancaria.descricao }}
                  </md-option>
                </md-select>
              </md-field>
            </b-form-group>
          </div>
          <div class="row"></div>
          <div class="mt-3">
            <md-button type="submit" class="md-primary mb-3">
              {{ $route.path.includes("editar") ? "Salvar" : "Cadastrar" }}
            </md-button>
            <md-button style="margin-left: 15px" to="/formas_pagamento">
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
        formaPagamento: {
          nome: "",
          tipo: "",
          tipo_cartao: "",
          conta_bancaria_id: "",
        },
      },
      contasBancarias: [],
      error: null,
      carregando: false,
    };
  },
  validations: {
    form: {
      formaPagamento: {
        nome: {
          required,
        },
        tipo: {
          required,
        },
      },
    },
  },
  computed: {
    cartaoAtivo() {
      return this.form.formaPagamento.tipo === "CA";
    },
  },
  methods: {
    async carregaDados() {
      this.carregando = true;
      const id = this.$route.params.id;
      const action = this.$route.path.includes("editar")
        ? `editar/${id}`
        : "adicionar";
      await this.$api
        .get(`/formas_pagamento/${action}`)
        .then((response) => {
          this.form.formaPagamento =
            response.data.FormaPagamento ?? this.form.formaPagamento;
          this.contasBancarias = response.data.ContasBancarias ?? [];
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
          `/formas_pagamento/editar/${id}`,
          this.form.formaPagamento
        );
      } else {
        response = await this.$api.post(
          "/formas_pagamento/adicionar",
          this.form.formaPagamento
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
      this.$router.push("/formas_pagamento");
      this.carregando = false;
    },
    updateTipoCartaoVisibility() {
      if (!this.cartaoAtivo) {
        this.form.formaPagamento.tipo_cartao = "";
      }
    },
  },
  created() {
    this.carregaDados();
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
