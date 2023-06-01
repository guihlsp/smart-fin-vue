<template>
  <b-form-group label-for="forma_pagamento_id" class="">
    <md-field>
      <label>Forma de pagamento</label>
      <md-select id="forma_pagamento_id" v-model="formMovimentacaoCopy.forma_pagamento_id" autocomplete="off"
        :disabled="carregando">
        <md-option v-if="formasPagamento && formasPagamento.length == 0" value="" default>Selecione</md-option>
        <md-option v-for="formaPagamento in formasPagamento" :key="formaPagamento.id" :value="formaPagamento.id">
          {{ formaPagamento.nome }}
        </md-option>
      </md-select>
    </md-field>
  </b-form-group>
</template>

<script>
export default {
  props: ["formasPagamento", "formMovimentacao"],
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
