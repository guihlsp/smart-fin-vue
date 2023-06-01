<template>
  <div class="row">
    <Valor :formMovimentacao="formMovimentacaoCopy" />
    <Desconto :formMovimentacao="formMovimentacaoCopy" />
    <Juros :formMovimentacao="formMovimentacaoCopy" />
  </div>
</template>

<script>
import Valor from './Valor.vue';
import Desconto from './Desconto.vue';
import Juros from './Juros.vue';

export default {
  props: ["formMovimentacao"],
  components: {
    Valor,
    Desconto,
    Juros
  },
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
