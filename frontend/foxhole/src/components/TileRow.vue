<script setup lang="ts">
import Tile from "./Tile.vue";
import {useMap} from "../store/map";

defineProps<{ column: number}>();

const map = useMap();
</script>

<template>
  <div class="map-row">
    <Tile
        v-for="(item, index) in map.tileRange.x"
        :key="index"
        :column="column"
        :row="item"
    />
  </div>
</template>

<style>
.map-row {
}
</style>
