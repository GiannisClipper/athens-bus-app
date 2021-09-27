const calcPointsFrame = points => {

    let [ minX, minY ] = points[ 0 ];
    let [ maxX, maxY ] = points[ 0 ];

    for ( let point of points ) {
        const [ x, y ] = point;
        minX = minX < x ? minX : x;
        minY = minY < y ? minY : y;
        maxX = maxX > x ? maxX : x;
        maxY = maxY > y ? maxY : y;
    }

    const leftTop = [ minX, minY ];
    const rightBottom = [ maxX, maxY ];

    return [ leftTop, rightBottom ];
}

export { calcPointsFrame };
