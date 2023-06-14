<template>
  <div class="md-layout">
    <md-card>
      <md-card-header class="d-flex justify-content-between" data-background-color="green">
        <h4 class="title h3">Detalhes da movimentação</h4>
      </md-card-header>
      <md-card-content>
        <b-table stacked :items="objetoToArray(movimentacao)" :fields="campos" responsive>
          <template v-slot:cell(ativa)="data">
            <b-badge v-if="data.item.ativa == 1" class="bg-success">{{
              data.item.ativa | formatarSimNao
            }}</b-badge>
            <b-badge v-else class="bg-danger">{{
              data.item.ativa | formatarSimNao
            }}</b-badge>
          </template>
        </b-table>
      </md-card-content>
    </md-card>
    <md-progress-bar md-mode="indeterminate" v-if="carregando" />
  </div>
</template>

<script>
export default {
  filters: {
    formatarSimNao(opcao) {
      let opcaoFormatada = opcao == 1 ? "Sim" : "Não";
      return opcaoFormatada;
    },
  },
  data() {
    return {
      movimentacao: {},
      campos: [
        {
          key: "codigo",
          label: "Cód.",
          sortable: true,
        },
        {
          key: "descricao",
          label: "Descrição",
          sortable: true,
        },
        {
          key: "tipo",
          label: "Tipo",
          sortable: true,
        },
        {
          key: "valor",
          label: "Valor",
          sortable: true,
        },
        {
          key: "desconto",
          label: "Desconto",
          sortable: true,
        },
        {
          key: "juros",
          label: "Juros",
          sortable: true,
        },
        {
          key: "valor_total",
          label: "Valor total",
          sortable: true,
        },
        {
          key: "situacao",
          label: "Situação",
          sortable: true,
        },
        {
          key: "criado_em",
          label: "Criado em",
          sortable: false,
          class: "text-center",
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
        .get(`/movimentacoes/visualizar/${id}`)
        .then((response) => {
          this.movimentacao = response.data.Movimentacao;
          setTimeout(() => {
            this.carregando = false;
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    objetoToArray(movimentacao) {
      return [movimentacao];
    },
  },
};
</script>
