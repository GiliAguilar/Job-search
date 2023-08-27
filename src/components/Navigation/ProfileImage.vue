<template>
  <img :src="imageLink" class="h-8 w-8 rounded-3xl object-contain" alt="User profile image" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
//no necesario ref, se dejará por si necesio hacer reactiva la imagen de perfil
const imageLink = ref(
  'https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png'
);
</script>

<!-- Vue 2 y 3 old form -->
<!-- 
<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink:
        'https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png',
    };
  },
};
</script> -->
