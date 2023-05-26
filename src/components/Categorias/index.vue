<template>
  <div>
    <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
      <b-spinner style="width: 100px; height: 100px;" variant="success" label="Loading..."></b-spinner>
    </div>
    <b-table v-if="!carregando && categorias" striped hover :items="categorias" :fields="campos" responsive ref="table">
      <template v-slot:cell(ativa)="data">
          <b-badge v-if="data.item.ativa == 'Sim'" class="bg-success">{{ data.item.ativa }}</b-badge>
          <b-badge v-else class="bg-danger">{{ data.item.ativa }}</b-badge>
      </template>
      <template v-slot:head(acoes)="data">
        <th class="d-flex justify-content-end">{{ data.label }}</th>
      </template>
      <template v-slot:cell(acoes)="data">
        <div class="coluna-acoes">
          <md-button class="acoes md-info md-dense md-just-icon" :to="'categorias/visualizar/' + data.item.id">
            <md-icon>
              search
            </md-icon>
          </md-button>
          <md-button class="acoes md-primary md-dense md-just-icon" :to="'categorias/editar/' + data.item.id">
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
        <md-dialog-confirm :md-active.sync="modalAberto" md-title="Categorias"
        md-content="Tem certeza que deseja excluir a categoria ?" md-confirm-text="Confirmar" md-cancel-text="Cancelar"
        @md-cancel="onCancel" @md-confirm="onConfirm(data.item.id)"/>
      </template>
    </b-table>
    <div>
      <md-empty-state v-if="!carregando && !categorias"
        md-icon="category"
        md-label="Adicione sua primeira categoria"
        md-description="Cadastrando categorias você poderá organizar seus recebimentos e pagamentos com facilidade.">
        <md-button to="categorias/adicionar" class="md-primary md-raised">Adicionar categoria</md-button>
      </md-empty-state>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lista',
  data() {
    return {
      categorias: [],
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
      this.$api.get('/categorias/')
        .then(response => {
          this.categorias = response.data.Categorias;
        }).catch(error => {
          console.error(error);
        });
      setTimeout(() => {
        this.carregando = false
      }, 500);
    },
    adicionarCategoria() {
      this.$router.push('categorias/adicionar')
    },
    excluirCategoria(id) {
      this.$api.delete('/categorias/deletar/' + id).then(response => {
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
        this.excluirCategoria(this.idExclusao);
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