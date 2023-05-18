<template>
  <div>
    <template>
        <b-table striped hover :items="categorias" :fields="campos" responsive ref="table">
          <template v-slot:head(acoes)="data">
            <th class=" ">{{ data.label }}</th>
          </template>
          <template v-slot:cell(acoes)="data">
            <div class="coluna-acoes">
              <md-button class="acoes md-success md-dense md-just-icon" @click="visualizarCategoria(data.item.id)">
                <md-icon>
                  search
                </md-icon>
              </md-button>
              <md-button class="acoes md-primary md-dense md-just-icon" @click="editarCategoria(data.item.id)">
                <md-icon>
                  edit
                </md-icon>
              </md-button>
              <md-button class="acoes md-danger md-dense md-just-icon" @click="excluirCategoria(data.item.id)">
                <md-icon>
                  delete
                </md-icon>
              </md-button>
            </div>
          </template>
        </b-table>
    </template>
    <md-table-empty-state md-label="Nenhuma categoria encontrada"
      :md-description="`Nenhuma categoria encontrada. Tente outra busca ou adicione uma nova categoria.`"
      v-if="!categorias || categorias.length == 0">
      <md-button class="md-primary md-raised" @click="adicionarCategoria">Adicionar nova categoria</md-button>
    </md-table-empty-state>
  </div>
</template>

<script>

export default {
  name: 'Lista',
  data() {
    return {
      categorias: [],
      paginatedCategorias: [],
      loading: true,
      campos:
        [
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
            class: 'd-flex justify-content-center'
          }
        ],
    }
  },
  mounted() {
    this.$startLoading();
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
    },
    adicionarCategoria() {
      this.$router.push('categorias/adicionar')
    },
    visualizarCategoria(){
      this.$refs.table.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.acoes{
  border-radius: 0% !important;
  width: 25px !important;
  height: 30px !important;
}
.coluna-acoes {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
}
</style>