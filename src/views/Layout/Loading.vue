<template>
    <div class="loading-spinner">
        <b-spinner label="Carregando..." type="border" variant="primary"></b-spinner>
    </div>
</template>
  
<style scoped>
.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>
  