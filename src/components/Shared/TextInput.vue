<template>
  <input
    type="text"
    :value="modelValue"
    class="w.full font-nomal text-lg focus:outline-none"
    @input="handleInput"
  />
  <!-- 
    <input
      type="text"
      :value="value"
      class="w.full font-nomal text-lg focus:outline-none"
      @input="handleInput"
    />
   -->
  <!-- v-model sirve para que podamos ingresar valores del navegador a nuestra App, sin necesidad de crear conexiones de forma manual con v-on:input="" y v-bind:value="" o condigo inline, solo v-model="'nombre del dato a actualizar'" -->
  <!-- v-model no tiene forma abreviada -->
  <!-- para que la información de nuestro navegador ingrese a nuestra App y no solo de nuestra App al navegador, es utilizando input, se puede escribir de las siguientes formas -->
  <!-- la forma de ingresar el input es directamente inline, pero es mezclar javascript con html -->
  <!-- también se puede utilizar v-on:input="handleInput" o solo @input="handleInput", lo que llama al metodo que creamos para actualizará nuestros datos -->
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  //cuando usamos emits, hay que crear un objeto como de configuración, esto sirve para que Vue verifique si lo que estamos pasando por emit es un string?
  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value);
      //update:modelValue, según la documentación de Vue, permite que podamos utilizar v-model en el componente, supongo se refiere al componente padre
    },
  },
};

//ESTA ES UNA OPCIÓN ALGO COMPLEJA DE HACER EL TRABAJO SIN DUPLICAR CÓDIGO
//   props: {
//     value: {
//       type: String,
//       required: true,
//     },
//   },
//   methods: {
//     handleInput($event) {
//       this.$emit('handleInput', $event.target.value);
//     },
//   },
// };

//ESTA ES UNA OPCIÓN QUE TIENE EL DEFECTO QUE DUPLICA LOS DATOS, PORQUE DEJA UNA VARIABLE VALUE EN EL CÓDIGO, Y LUEGO SE DUPLICA EN EL COMPONENTE QUE LA LLAMA
//   data() {
//     return {
//       value: '',
//     };
//   },
//   methods: {
//     handleInput($event) {
//       //$event no tiene nada de especial, se usa como una forma de escritura, que sirve a los developer para entender que este evento viene directamente del HTML, básicamente, se puede usar lo que uno quiera, como solo event, o solo "i"
//       this.value = $event.target.value;
//       this.$emit('handleInput', this.value);
//       //$emit sirve para enviarle una variable al padre, con el nombre que le definimos (handleInput ejemplo)
//     },
//   },
// };
</script>
