<template>
    <div class="content">
        <VisualizarComponent/>
    </div>
</template>
  
<script>
import VisualizarComponent from '@/components/Categorias/Visualizar.vue'

export default {
    name: 'Visualizar',
    components: {
        VisualizarComponent
    }
};
</script>
<style lang="scss" scoped>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}
</style>