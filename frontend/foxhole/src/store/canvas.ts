import {defineStore} from "pinia";
import {State} from "../types/canvas"

export const useCanvas = defineStore('canvas', {
    state: (): State => ({
        container: 0
    }),
    getters: {
    },
    actions: {
        setContainer(container) {
            this.container = container
        }
    }
});