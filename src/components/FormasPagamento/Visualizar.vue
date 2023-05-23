<template>
    <div class="md-layout">
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">Detalhes da conta bancária</h4>
            </md-card-header>
            <md-card-content>
                <div v-if="carregando" class="d-flex justify-content-center mt-5 mb-3">
                    <b-spinner style="width: 100px; height: 100px;" variant="success" label="Loading..."></b-spinner>
                </div>
                <b-table v-else stacked :items="objetoToArray(contaBancaria)" :fields="campos" responsive>
                    <template v-slot:cell(saldo)="data">
                        {{ data.item.saldo | formatarSaldo }}
                    </template>
                    <template v-slot:cell(ativa)="data">
                        {{ data.item.ativa | formatarSimNao }}
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
        formatarSaldo(valor) {
            return `R$ ${parseFloat(valor).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        },
        formatarSimNao(opcao){
            let opcaoFormatada = opcao == 1 ? 'Sim' : 'Não'
            return opcaoFormatada
        }
    },
    data() {
        return {
            contaBancaria: {
                id: '',
                saldo: '',
                descricao: '',
                ativa: null,
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
                    key: 'saldo',
                    label: 'Saldo atual',
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
            await this.$api.get(`/contas_bancarias/visualizar/${id}`)
                .then(response => {
                    this.contaBancaria = response.data.ContaBancaria;
                    setTimeout(() => {
                        this.carregando = false
                    }, 500)
                }).catch(error => {
                    console.error(error);
                });
        },
        objetoToArray(contaBancaria) {
            return [contaBancaria];
        },
    }
}
</script>
<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
</style>