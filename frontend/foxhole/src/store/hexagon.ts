import {defineStore} from "pinia";
import {Polygon, State} from "../types/hexagon"
import { Point } from "../types/map";
import {useMap} from "../store/map";
import { SVG, Svg, Polygon as SvgPolygon } from '@svgdotjs/svg.js'

const makeHexagon = (start: Point, width: number, height: number): Polygon => {
    return <Polygon>[
        start,
        <Point>{
            x: start.x + width / 4, 
            y: start.y - height / 2
        },
        <Point>{
            x: start.x + width * 3 / 4, 
            y: start.y - height / 2
        },
        <Point>{
            x: start.x + width, 
            y: start.y
        },
        <Point>{
            x: start.x + width * 3 / 4, 
            y: start.y + height / 2
        },
        <Point>{
            x: start.x + width / 4, 
            y: start.y + height / 2
        },
        start
    ];
}

const hexPolygon = (hexagon: Polygon): string => {
    return hexagon.map(point => point.x.toFixed(2) + ',' + point.y.toFixed(2)).join(' ');
}

export const useHexagon = defineStore('hexagon', {
    state: (): State => ({
        container: "body",
        draw: SVG(),
        mapLength: 7,
        polygonList: undefined
    }),
    getters: {
        width({mapLength}): number {
            const map = useMap();
            return (map.size * 256) / mapLength;
        },
        center(): number {
            const map = useMap();
            return map.size * Math.pow(2, 7);
        },
        height(): number {
            return (Math.sqrt(3)/2) * this.width
        },
        hexagonList(): Array<Polygon> {
            const list: Array<Polygon> = [];
            const startPointList = [
                <Point>{
                    x: 0,
                    y: this.center
                },
                <Point>{
                    x: this.width * 1.5,
                    y: this.center
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center
                },
                <Point>{
                    x: this.width * 4.5,
                    y: this.center
                },
                <Point>{
                    x: this.width * 6,
                    y: this.center
                },
                <Point>{
                    x: 0,
                    y: this.center + this.height
                },
                <Point>{
                    x: this.width * 1.5,
                    y: this.center + this.height
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center + this.height
                },
                <Point>{
                    x: this.width * 4.5,
                    y: this.center + this.height
                },
                <Point>{
                    x: this.width * 6,
                    y: this.center + this.height
                },
                <Point>{
                    x: 0,
                    y: this.center - this.height
                },
                <Point>{
                    x: this.width * 1.5,
                    y: this.center - this.height
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center - this.height
                },
                <Point>{
                    x: this.width * 4.5,
                    y: this.center - this.height
                },
                <Point>{
                    x: this.width * 6,
                    y: this.center - this.height
                },
                <Point>{
                    x: this.width * 1.5,
                    y: this.center - this.height * 2
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center - this.height * 2
                },
                <Point>{
                    x: this.width * 4.5,
                    y: this.center - this.height * 2
                },
                <Point>{
                    x: this.width * 1.5,
                    y: this.center + this.height * 2
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center + this.height * 2
                },
                <Point>{
                    x: this.width * 4.5,
                    y: this.center + this.height * 2
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center + this.height * 3
                },
                <Point>{
                    x: this.width * 3,
                    y: this.center - this.height * 3
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center - this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center - this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center - this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 4.5,
                    y: this.center - this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 4.5,
                    y: this.center - this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 4.5,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center + this.height * 0.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 4.5,
                    y: this.center + this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center + this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center + this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center + this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center + this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center - this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4,
                    y: this.center - this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center - this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center - this.height * 1.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center - this.height * 2.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center - this.height * 2.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 1.5,
                    y: this.center + this.height * 2.5
                },
                <Point>{
                    x: this.width * 3 / 4 + this.width * 3,
                    y: this.center + this.height * 2.5
                },
            ]
            startPointList.forEach((point) => {
                list.push(makeHexagon(point, this.width, this.height))
            });
            return list;
        },
    },
    actions: {
        setContainer(container: string): void {
            this.container = container;
        },
        setSize(size: number): void {
            this.draw.addTo(this.container).size(size, size).stroke('#626b65');
        },
        drawHexagonMap(): void {
            this.hexagonList.map(hexagon => {
                this.draw.polygon(hexPolygon(hexagon)).fill('none').stroke({ width: 1 });
            });
        },
        clearHexagonMap(): void {
            this.draw.clear();
        }
    }
});
