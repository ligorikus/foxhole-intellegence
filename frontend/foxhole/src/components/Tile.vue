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
  >
    <img
        class="map_container-tile_image"
        alt=""
        :src="src"
        :style="{top: top+'px', left: left+'px', opacity: 1}"
        >
  </div>
</template>

<style>
.map_container-tile {
}

.map_container-tile img {
  width: 256px;
  height: 256px;

  position: absolute;

  user-select: none;

  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
