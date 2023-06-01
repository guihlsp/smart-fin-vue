<template>
  <multiselect v-model="formMovimentacaoCopy.tag_id" :close-on-select="false" :clear-on-select="false" label="descricao"
    track-by="id" :options="tags" :multiple="true" :taggable="true" :tag-position="'bottom'"
    :select-label="'Pressione enter para selecionar'" :selectedLabel="'Selecionado'"
    :deselectLabel="'Pressione enter para remover'" :disable="true" :searchable="false" placeholder="Selecione">
    <template slot="option" slot-scope="{ option }">
      <strong>{{ option.descricao }}</strong>
    </template>
    <template slot="tag" slot-scope="{ option }">
      <strong :style="`margin-right: 3px;background-color: ${option && option.cor_hexa ? option.cor_hexa : 'grey'
        }; color: white; padding: 4px; border-radius: 4px;`">
        {{ option && option.descricao ? option.descricao : "Selecione" }}
      </strong>
    </template>
  </multiselect>
</template>

<script>
export default {
  props: ["tags", "formMovimentacao"],
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
