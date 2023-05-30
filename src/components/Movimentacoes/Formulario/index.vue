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
                <b-form>
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Informações básicas
                        </md-card-header>
                        <md-card-content>
                            <InformacoesBasicas :formMovimentacao="form.movimentacao" :categorias="categorias" />
                        </md-card-content>
                    </md-card>
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Detalhes bancários
                        </md-card-header>
                        <md-card-content class="row">
                            <FormasPagamento class="col-md-6 col-sm-12" :formMovimentacao="form.movimentacao"
                                :formasPagamento="formasPagamento" />
                            <ContasBancarias class="col-md-6 col-sm-12" :formMovimentacao="form.movimentacao"
                                :contasBancarias="contasBancarias" />
                        </md-card-content>
                    </md-card>
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <md-card>
                                <md-card-header data-background-color="purple">
                                    Valores
                                </md-card-header>
                                <md-card-content>
                                    <Valores />
                                </md-card-content>
                            </md-card>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <md-card class="teste">
                                <md-card-header data-background-color="purple">
                                    Tags
                                </md-card-header>
                                <md-card-content>
                                    <Tags :formMovimentacao="form.movimentacao" :tags="tags" />
                                </md-card-content>
                            </md-card>
                        </div>
                    </div>
                    <md-card>
                        <md-card-header data-background-color="purple">
                            Outras informações
                        </md-card-header>
                        <md-card-content>
                            <OutrasInformacoes />
                        </md-card-content>
                    </md-card>
                    <div class="mt-3">
                        <md-button type="submit" class="md-primary mb-3">
                            {{ $route.path.includes("editar") ? "Salvar" : "Cadastrar" }}
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
import Valores from "./Valores.vue";
import Tags from "./Tags.vue";
import InformacoesBasicas from "./InformacoesBasicas.vue";
import ContasBancarias from "./ContasBancarias.vue";
import FormasPagamento from "./FormasPagamento.vue";
import OutrasInformacoes from "./OutrasInformacoes.vue";

export default {
    components: {
        FormasPagamento,
        ContasBancarias,
        InformacoesBasicas,
        OutrasInformacoes,
        Valores,
        Tags,
    },
    data() {
        return {
            form: {
                movimentacao: {
                    tipo: "",
                    codigo: "",
                    categoria_id: "",
                    conta_bancaria_id: "",
                    forma_pagamento_id: "",
                    tag_id: "",
                    descricao: "",
                    valor: "",
                    juros: "",
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
                    this.form.movimentacao =
                        response.data.Movimentacao ?? this.form.movimentacao;
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

.teste {
    z-index: 2 !important;
}
</style>
