<template>
    <div class="md-layout">
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">Detalhes da categoria</h4>
            </md-card-header>
            <md-card-content>
                <b-table stacked :items="objetoToArray(categoria)" responsive>
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
            categoria: {
                id: '',
                descricao: '',
                ativa: null,
                criado_em: ''
            },
            campos: [
                {
                    key: 'id',
                    label: '#',
                    sortable: false,
                },
                {
                    key: 'descricao',
                    label: 'Descrição',
                    sortable: false,
                },
                {
                    key: 'ativa',
                    label: 'Ativa',
                    sortable: false,
                },
                {
                    key: 'criado_em',
                    label: 'Criado em',
                    sortable: false,
                }
            ],
            carregando: false
        }
    },
    created() {
        this.carregaDados();
    },
    methods: {
        async carregaDados() {
            this.carregando = true
            const id = this.$route.params.id;
            await this.$api.get(`/categorias/visualizar/${id}`)
                .then(response => {
                    this.categoria = response.data.Categoria;
                    setTimeout(() => {
                        this.carregando = false
                    }, 500)
                }).catch(error => {
                    console.error(error);
                });
        },
        objetoToArray(categoria) {
            return [categoria];
        },
    }
}
</script>