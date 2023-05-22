<template>
  <div>
    <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
      <b-spinner style="width: 100px; height: 100px;" variant="success" label="Loading..."></b-spinner>
    </div>
    <b-table v-else striped hover :items="tags" :fields="campos" responsive ref="table">
      <template v-slot:head(acoes)="data">
        <th class="d-flex justify-content-end">{{ data.label }}</th>
      </template>
      <template v-slot:cell(acoes)="data">
        <div class="coluna-acoes">
          <md-button class="acoes md-info md-dense md-just-icon" :to="'tags/visualizar/' + data.item.id">
            <md-icon>
              search
            </md-icon>
          </md-button>
          <md-button class="acoes md-primary md-dense md-just-icon" :to="'tags/editar/' + data.item.id">
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
        <md-dialog-confirm :md-active.sync="modalAberto" md-title="Tags"
        md-content="Tem certeza que deseja excluir a tag ?" md-confirm-text="Confirmar" md-cancel-text="Cancelar"
        @md-cancel="onCancel" @md-confirm="onConfirm(data.item.id)"/>
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  name: 'Lista',
  data() {
    return {
      tags: [],
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
      this.$api.get('/tags/')
        .then(response => {
          this.tags = response.data.Tags;
        }).catch(error => {
          console.error(error);
        });
      setTimeout(() => {
        this.carregando = false
      }, 500);
    },
    adicionarCategoria() {
      this.$router.push('tags/adicionar')
    },
    excluirTag(id) {
      this.$api.delete('/tags/deletar/' + id).then(response => {
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
        this.excluirTag(this.idExclusao);
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