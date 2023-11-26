import {defineStore} from "pinia";
import {Line, State} from "../types/hexagon"
import { Point } from "../types/map";
import {useMap} from "../store/map";


export const useHexagon = defineStore('hexagon', {
    state: (): State => ({
        width: 256
    }),
    getters: {
        center: (): number => {
            const map = useMap();
            return map.size * Math.pow(2, 7);
        },
        hexHeight: ({width}): number => (Math.sqrt(3)/2) * width,
        line: ({width}): Line => {
            const start = <Point>{
                x: 0, 
                y: 0
            }; 
            const  end = <Point>{
                x: width / 4, 
                y: this.hexHeight / 2
            };
            return <Line>{start, end}
        }
    },
});
