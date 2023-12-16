import {defineStore} from "pinia";
import {State, Point, Viewport, PointRange} from "../types/map"
import { useHexagon } from "./hexagon";
import { useCanvas } from "./canvas";

export const useMap = defineStore('map', {
    state: (): State => ({
        zoom: 1,
        maxZoom: 6,

        width: 0,
        height: 0,

        drag: false,

        center: <Point>{
            x: 0,
            y: 0,
        },

        startPosition: <Point>{
            x: 0,
            y: 0,
        },
    }),
    getters: {
        size: ({zoom}): number => Math.pow(2, zoom),
        centerWindow({width, height}): Point {
            return {
                x: width / 2,
                y: height / 2
            }
        },
        centerMap({center}): Point {
            return {
                x: this.centerWindow.x + center.x,
                y: this.centerWindow.y + center.y,
            }
        },
        viewport({width, height}): Viewport {
            const start = <Point>{
                x: -this.centerMap.x,
                y: -this.centerMap.y,
            }

            const end = <Point>{
                x: -this.centerMap.x + width,
                y: -this.centerMap.y + height,
            }
            return <Viewport>{
                start, end
            }
        },
        relativeViewport({zoom}): Viewport {
            return <Viewport>{
                start: {
                    x: this.viewport.start.x + Math.pow(2, zoom + 7),
                    y: this.viewport.start.y + Math.pow(2, zoom + 7),
                },
                end: {
                    x: this.viewport.end.x + Math.pow(2, zoom + 7),
                    y: this.viewport.end.y + Math.pow(2, zoom + 7),
                }
            }
        },
        tileViewport({}): Viewport {
            const viewportStart = <Point>{
                x: ~~(this.relativeViewport.start.x / 256),
                y: ~~(this.relativeViewport.start.y / 256),
            };
            const viewportEnd = <Point>{
                x: ~~(this.relativeViewport.end.x / 256),
                y: ~~(this.relativeViewport.end.y / 256),
            };

            const maxTile = this.size - 1;

            if (viewportStart.x < 0) {
                viewportStart.x = 0;
            }
            if (viewportStart.x > maxTile) {
                viewportStart.x = maxTile;
            }

            if (viewportStart.y < 0) {
                viewportStart.y = 0;
            }
            if (viewportStart.y > maxTile) {
                viewportStart.y = maxTile;
            }

            if (viewportEnd.x < 0) {
                viewportEnd.x = 0;
            }
            if (viewportEnd.x > maxTile) {
                viewportEnd.x = maxTile;
            }

            if (viewportEnd.y < 0) {
                viewportEnd.y = 0;
            }
            if (viewportEnd.y > maxTile) {
                viewportEnd.y = maxTile;
            }

            return <Viewport>{
                start: {
                    x: viewportStart.x,
                    y: viewportStart.y,
                },
                end: {
                    x: viewportEnd.x,
                    y: viewportEnd.y,
                }
            }
        },
        tileRange(): PointRange {
            return <PointRange>{
                x: Array.from({
                    length: this.tileViewport.end.x - this.tileViewport.start.x + 1
                }, (_, i) => i + this.tileViewport.start.x),
                y: Array.from({
                    length: this.tileViewport.end.y - this.tileViewport.start.y + 1
                }, (_, i) => i + this.tileViewport.start.y),
            }
        },
        svgStart({zoom}): Point {
            return <Point>{
                x: -Math.pow(2, zoom + 7),
                y: -Math.pow(2, zoom + 7),
            }
        }
    },
    actions: {
        updateSize(): void {
            
            const canvas = useCanvas();
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            const ctx = canvas.container.getContext('2d');
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;
        },
        mouseDown(event: any): void {
            if (event.button === 0) {
                console.log(event);
            }
            if (event.button === 1) {
                this.drag = true;
                this.startPosition = {
                    x: event.x,
                    y: event.y,
                }
            }
        },
        mouseMove(event: any) {
            if (this.drag) {
                this.center.x -= this.startPosition.x - event.x;
                this.center.y -= this.startPosition.y - event.y;

                this.startPosition = {
                    x: event.x,
                    y: event.y,
                }
            }
        },
        mouseUp(): void {
            this.drag = false;
        },
        changeZoom(event: WheelEvent): void {
            const hexagon = useHexagon();
            const canvas = useCanvas();

            hexagon.clearHexagonMap();
            const viewportPoint = <Point>{
                x: this.viewport.start.x + event.x,
                y: this.viewport.start.y + event.y,
            }
            if (event.deltaY < 0 && this.zoom < this.maxZoom) {
                this.zoom++;
                this.center.x = -viewportPoint.x * 2;
                this.center.y = -viewportPoint.y * 2;

                if (this.zoom === 7) {
                    const ctx = canvas.container.getContext('2d');
                    const img = new Image();
                    img.src =
                      "https://raw.githubusercontent.com/brandon-ray/foxhole-facility-planner/master/public/games/foxhole/assets/game/Textures/Structures/ammunition_factory.webp";
                    img.onload = () => {
                        const w = img.width, h = img.height;
                        ctx.drawImage(img, 0, 24, w, h);
                    }
                }
            }

            if (event.deltaY > 0 && this.zoom > 0) {
                this.zoom--;
                this.center.x = -viewportPoint.x / 2;
                this.center.y = -viewportPoint.y / 2;
            }

            hexagon.setSize(this.size * 256);
            hexagon.drawHexagonMap();
        },
    }
});
