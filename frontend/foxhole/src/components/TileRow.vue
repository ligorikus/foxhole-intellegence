<script setup lang="ts">
import Tile from "./Tile.vue";

defineProps<{ zoom: number, column: number, size: number }>()
</script>

<template>
  <div class="map-row">
    <Tile
        v-for="(item, index) in size"
        :key="index"
        :zoom="zoom"
        :column="column"
        :row="item-1"
    />
  </div>
</template>

<style>
.map-row {
  margin: 0;
  padding: 0;
  height: 256px;
}
</style>
