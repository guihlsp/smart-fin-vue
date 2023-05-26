<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header class="d-flex justify-content-between" data-background-color="green">
            <h4 class="title h3">Movimentações</h4>
            <md-button class="md-primary" to="movimentacoes/adicionar"><md-icon>add</md-icon>Adicionar</md-button>
          </md-card-header>
          <md-card-content>
            <Lista table-header-color="green"></Lista>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Lista from "@/components/Movimentacoes";

export default {
  name: 'Listar',
  components: {
    Lista,
  },
};
</script>
