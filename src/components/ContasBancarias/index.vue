<template>
  <div>
    <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
      <b-spinner style="width: 100px; height: 100px;" variant="success" label="Loading..."></b-spinner>
    </div>
    <b-table v-else striped hover :items="contasBancarias" :fields="campos" responsive ref="table">
      <template v-slot:cell(saldo)="data">
        <span v-if="data.item.saldo >= 0" class="text-success">{{ data.item.saldo | formatarSaldo}}</span>
        <span v-else class="text-danger">{{ data.item.saldo | formatarSaldo}}</span>
      </template>
      <template v-slot:cell(ativa)="data">
        <b-badge v-if="data.item.ativa == 'Sim'" class="bg-success">{{ data.item.ativa }}</b-badge>
        <b-badge v-else class="bg-danger">{{ data.item.ativa }}</b-badge>
      </template>
      <template v-slot:head(acoes)="data">
        <th class="d-flex justify-content-end">{{ data.label }}</th>
      </template>
      <template v-slot:cell(acoes)="data">
        <div class="coluna-acoes">
          <md-button class="acoes md-info md-dense md-just-icon" :to="'contas_bancarias/visualizar/' + data.item.id">
            <md-icon>
              search
            </md-icon>
          </md-button>
          <md-button class="acoes md-primary md-dense md-just-icon" :to="'contas_bancarias/editar/' + data.item.id">
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
        <md-dialog-confirm :md-active.sync="modalAberto" md-title="Contas bancárias"
          md-content="Tem certeza que deseja excluir a conta bancária ?" md-confirm-text="Confirmar"
          md-cancel-text="Cancelar" @md-cancel="onCancel" @md-confirm="onConfirm(data.item.id)" />
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  filters: {
    formatarSaldo(valor) {
      return `R$ ${parseFloat(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
  },
  name: 'Lista',
  data() {
    return {
      contasBancarias: [],
      paginatedContasBancarias: [],
      carregando: false,
      campos: [
        {
          key: 'id',
          label: '#',
          sortable: false
        },
        {
          key: 'descricao',
          label: 'Descrição',
          sortable: true
        },
        {
          key: 'saldo',
          label: 'Saldo',
          sortable: true
        },
        {
          key: 'ativa',
          label: 'Ativa',
          sortable: true,
          class: 'text-center'
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
      this.$api.get('/contas_bancarias/')
        .then(response => {
          this.contasBancarias = response.data.ContasBancarias;
        }).catch(error => {
          console.error(error);
        });
      setTimeout(() => {
        this.carregando = false
      }, 500);
    },
    adicionarCategoria() {
      this.$router.push('contas_bancarias/adicionar')
    },
    excluirContaBancaria(id) {
      this.$api.delete('/contas_bancarias/deletar/' + id).then(response => {
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
        this.excluirContaBancaria(this.idExclusao);
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
  min-width: 20px !important;
  width: 20px !important;
  height: 20px !important;
}

.coluna-acoes {
  display: flex;
  justify-content: flex-end;
  align-items: start;
  gap: 3px;
}
</style>