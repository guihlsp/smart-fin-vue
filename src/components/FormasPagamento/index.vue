<template>
  <div>
    <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
      <b-spinner style="width: 100px; height: 100px;" variant="success" label="Loading..."></b-spinner>
    </div>
    <b-table v-else striped hover :items="formasPagamento" :fields="campos" responsive ref="table">
      <template v-slot:head(acoes)="data">
        <th class="d-flex justify-content-end">{{ data.label }}</th>
      </template>
      <template v-slot:cell(acoes)="data">
        <div class="coluna-acoes">
          <md-button class="acoes md-info md-dense md-just-icon" :to="'formas_pagamento/visualizar/' + data.item.id">
            <md-icon>
              search
            </md-icon>
          </md-button>
          <md-button class="acoes md-primary md-dense md-just-icon" :to="'formas_pagamento/editar/' + data.item.id">
            <md-icon>
              edit
            </md-icon>
          </md-button>
          <md-button class="acoes md-danger md-dense md-just-icon" @click="abrirModal(data.item.id)">
            <md-icon>
              delete
            </md-icon>
          </md-button>
        </div>
        <md-dialog-confirm :md-active.sync="modalAberto" md-title="Formas de pagamento"
          md-content="Tem certeza que deseja excluir a forma de pagamento ?" md-confirm-text="Confirmar"
          md-cancel-text="Cancelar" @md-cancel="onCancel" @md-confirm="onConfirm(data.item.id)" />
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  name: 'Lista',
  data() {
    return {
      formasPagamento: [],
      carregando: false,
      campos: [
        {
          key: 'id',
          label: '#',
          sortable: false
        },
        {
          key: 'nome',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'tipo',
          label: 'Tipo',
          sortable: true
        },
        {
          key: 'nome_conta_bancaria',
          label: 'Conta bancária',
          sortable: true
        },
        {
          key: 'criado_em',
          label: 'Criado em',
          sortable: false,
          class: 'text-center'
        },
        {
          key: 'acoes',
          label: 'Ações',
          sortable: false,
        }
      ],
      modalAberto: false,
      idExclusao: null,
    }
  },
  mounted() {
    this.carregando = true
    this.carregaDados();
  },
  methods: {
    carregaDados() {
      this.$api.get('/formas_pagamento/')
        .then(response => {
          this.formasPagamento = response.data.FormasPagamento;
        }).catch(error => {
          console.error(error);
        });
      setTimeout(() => {
        this.carregando = false
      }, 500);
    },
    adicionarFormaPagamento() {
      this.$router.push('formas_pagamento/adicionar')
    },
    excluirFormaPagamento(id) {
      this.$api.delete('/formas_pagamento/deletar/' + id).then(response => {
        this.$notify({
          message: response.data.message,
          icon: 'done',
          type: 'success',
          horizontalAlign: 'center',
          verticalAlign: 'top',
        });
      }).catch(error => {
        this.$notify({
          message: error,
          icon: 'warning',
          type: 'warning',
          horizontalAlign: 'center',
          verticalAlign: 'top',
        });
        console.error(error);
      })
      this.carregaDados();
    },
    abrirModal(id) {
      this.idExclusao = id;
      this.modalAberto = true;
    },
    onConfirm() {
      if (this.idExclusao !== null) {
        this.excluirFormaPagamento(this.idExclusao);
      }
      this.idExclusao = null;
    },
    onCancel() {
      this.modalAberto = false
      this.idExclusao = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.acoes {
  border-radius: 10% !important;
  width: 25px !important;
  height: 35px !important;
}

.coluna-acoes {
  display: flex;
  justify-content: flex-end;
  align-items: start;
  gap: 3px;
}
</style>