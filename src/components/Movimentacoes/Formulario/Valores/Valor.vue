<template>
    <b-form-group label-for="valor" class="col-md-4 col-sm-12">
        <md-field>
            <label>Valor</label>
            <md-input id="valor" v-mascara-moeda v-model="formMovimentacaoCopy.valor" autocomplete="off"
                :disabled="carregando">
            </md-input>
        </md-field>
    </b-form-group>
</template>
  
<script>
export default {
    props: ["formMovimentacao"],
    data() {
        return {
            formMovimentacaoCopy: {},
        };
    },
    mounted() {
        this.formMovimentacaoCopy = { ...this.formMovimentacao };
    },
};
</script>
  