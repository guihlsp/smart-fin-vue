<template>
    <b-form-group label-for="desconto" class="col-md-4 col-sm-12">
        <md-field>
            <label>Desconto</label>
            <md-input id="desconto" v-mascara-moeda v-model="formMovimentacaoCopy.desconto" autocomplete="off"
                :disabled="carregando" @input="atualizaDados()">
            </md-input>
        </md-field>
    </b-form-group>
</template>
  
<script>

export default {
    props: ["formMovimentacao"],
    data() {
        return {
            formMovimentacaoCopy: {
                desconto: null,
            },
        };
    },
    mounted() {
        this.formMovimentacaoCopy = { ...this.formMovimentacao };
    },
    methods: {
        atualizaDados() {
            this.$emit('atualizaDados', { desconto:  parseFloat(this.formMovimentacaoCopy.desconto) });
        }
    }
};
</script>
  