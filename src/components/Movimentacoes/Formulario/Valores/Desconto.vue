<template>
    <b-form-group label-for="desconto" class="col-md-4 col-sm-12">
        <md-field>
            <label>Desconto</label>
            <md-input id="desconto" v-mascara-moeda v-model="formMovimentacaoCopy.desconto" autocomplete="off"
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
  