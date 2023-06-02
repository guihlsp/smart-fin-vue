<template>
    <b-form-group>
        <md-field>
            <label>Observações</label>
            <md-textarea v-model="formMovimentacaoCopy.observacoes" @input="atualizaDados()"></md-textarea>
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
    methods: {
        atualizaDados() {
            this.$emit("atualizaDados", { observacoes: this.formMovimentacaoCopy.observacoes });
        }
    }
};
</script>
