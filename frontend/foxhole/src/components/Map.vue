<script setup lang="ts">
import TileRow from "./TileRow.vue";
import {ref} from "vue";

const zoom = ref(2)

const size = Math.pow(2, zoom.value)
</script>

<template>
  <div class="map">
    <TileRow
        v-for="(item, index) in size"
        :key="index"
        :zoom="zoom"
        :column="item-1"
        :size="size"
    />
  </div>
</template>

<style>
.map {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
