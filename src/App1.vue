<template>
  <div>
    app--{{ count }}
  </div>
  <div>
    <button @click="onClick">+100</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(10)
const onClick = () => {
  count.value += 100
}
</script>





<style scoped>
</style>
