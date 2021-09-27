import { calcPointsFrame } from '../../_abstract/logic/calcPointsFrame';

const routeParser = row => ( {
    LineID: null,
    LineCode: row.LineCode,
    RouteCode: row.RouteCode,
    RouteDescr: row.RouteDescr,
    RouteType: row.RouteType,
    stops: {},
    schedule: {},
    coords: {
        map: null,
    },
} );

const routesParser = ( data, LineID ) => {
    data = data.map( row => ( { ...routeParser( row ), LineID } ) );
    data.sort( ( row1, row2 ) => row1.RouteType < row2.RouteType ? -1 : 1 );
    return data;
}

const routeScheduleParser = ( data, LineCode, RouteType ) => {

    const code = { '1': 'sdd_line1', '2': 'sdd_line2' }[ RouteType ];
    const time = { '1': 'sde_start1', '2': 'sde_start2' }[ RouteType ];

    let { come, go } = data;

    come = come.filter( row => row[ code ] === LineCode && typeof row[ time ] === 'string' );
    come = come.map( row => row[ time ] );

    go = go.filter( row => row[ code ] === LineCode && typeof row[ time ] === 'string' );
    go = go.map( row => row[ time ] );

    data = [];
    come.forEach( row => ! data.includes( row ) ? data.push( row ) : null );
    go.forEach( row => ! data.includes( row ) ? data.push( row ) : null );

    data.sort();
    data = data.map( row => row.substr( 11, 5 ) );

    return data;
}

const routeCoordParser = row => ( {
    latitude: parseFloat( row.routed_y ),
    longitude: parseFloat( row.routed_x ),
    order: parseInt( row.routed_order ),
} )

const routeCoordsParser = data => {
    data = data.map( row => routeCoordParser( row ) );
    data.sort( ( row1, row2 ) => row1.order < row2.order ? -1 : 1 );

    return data;
}

const routeMapParser = data => {

    const frame = calcPointsFrame( data.map( point => [ point.latitude, point.longitude ] ) );

    const [ left, top ] = frame[ 0 ];
    const [ right, bottom ] = frame[ 1 ];
    const width = right - left;
    const height = bottom - top;  

    const map = {
        latitude: left + width / 2,
        longitude: top + height / 2,
        latitudeDelta: width * 1.1,
        longitudeDelta: height * 1.1,
    };

    return map;
}

export { 
    routeParser, 
    routesParser, 
    routeScheduleParser, 
    routeCoordParser, 
    routeCoordsParser, 
    routeMapParser 
};
