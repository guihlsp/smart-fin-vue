<template>
    <div class="md-layout">
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">Detalhes da tag</h4>
            </md-card-header>
            <md-card-content>
                <b-table stacked :items="objetoToArray(tag)" :fields="campos" responsive>
                    <template v-slot:cell(ativa)="data">
                        <b-badge v-if="data.item.ativa == 1" class="bg-success">{{ data.item.ativa | formatarSimNao}}</b-badge>
                        <b-badge v-else class="bg-danger">{{ data.item.ativa | formatarSimNao}}</b-badge>
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
        formatarSimNao(opcao){
            let opcaoFormatada = opcao == 1 ? 'Sim' : 'Não'
            return opcaoFormatada
        }
    },
    data() {
        return {
            tag: {
                id: '',
                descricao: '',
                ativa: '',
                criado_em: ''
            },
            campos: [
                {
                    key: 'id',
                    label: 'ID',
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
                },
                {
                    key: 'atualizado_em',
                    label: 'Atualizado em',
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
            await this.$api.get(`/tags/visualizar/${id}`)
                .then(response => {
                    this.tag = response.data.Tag;
                    setTimeout(() => {
                        this.carregando = false
                    }, 500)
                }).catch(error => {
                    console.error(error);
                });
        },
        objetoToArray(tag) {
            return [tag];
        },
    }
}
</script>