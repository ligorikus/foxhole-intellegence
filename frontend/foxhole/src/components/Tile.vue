<script setup lang="ts">
defineProps<{ zoom: number, row: number, column: number }>()
</script>

<template>
  <img alt="" :src="'/tiles/'+zoom+'/'+zoom+'_'+row+'_'+column+'.png'">
</template>

<style>
</style>
