<template>
    <b-form-group>
        <md-field>
            <label>Observações</label>
            <md-textarea v-model="formMovimentacao.observacoes" @input="atualizaDados()"></md-textarea>
        </md-field>
    </b-form-group>
</template>

<script>
export default {
    props: ["formMovimentacao"],
    methods: {
        atualizaDados() {
            this.$emit("atualizaDados", { observacoes: this.formMovimentacao.observacoes });
        }
    }
};
</script>
