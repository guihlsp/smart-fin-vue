<template>
    <div class="md-layout">
        <notifications></notifications>
        <md-card>
            <md-card-header class="d-flex justify-content-between" data-background-color="green">
                <h4 class="title h3">
                    {{ $route.path.includes("editar") ? "Editar" : "Adicionar" }}
                    movimentação
                </h4>
            </md-card-header>
            <md-card-content>
                <!-- <b-form @submit.prevent="valida" novalidate class="row"> -->
                <b-form @submit.prevent="salvaDados">
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Informações básicas
                        </md-card-header>
                        <md-card-content>
                            <InformacoesBasicas :formMovimentacao="form.movimentacao" :categorias="categorias"
                                @atualizaDados="atualizaFormulario" />
                        </md-card-content>
                    </md-card>
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Detalhes bancários
                        </md-card-header>
                        <md-card-content class="row">
                            <FormasPagamento class="col-md-6 col-sm-12" :formMovimentacao="form.movimentacao"
                                :formasPagamento="formasPagamento" @atualizaDados="atualizaFormulario" />
                            <ContasBancarias class="col-md-6 col-sm-12" :formMovimentacao="form.movimentacao"
                                :contasBancarias="contasBancarias" @atualizaDados="atualizaFormulario" />
                        </md-card-content>
                    </md-card>
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <md-card>
                                <md-card-header data-background-color="purple">
                                    Valores
                                </md-card-header>
                                <md-card-content>
                                    <div class="row">
                                        <Valor :formMovimentacao="form.movimentacao" @atualizaDados="atualizaFormulario" />
                                        <Desconto :formMovimentacao="form.movimentacao"
                                            @atualizaDados="atualizaFormulario" />
                                        <Juros :formMovimentacao="form.movimentacao" @atualizaDados="atualizaFormulario" />
                                    </div>
                                </md-card-content>
                            </md-card>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <md-card class="tag" style="min-height:74%;">
                                <md-card-header data-background-color="purple">
                                    Tags
                                </md-card-header>
                                <md-card-content class="mt-5">
                                    <Tags :formMovimentacao="form.movimentacao" :tags="tags"
                                        @atualizaDados="atualizaFormulario" />
                                </md-card-content>
                            </md-card>
                        </div>
                    </div>
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Outras informações
                        </md-card-header>
                        <md-card-content>
                            <OutrasInformacoes :formMovimentacao="form.movimentacao" @atualizaDados="atualizaFormulario" />
                        </md-card-content>
                    </md-card>
                    <div class="d-flex justify-content-end">
                        <md-card-header :data-background-color='form.movimentacao.tipo == "2" ? "green" : "red"'
                            class="col-sm-12 col-md-3 mt-2 d-flex justify-content-between">
                            <span style="font-size: 16px;">Valor total:</span>
                            <span class="total">R$ {{ form.movimentacao.valor_total | formataMoeda }}</span>
                        </md-card-header>
                    </div>
                    <div class="mt-3">
                        <md-button type="submit" class="md-primary mb-3">
                            {{ $route.path.includes("editar") ? "Salvar" : "Cadastrar" }}
                        </md-button>
                        <md-button class="ml-4" to="/movimentacoes">
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
import Valor from './Valor';
import Desconto from './Desconto';
import Juros from './Juros';
import Tags from "./Tags";
import InformacoesBasicas from "./InformacoesBasicas";
import ContasBancarias from "./ContasBancarias";
import FormasPagamento from "./FormasPagamento";
import OutrasInformacoes from "./OutrasInformacoes";
import { formataMoeda } from '../../../functions/numero';

export default {
    components: {
        FormasPagamento,
        ContasBancarias,
        InformacoesBasicas,
        OutrasInformacoes,
        Tags,
        Valor,
        Desconto,
        Juros
    },
    data() {
        return {
            form: {
                movimentacao: {
                    codigo: '',
                    tipo: '1',
                    data_vencimento: '',
                    situacao: '1',
                    data_baixa: '',
                    categoria_id: '',
                    descricao: '',
                    forma_pagamento_id: '',
                    conta_bancaria_id: '',
                    valor: null,
                    juros: null,
                    desconto: null,
                    taxa: null,
                    tags: [],
                    observacoes: '',
                    valor_total: 0,
                    possui_parcela: 0,
                    baixado: 0,
                    visibilidade: 1,
                },
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
            this.carregando = true;
            const id = this.$route.params.id;
            const action = this.$route.path.includes("editar")
                ? `editar/${id}`
                : "adicionar";
            await this.$api
                .get(`/movimentacoes/${action}`)
                .then((response) => {
                    this.form.movimentacao = response.data.Movimentacao ?? this.form.movimentacao;
                    this.form.movimentacao.codigo = (action == 'adicionar' ? response.data.Codigo : this.form.movimentacao.codigo)
                    this.contasBancarias = response.data.ContasBancarias ?? [];
                    this.formasPagamento = response.data.FormasPagamento ?? [];
                    this.categorias = response.data.Categorias ?? [];
                    this.tags = response.data.Tags ?? [];
                    setTimeout(() => {
                        this.carregando = false;
                    }, 500);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async salvaDados() {
            this.carregando = true;
            let response;
            if (this.$route.path.includes("editar")) {
                let id = this.$route.params.id;
                response = await this.$api.put(
                    `/movimentacoes/editar/${id}`,
                    this.form.movimentacao
                );
            } else {
                response = await this.$api.post(
                    "/movimentacoes/adicionar",
                    this.form.movimentacao
                );
            }
            if (response.data.message) {
                this.$notify({
                    message: response.data.message,
                    icon: "done",
                    type: "success",
                    horizontalAlign: "center",
                    verticalAlign: "top",
                });
            } else {
                this.$notify({
                    message: response.data.error,
                    icon: "warning",
                    type: "warning",
                    horizontalAlign: "center",
                    verticalAlign: "top",
                });
            }
            this.$router.push("/movimentacoes");
            this.carregando = false;
        },
        atualizaFormulario(data) {
            for (let campo in data) {
                this.form.movimentacao[campo] = data[campo];
            }
            const { valor, desconto, juros, taxa, situacao } = this.form.movimentacao;
            this.form.movimentacao.valor_total = (
                valor - desconto + juros + taxa
            );
            this.form.movimentacao.baixado = situacao == 1 ? 0 : 1;
            console.log(this.form.movimentacao)
        },
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

.total {
    font-size: 24px;
    font-weight: 400;
}

.tag {
    z-index: 2 !important;
}
</style>
