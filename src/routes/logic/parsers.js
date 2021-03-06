import { initialRegionParser } from '../../_commons/logic/parsers';

const routeParser = row => ( {
    LineID: row.LineID,
    LineCode: row.LineCode,
    RouteCode: row.RouteCode,
    RouteDescr: row.RouteDescr,
    RouteType: row.RouteType,
    stopCodes: { data: null, error: null },
    schedule: { data: null, error: null },
    map: { data: null, error: null },
} );

const routesParser = ( data, LineID ) => {
    data = LineID
        ? data.map( row => ( { ...routeParser( row ), LineID } ) )
        : data.map( row => ( { ...routeParser( row ) } ) );

    const routes = {};
    data.map( row => routes[ row.RouteCode ] = row );
    return routes;
}

const routeCodesParser = data => {
    data.sort( ( row1, row2 ) => row1.RouteType < row2.RouteType ? -1 : 1 );
    return data.map( route => route.RouteCode )
};

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

const _coordParser = row => ( {
    latitude: parseFloat( row.routed_y ),
    longitude: parseFloat( row.routed_x ),
    order: parseInt( row.routed_order ),
} );

const _coordsParser = data => {
    data = data.map( row => _coordParser( row ) );
    data.sort( ( row1, row2 ) => row1.order < row2.order ? -1 : 1 );

    return data;
}

const routeMapParser = data => {
    data = _coordsParser( data );
    const polyline = data;
    const initialRegion = initialRegionParser( data.map( point => [ point.latitude, point.longitude ] ) );

    return { polyline, initialRegion };
}

export { 
    routeParser, 
    routesParser, 
    routeCodesParser, 
    routeScheduleParser, 
    routeMapParser,
};
