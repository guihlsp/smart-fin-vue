<template>
  <div class="md-layout">
    <md-card>
      <md-card-header
        class="d-flex justify-content-between"
        data-background-color="green"
      >
        <h4 class="title h3">Detalhes da forma de pagamento</h4>
      </md-card-header>
      <md-card-content>
        <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
          <b-spinner
            style="width: 100px; height: 100px"
            variant="success"
            label="Loading..."
          ></b-spinner>
        </div>
        <b-table
          v-else
          stacked
          :items="objetoToArray(formaPagamento)"
          :fields="campos"
          responsive
        >
        </b-table>
      </md-card-content>
    </md-card>
    <md-progress-bar md-mode="indeterminate" v-if="carregando" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formaPagamento: {},
      campos: [
        {
          key: "id",
          label: "ID",
          sortable: false,
        },
        {
          key: "nome",
          label: "Nome",
          sortable: false,
        },
        {
          key: "tipo",
          label: "Tipo",
          sortable: false,
        },
        {
          key: "tipo_cartao",
          label: "Tipo de cartão",
          sortable: false,
          class: "d-none",
        },
        {
          key: "nome_conta_bancaria",
          label: "Conta bancária",
          sortable: false,
        },
        {
          key: "criado_em",
          label: "Criado em",
          sortable: false,
        },
        {
          key: "atualizado_em",
          label: "Atualizado em",
          sortable: false,
        },
      ],
      carregando: false,
    };
  },
  created() {
    this.carregaDados();
  },
  methods: {
    async carregaDados() {
      this.carregando = true;
      const id = this.$route.params.id;
      await this.$api
        .get(`/formas_pagamento/visualizar/${id}`)
        .then((response) => {
          this.formaPagamento = response.data.FormaPagamento;
          this.formaPagamento.tipo_cartao
            ? (this.campos[3].class = "")
            : "d-none";
          setTimeout(() => {
            this.carregando = false;
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    objetoToArray(formaPagamento) {
      return [formaPagamento];
    },
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
