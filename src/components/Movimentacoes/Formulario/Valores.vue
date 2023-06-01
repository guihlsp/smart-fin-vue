<template>
  <div class="row">
    <b-form-group label-for="valor" class="col-md-4 col-sm-12">
      <md-field>
        <label>Valor</label>
        <md-input id="valor" v-mascara-moeda v-model="formMovimentacaoCopy.valor" autocomplete="off" :disabled="carregando">
        </md-input>
      </md-field>
    </b-form-group>
    <b-form-group label-for="desconto" class="col-md-4 col-sm-12">
      <md-field>
        <label>Desconto</label>
        <md-input id="desconto" v-model="formMovimentacaoCopy.desconto" autocomplete="off" :disabled="carregando">
        </md-input>
      </md-field>
    </b-form-group>
    <b-form-group label-for="juros" class="col-md-4 col-sm-12">
      <md-field>
        <label>Juros</label>
        <md-input id="juros" v-model="formMovimentacaoCopy.juros" autocomplete="off" :disabled="carregando">
        </md-input>
      </md-field>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["formMovimentacao"],
  data() {
    return {
      formMovimentacaoCopy: {},
    };
  },
  methods: {},
  mounted() {
    this.formMovimentacaoCopy = { ...this.formMovimentacao };
  },
};
</script>
