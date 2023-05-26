<template>
    <div class="md-layout">
        <notifications></notifications>
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">{{ $route.path.includes('editar') ? 'Editar' : 'Adicionar' }} movimentação</h4>
            </md-card-header>
            <md-card-content>
                <!-- <b-form @submit.prevent="valida" novalidate class="row"> -->
                <b-form class="row">
                    <FormasPagamento :formMovimentacao="form.movimentacao" :formasPagamento="formasPagamento"></FormasPagamento>

                    <div class="mt-3">
                        <md-button type="submit" class="md-primary mb-3">
                            {{ $route.path.includes('editar') ? 'Salvar' : 'Cadastrar' }}
                        </md-button>
                        <md-button style="margin-left: 15px" to="/movimentacoes">
                            Cancelar
                        </md-button>
                    </div> 
                </b-form>
            </md-card-content>
        </md-card>
        <md-progress-bar md-mode="indeterminate" v-if="carregando" />
    </div>
</template>
  
<script>

import FormasPagamento from './FormasPagamento.vue';
export default {
    components: {
        FormasPagamento,
    },
    data() {
        return {
            form: {
                movimentacao: {
                    tipo: '',
                    codigo: '',
                    categoria_id: '',
                    conta_bancaria_id: '',
                    forma_pagamento_id: '',
                    tag_id: '',
                    descricao: '',
                    valor: '',
                    juros: '',
                    
                }
            },
            categorias: [],
            tags: [],
            formasPagamento: [],
            contasBancarias: [],
            error: null,
            carregando: false,
        };
    },
    methods: {
        async carregaDados() {
            this.carregando = true
            const id = this.$route.params.id;
            const action = this.$route.path.includes('editar') ? `editar/${id}` : 'adicionar';
            await this.$api.get(`/movimentacoes/${action}`)
                .then(response => {
                    this.form.movimentacao = response.data.Movimentacao ?? this.form.Movimentacao;
                    this.contasBancarias = response.data.ContasBancarias ?? [];
                    this.formasPagamento = response.data.FormasPagamento ?? [];
                    this.categorias = response.data.Categorias ?? [];
                    this.tags = response.data.Tags ?? [];
                    setTimeout(() => {
                        this.carregando = false
                    }, 500)
                }).catch(error => {
                    console.error(error);
                });
        },
        async salvaDados() {
            this.carregando = true
            let response;
            if (this.$route.path.includes('editar')) {
                let id = this.$route.params.id;
                response = await this.$api.put(`/movimentacoes/editar/${id}`, this.form.movimentacao)
            } else {
                response = await this.$api.post('/movimentacoes/adicionar', this.form.movimentacao)
            }
            if (response.data.message) {
                this.$notify({
                    message: response.data.message,
                    icon: 'done',
                    type: 'success',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                });
            } else {
                this.$notify({
                    message: response.data.error,
                    icon: 'warning',
                    type: 'warning',
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                });
            }
            this.$router.push('/movimentacoes')
            this.carregando = false
        }
    },
    created() {
        this.carregaDados();
    },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
</style>