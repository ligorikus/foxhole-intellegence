+<script setup lang="ts">
import TileRow from "./TileRow.vue"
import {onMounted, ref} from "vue";
import {fromEvent, interval} from "rxjs";
import {debounce} from "rxjs/operators";
import {useMap} from "../store/map";
import {useHexagon} from "../store/hexagon";
import { SVG } from '@svgdotjs/svg.js'

const map = useMap();
const hexagon = useHexagon();
const mapItems = ref(null)

onMounted(() => {
  map.updateSize();

  fromEvent(window, 'resize').subscribe(map.updateSize)
  fromEvent(window, 'mouseup').subscribe(map.mouseUp)
  fromEvent(mapItems.value, 'wheel')
      .pipe(
          debounce(i => interval(50))
      )
      .subscribe(map.changeZoom);


  const draw = SVG().addTo('.map_container-items_svg').size(window.innerWidth, window.innerHeight).stroke('#000')

  
  const polygon = draw.polygon('0,0 100,0').fill('none').stroke({ width: 1 })

});
</script>

<template>
  <div
      class="map_container"
      @mousedown="map.mouseDown"
      @mousemove="map.mouseMove"
  >
    <div
        ref="mapItems"
        class="map_container-items"
        :style="{top: map.centerMap.y+'px', left: map.centerMap.x+'px'}"
    >
      <div
          class="map_container-items_svg"
          :style="{top: map.svgStart.y+'px', left: map.svgStart.x+'px'}"
      ></div>
      <TileRow
          v-for="(item, index) in map.tileRange.y"
          :key="index"
          :column="item"
      />
    </div>
  </div>
</template>

<style>
.map_container {
  overflow: hidden;
}
.map_container-items {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.map_container-items_svg {
  position: absolute;
  z-index: 2;
}
</style>
