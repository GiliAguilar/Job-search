<template>
  <button :class="buttonClass">
    <!-- 
    <button :class="{ primary: primarytest }">
    cuando agregamos v-bind: (o solo ":") le decimos a Vue que estamos ingresando alguna clase de expresión de javascript 
    
    para este ejemplo, se está ingresando un objeto, por ejemplo, se ponemos primary:true, le estamos diciendo que aplique el atributo primary, por ende, va a aplicar el estilo CSS que definimos como primary, podemos usar codigo javacript, por lo que podemos hacer referencia a datos dentro de nuestro script, en este caso hacemos referencia directamente a nuestro dato primarytest (podemos ponerle el mismo nombre al dato que el atributo del objeto y que el estilo del boton, por ejemplo, ponerle a todo "primary", al objeto arriba, al dato refencia, y a la referencia css, y aquí quedaría :class="{ primary }" simplemente)
    -->
    {{ text }}
  </button>
</template>

<!-- Antigua forma de escribir en Vue2 y Vue3, mixto -->
<!-- <script>
import { computed, toRefs } from 'vue';

export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      require: true,
      default: null,
    },
    type: {
      type: String,
      require: false,
      validator(value) {
        return ['primary', 'secondary'].includes(value.toLowerCase());
      },
      //validator verifica si el valor que se le pasa es el que esperamos en el código, y no solo si es tipo String como se especifica en type; le decimos con un array las opciones que tenemos, y buscamos con .includes si existe, sino no aplica nada y sale una advertencia en consola (value es el valor por defecto que dicen los de Vue que hay que usar, básicamente value es el valor que está pasando como prop, en este ejemplo es "primary")
      default: 'primary',
      //al poner require, le estamos diciendo si es obligatorio que nos especifiquen el dato en el componente padre (MainNave -> action-button type="primary"), en caso de ser falso, con default le especificamos el contenido que tendrá por defecto si NO SE APLICA NADA, si se aplica algo que no es se maneja con validator
    },
  },
  //props es un pedazo de código (argumentos) que pasa de su componente padre (parent) a sus componentes hijos (child), osea, en este ejemplo, de MainNav.vue a ActionButton.vue. la ventaja de esto es que cualquier cambio que sufra un argumento de componente padre, va a auto renderizar en el momento lo afectado del componente hijo
  //Vue 3
  setup(props) {
    //si necesitamos usar props simplemente las pasamos como un parámetro en la función setup

    //metodo 1
    // const buttonClass = computed(() => {
    //   return { [props.type]: true };
    // });

    //metodo 2
    const { type } = toRefs(props);
    //toma el props que está recibiento este componente Vue, suponiendo tiene nombre "Hola", y props devuelve el contenido del prop, osea devuelve el contenido de "Hola", que sería {type, requiere, etc...}, luego destructuramos y extraemos solo type, que lo devuelve como un nuevo objeto, el cual usaremos en la función buttonClass; como type realmente es un valor de prop, debemos referenciar a esta siempre con [type] y objetener su contenido [type.value]
    const buttonClass = computed(() => {
      return { [type.value]: true };
    });
    return { buttonClass };
  },

  //Vue 2
  // computed: {
  //   buttonClass() {
  //     return {
  //       [this.type]: true,
  //       /*
  //       primary: this.type === 'primary',
  //       secondary: this.type === 'secondary',
  //       podemos escribirlo de esta forma

  //       o usar javascript Dinamic Object Keys, se pone entre "[]" el nombre de la propiedad del objeto, antes, externamente creamos una variable la cual buscará y asignará como nombre de la propiedad del objeto, ejem:

  //       const favoriteFood = "sushi";
  //       const goodFoods = {
  //         [favoriteFood]: true,
  //       };
  //       console.log(goodFoods) -> //{ sushi: true }
  //        */
  //     };
  //   },
  // },
};
</script> -->

<!-- nueva forma con Vue 3.2 -->
<script lang="ts" setup>
import { computed, toRefs } from 'vue';

//no necesitamos usar export default, ni utilizar return, ni .this, tampoco data, methods, computed, etc..., todo lo que esté aquí definido estará disponible para <template> y <style>
const props = defineProps({
  text: {
    type: String,
    require: true,
    default: null,
  },
  type: {
    type: String,
    require: false,
    validator(value: string) {
      // validator(value) {
      return ['primary', 'secondary'].includes(value.toLowerCase());
    },
    default: 'primary',
  },
});

const { type } = toRefs(props);
const buttonClass = computed(() => {
  return { [type.value]: true };
});
</script>

<style scoped>
button {
  /* aquí pondremos los estilos en común que tendrán todos los botones */
  @apply px-5 py-2 font-medium;
  /*
  con @apply podemos insertar estilos tailwind en vez de escribir directamente en CSS, porque realmente lo que espera este apartado de style de Vue es código CSS */
}
.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}

/* con primary y secondary extendemos los estilos que tendrá cada boton de forma específica */
</style>
