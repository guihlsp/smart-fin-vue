<template>
    <b-breadcrumb :items="items"></b-breadcrumb>
</template>
  
<script>
export default {
    name: 'Breadcrumb',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
}
</script>