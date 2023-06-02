<template>
    <div>
        <div class="row d-flex">
            <b-form-group class="col-md-2 col-sm-4">
                <md-field>
                    <label>Código</label>
                    <md-input disabled @input="atualizaDados()" v-model="formMovimentacaoCopy.codigo"></md-input>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-3 col-sm-8">
                <md-field>
                    <label>Tipo</label>
                    <md-select id="tipo" v-model="formMovimentacaoCopy.tipo" autocomplete="off" :disabled="carregando"
                        @md-selected="atualizaDados()">
                        <md-option value="1">Pagamento</md-option>
                        <md-option value="2">Recebimento</md-option>
                    </md-select>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-4 col-sm-12 mt-2">
                <v-menu transition="scale-transition" min-width="auto" :close-on-content-click="true" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="formMovimentacaoCopy.data_vencimento" label="Data" variant="underlined"
                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker no-title scrollable color="green lighten-1" v-model="dataVencimentoSelecionada"
                        elevation="15" locale="pt-br" :first-day-of-week="0"></v-date-picker>
                </v-menu>
            </b-form-group>
            <b-form-group class="col-md-3 col-sm-12">
                <md-field>
                    <label>Situação</label>
                    <md-select id="situacao" v-model="formMovimentacaoCopy.situacao" autocomplete="off"
                        :disabled="carregando" @md-selected="atualizaDados()">
                        <md-option value="1" default>Pendente</md-option>
                        <md-option value="2">Confirmado</md-option>
                    </md-select>
                </md-field>
            </b-form-group>
            <b-form-group class="col-md-6 col-sm-12 mt-2" v-if="situacaoConfirmada">
                <v-menu transition="scale-transition" min-width="auto" :close-on-content-click="true" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="formMovimentacaoCopy.data_baixa" label="Data de confirmação"
                            variant="underlined" append-icon="mdi-calendar" readonly v-bind="attrs"
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker no-title scrollable color="green lighten-1" v-model="dataBaixaSelecionada" elevation="15"
                        locale="pt-br" :first-day-of-week="0"></v-date-picker>
                </v-menu>
            </b-form-group>
            <b-form-group class="col-sm-12 col-md-6">
                <md-field>
                    <label>Categoria</label>
                    <md-select id="categoria_id" v-model="formMovimentacaoCopy.categoria_id" autocomplete="off"
                        :disabled="carregando" @md-selected="atualizaDados()">
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
                    <md-input v-model="formMovimentacaoCopy.descricao" @input="atualizaDados()"></md-input>
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
            dataVencimentoSelecionada: '',
            dataBaixaSelecionada: '',
        };
    },
    watch: {
        dataVencimentoSelecionada(valor) {
            this.formMovimentacaoCopy.data_vencimento = this.formataData(valor);
            this.atualizaDados();
        },
        dataBaixaSelecionada(valor) {
            this.formMovimentacaoCopy.data_baixa = this.formataData(valor);
            this.atualizaDados();
        },
    },
    mounted() {
        this.formMovimentacaoCopy = { ...this.formMovimentacao };
    },
    computed: {
        labelDataVencimento() {
            return this.formMovimentacaoCopy.data_vencimento ? '' : 'Selecione uma data';
        },
        labelDataBaixa() {
            return this.formMovimentacaoCopy.data_baixa ? '' : 'Selecione uma data';
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
        atualizaDados() {
            this.$emit('atualizaDados', {
                codigo: this.formMovimentacaoCopy.codigo,
                tipo: this.formMovimentacaoCopy.tipo,
                data_vencimento: this.formMovimentacaoCopy.data_vencimento,
                situacao: this.formMovimentacaoCopy.situacao,
                data_baixa: this.formMovimentacaoCopy.data_baixa,
                categoria_id: this.formMovimentacaoCopy.categoria_id,
                descricao: this.formMovimentacaoCopy.descricao,
            });
        }
    },
}
</script>
