<template>
    <div>
        <div class="row d-flex">
            <b-form-group class="col-md-2 col-sm-4">
                <md-field>
                    <label>Código</label>
                    <md-input disabled v-model="formMovimentacaoCopy.codigo"></md-input>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-3 col-sm-8">
                <md-field>
                    <label>Tipo</label>
                    <md-select id="tipo" v-model="formMovimentacaoCopy.tipo" autocomplete="off" :disabled="carregando">
                        <md-option value="1" default>Pagamento</md-option>
                        <md-option value="2">Recebimento</md-option>
                    </md-select>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-4 col-sm-12 mt-2">
                <v-menu transition="scale-transition" min-width="auto" v-model="formMovimentacaoCopy.data_vencimento"
                    :close-on-content-click="false" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dataVencimentoFormatada" label="Data" variant="underlined"
                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker no-title scrollable color="green lighten-1" v-model="dataVencimentoSelecionada"
                        elevation="15" @input="formMovimentacaoCopy.data_vencimento = false" locale="pt-br"
                        :first-day-of-week="0"></v-date-picker>
                </v-menu>
            </b-form-group>
            <b-form-group class="col-md-3 col-sm-12">
                <md-field>
                    <label>Situação</label>
                    <md-select id="situacao" v-model="formMovimentacaoCopy.situacao" autocomplete="off"
                        :disabled="carregando">
                        <md-option value="1" default>Pendente</md-option>
                        <md-option value="2">Confirmado</md-option>
                    </md-select>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-6 col-sm-12 mt-2" v-if="situacaoConfirmada">
                <v-menu transition="scale-transition" min-width="auto" v-model="formMovimentacaoCopy.data_baixa"
                    :close-on-content-click="false" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dataBaixaFormatada" label="Data de confirmação" variant="underlined"
                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker no-title scrollable color="green lighten-1" v-model="dataBaixaSelecionada" elevation="15"
                        @input="formMovimentacaoCopy.data_baixa = false" locale="pt-br"
                        :first-day-of-week="0"></v-date-picker>
                </v-menu>
            </b-form-group>
            <b-form-group class="col-sm-12 col-md-6">
                <md-field>
                    <label>Categoria</label>
                    <md-select id="categoria_id" v-model="formMovimentacaoCopy.categoria_id" autocomplete="off"
                        :disabled="carregando">
                        <md-option v-if="categorias && categorias.length == 0" value="" default>Selecione</md-option>
                        <md-option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                            {{ categoria.descricao }}
                        </md-option>
                    </md-select>
                </md-field>
            </b-form-group>
            <b-form-group class="col-sm-12 col-md-6">
                <md-field>
                    <label>Descrição</label>
                    <md-input v-model="formMovimentacaoCopy.descricao"></md-input>
                </md-field>
            </b-form-group>
        </div>
    </div>
</template>

<script>
export default {
    props: ["categorias", "formMovimentacao"],
    data() {
        return {
            formMovimentacaoCopy: {},
            dataVencimentoSelecionada: null,
            dataVencimentoFormatada: '',
            dataBaixaSelecionada: null,
            dataBaixaFormatada: '',
        };
    },
    watch: {
        dataVencimentoSelecionada(valor) {
            this.dataVencimentoFormatada = this.formataData(valor);
        },
        dataBaixaSelecionada(valor) {
            this.dataBaixaFormatada = this.formataData(valor);
        },
    },
    mounted() {
        this.formMovimentacaoCopy = { ...this.formMovimentacao };
    },
    computed: {
        labelDataVencimento() {
            return this.dataVencimentoFormatada ? '' : 'Selecione uma data';
        },
        labelDataBaixa() {
            return this.dataBaixaFormatada ? '' : 'Selecione uma data';
        },
        situacaoConfirmada() {
            return this.formMovimentacaoCopy.situacao == '2';
        },
    },
    methods: {
        formataData(data) {
            if (!data) return '';
            this.$moment.locale('pt-br');
            return this.$moment(data).format('DD/MM/YYYY');
        },
        exibeDataBaixa() {
            if (!this.situacaoConfirmada) {
                this.formMovimentacaoCopy.data_baixa = '';
            }
        },
    },
}
</script>
