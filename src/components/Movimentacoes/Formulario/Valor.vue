<template>
    <b-form-group label-for="valor" class="col-md-4 col-sm-12">
        <md-field>
            <label>Valor</label>
            <md-input id="valor" v-mascara-moeda v-model="formMovimentacao.valor" autocomplete="off"
                :disabled="carregando" @input="atualizaDados()">
            </md-input>
        </md-field>
    </b-form-group>
</template>
  
<script>
export default {
    props: ["formMovimentacao"],
    methods: {
        atualizaDados() {
            this.$emit('atualizaDados', { valor: parseFloat(this.formMovimentacao.valor) });
        }
    }
};
</script>
  