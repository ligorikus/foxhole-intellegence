import { Point } from "./map";
import { Svg, Polygon as SvgPolygon } from '@svgdotjs/svg.js'

export type State = {
    mapLength: number,
    polygonList?: SvgPolygon,
    draw: Svg,
    container: string
};

export type Line = {
    start: Point,
    end: Point,
};

export type Polygon = Array<Point>;