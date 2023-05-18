<template>
    <div class="col-12" v-html="htmlContent"></div>
</template>
  
<script>
export default {
    data() {
        return {
            htmlContent: `
            <div id="principal" class="mt-5 col-12 text-center">
                <i style="font-size: 78px" class="mt-4 fa fa-exclamation-triangle" aria-hidden="true"></i>
                <h1 style="font-size: 60px">Título da página</h1>
                <p>Conteúdo da página.</p>
            </div>
            <style>
                html{
                    background-color: #EEEEEE !important;
                }
                #principal{
                    height: 100vh;
                    width: 100%;
                }
            </style>
        `,
        };
    },
};
</script>
