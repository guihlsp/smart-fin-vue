<template>
    <b-form-group label-for="juros" class="col-md-4 col-sm-12">
        <md-field>
            <label>Juros</label>
            <md-input id="juros" v-mascara-moeda v-model="formMovimentacao.juros" autocomplete="off"
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
            this.$emit('atualizaDados', { juros:  parseFloat(this.formMovimentacao.juros) });
        }
    }
};
</script>
  