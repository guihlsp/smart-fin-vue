<template>
  <b-form-group label-for="conta_bancaria_id" class="">
    <md-field>
      <label>Conta bancária</label>
      <md-select id="conta_bancaria_id" v-model="formMovimentacao.conta_bancaria_id" autocomplete="off"
        :disabled="carregando" @md-selected="atualizaDados">
        <md-option v-if="contasBancarias && contasBancarias.length == 0" value="" default>Selecione</md-option>
        <md-option v-for="contaBancaria in contasBancarias" :key="contaBancaria.id" :value="contaBancaria.id">
          {{ contaBancaria.descricao }}
        </md-option>
      </md-select>
    </md-field>
  </b-form-group>
</template>

<script>
export default {
  props: ["contasBancarias", "formMovimentacao"],
  methods: {
    atualizaDados() {
      this.$emit("atualizaDados", {conta_bancaria_id: this.formMovimentacao.conta_bancaria_id});
    }
  }
};
</script>
