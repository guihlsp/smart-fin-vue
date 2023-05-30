<template>
    <div>
        <div class="row d-flex">
            <b-form-group class="col-md-2 col-sm-4">
                <md-field>
                    <label>Código</label>
                    <md-input></md-input>
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
            <b-form-group class="col-md-4 col-sm-12">
                <v-menu transition="scale-transition" min-width="auto" v-model="formMovimentacaoCopy.vencimento"
                    :close-on-content-click="false" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dataFormatada" label="Data" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker no-title scrollable color="green lighten-1" v-model="dataSelecionada" elevation="15"
                        @input="formMovimentacaoCopy.vencimento = false" locale="pt-br"
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
            <b-form-group class="col-sm-12 col-md-8">
                <md-field>
                    <label>Descrição</label>
                    <md-input></md-input>
                </md-field>
            </b-form-group>
            <b-form-group class="col-sm-12 col-md-4">
                <md-field>
                    <label>Categoria</label>
                    <md-select id="categoria_id" v-model="formMovimentacaoCopy.categoria_id" autocomplete="off"
                        :disabled="carregando">
                        <md-option value="" default>Selecione</md-option>
                        <md-option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                            {{ categoria.descricao }}
                        </md-option>
                    </md-select>
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
            dataSelecionada: null,
            dataFormatada: '',
        };
    },
    watch: {
        dataSelecionada(valor) {
            this.dataFormatada = this.formataData(valor);
        },
    },
    mounted() {
        this.formMovimentacaoCopy = { ...this.formMovimentacao };
    },
    computed: {
        labelData() {
            return this.dataFormatada ? '' : 'Selecione uma data';
        },
    },
    methods: {
        formataData(data) {
            if (!data) return '';
            this.$moment.locale('pt-br');
            return this.$moment(data).format('DD/MM/YYYY');
        },
    },
}
</script>
