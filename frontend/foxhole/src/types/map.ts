export type Point = {
    x: number,
    y: number,
};

export type Viewport = {
    start: Point,
    end: Point,
};

export type PointRange = {
    x: Array<number>,
    y: Array<number>,
}

export type State = {
    zoom: number,
    maxZoom: number,

    width: number,
    height: number,

    drag: boolean,

    center: Point,
    startPosition: Point,
};
