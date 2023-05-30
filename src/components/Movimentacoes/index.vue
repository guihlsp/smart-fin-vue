<template>
  <div>
    <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
      <b-spinner
        style="width: 100px; height: 100px"
        variant="success"
        label="Loading..."
      ></b-spinner>
    </div>
    <b-table
      v-if="!carregando && movimentacoes"
      striped
      hover
      :items="movimentacoes"
      :fields="campos"
      responsive
      ref="table"
    >
      <template v-slot:head(acoes)="data">
        <th class="d-flex justify-content-end">{{ data.label }}</th>
      </template>
      <template v-slot:cell(acoes)="data">
        <div class="coluna-acoes">
          <md-button
            class="acoes md-info md-dense md-just-icon"
            :to="'movimentacoes/visualizar/' + data.item.id"
          >
            <md-icon> search </md-icon>
          </md-button>
          <md-button
            class="acoes md-primary md-dense md-just-icon"
            :to="'movimentacoes/editar/' + data.item.id"
          >
            <md-icon> edit </md-icon>
          </md-button>
          <md-button
            class="acoes md-danger md-dense md-just-icon"
            @click="abrirModal(data.item.id)"
          >
            <md-icon> delete </md-icon>
          </md-button>
        </div>
        <md-dialog-confirm
          :md-active.sync="modalAberto"
          md-title="Movimentações"
          md-content="Tem certeza que deseja excluir a tag ?"
          md-confirm-text="Confirmar"
          md-cancel-text="Cancelar"
          @md-cancel="onCancel"
          @md-confirm="onConfirm(data.item.id)"
        />
      </template>
    </b-table>
    <div>
      <md-empty-state
        v-if="!carregando && !movimentacoes"
        md-icon="currency_exchange"
        md-label="Adicione sua primeira movimentação"
        md-description="Cadastrando as movimentações você poderá ter o controle total e com facilidade do seu fluxo de caixa."
      >
        <md-button to="movimentacoes/adicionar" class="md-primary md-raised"
          >Adicionar movimentação</md-button
        >
      </md-empty-state>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lista",
  data() {
    return {
      movimentacoes: [],
      carregando: false,
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
          key: "acoes",
          label: "Ações",
          sortable: false,
        },
      ],
      modalAberto: false,
      idExclusao: null,
    };
  },
  mounted() {
    this.carregando = true;
    this.carregaDados();
  },
  methods: {
    carregaDados() {
      this.$api
        .get("/movimentacoes")
        .then((response) => {
          this.movimentacoes = response.data.Movimentacoes;
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        this.carregando = false;
      }, 500);
    },
    adicionarCategoria() {
      this.$router.push("movimentacoes/adicionar");
    },
    excluirMovimentacao(id) {
      this.$api
        .delete("/movimentacoes/deletar/" + id)
        .then((response) => {
          this.$notify({
            message: response.data.message,
            icon: "done",
            type: "success",
            horizontalAlign: "center",
            verticalAlign: "top",
          });
        })
        .catch((error) => {
          this.$notify({
            message: error,
            icon: "warning",
            type: "warning",
            horizontalAlign: "center",
            verticalAlign: "top",
          });
          console.error(error);
        });
      this.carregaDados();
    },
    abrirModal(id) {
      this.idExclusao = id;
      this.modalAberto = true;
    },
    onConfirm() {
      if (this.idExclusao !== null) {
        this.excluirMovimentacao(this.idExclusao);
      }
      this.idExclusao = null;
    },
    onCancel() {
      this.modalAberto = false;
      this.idExclusao = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.acoes {
  border-radius: 10% !important;
  min-width: 20px !important;
  width: 20px !important;
  height: 20px !important;
}

.coluna-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 3px;
}
</style>
