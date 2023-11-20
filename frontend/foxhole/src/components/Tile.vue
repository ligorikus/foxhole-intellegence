<script setup lang="ts">
import {computed} from "vue";
import {useMap} from "../store/map";

const props = defineProps<{ column: number, row: number}>();

const map = useMap();
const top = computed(() => props.column * 256 - Math.pow(2, map.zoom + 7))
const left = computed(() => props.row * 256 - Math.pow(2, map.zoom + 7))

const src = computed(() => {
  return '/tiles/' + map.zoom + '/' + map.zoom + '_' + props.row + '_' + props.column + '.png';
});
</script>

<template>
  <div
      class="map_container-tile"
      :style="{top: top+'px', left: left+'px'}"
  >
    <img
        class="map_container-tile_image"
        alt=""
        :src="src">
  </div>
</template>

<style>
.map_container-tile {
  width: 256px;
  height: 256px;

  position: absolute;
}

.map_container-tile img {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
