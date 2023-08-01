<template>
  <div>Job Page</div>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    currentJobId() {
      return this.$route.params.id;
      //params es un objeto que es devuelto del objeto route, este tiene sus propias propiedades/parámetros que son relavantes a URLs. En este caso vamos a acceder a parámetro "id", este es exactamente el mismo que se definió en route ":id", si le hubieramos puesto ":nonsense" en route, entonces aquí se llamaría igual, y para acceder a el sería this.$route.params.nonsense
    },
  },
};
</script>
