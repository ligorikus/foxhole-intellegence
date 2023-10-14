<script setup lang="ts">
import { ref } from 'vue'
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
const zoom = ref(6)

</script>

<template>
    <div style="height:600px; width:800px">
        <l-map :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
            <l-tile-layer
            url="https://raw.githubusercontent.com/Kastow/Foxhole-Map-Tiles/master/Tiles/{z}/{z}_{x}_{y}.png"
            layer-type="base"
            name="OpenStreetMap"
            ></l-tile-layer>
        </l-map>
    </div>
</template>

<style>
.leaflet-control-attribution {
    display: none !important;
}
</style>