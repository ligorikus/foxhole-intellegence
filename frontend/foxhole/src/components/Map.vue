+<script setup lang="ts">
import TileRow from "./TileRow.vue"
import {onMounted, ref} from "vue";
import {fromEvent, interval} from "rxjs";
import {debounce} from "rxjs/operators";
import {useMap} from "../store/map";
import {useHexagon} from "../store/hexagon";
import {useCanvas} from "../store/canvas";

const map = useMap();
const hexagon = useHexagon();
const canvas = useCanvas();

const mapItems = ref(null);
const mapItemsCanvas = ref(null);

onMounted(() => {

  hexagon.setContainer('#map_container-items_svg');
  hexagon.setSize(map.size * 256);
  hexagon.drawHexagonMap();

  canvas.setContainer(mapItemsCanvas.value);

  map.updateSize();
  fromEvent(window, 'resize').subscribe(map.updateSize)
  fromEvent(window, 'mouseup').subscribe(map.mouseUp)
  fromEvent(mapItemsCanvas.value, 'wheel')
      .pipe(
          debounce(i => interval(50))
      )
      .subscribe(map.changeZoom);
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
        id="map_container-items_svg"
        :style="{top: map.svgStart.y+'px', left: map.svgStart.x+'px'}"
      ></div>
      <TileRow
          v-for="(item, index) in map.tileRange.y"
          :key="index"
          :column="item"
      />
    </div>
    <canvas
      ref="mapItemsCanvas"
      id='map_container-items_canvas'
      :style="{
        width: map.width+'px', 
        height: map.height+'px',
        cursor: map.drag ? 'grabbing' : 'inherit'
      }"
    ></canvas>
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
#map_container-items_svg {
  position: absolute;
  z-index: 2;
}
#map_container-items_canvas {
  inset: 0;
  outline: none!important;
  position: absolute;
  z-index: 3;
  touch-action: none;
}
</style>
