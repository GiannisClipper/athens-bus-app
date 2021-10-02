import { createUniquesArr } from '../../_abstract/logic/uniquesArr';
import { arrNotEqualAt } from '../../_abstract/logic/arrNotEqualAt';
import { routeParser } from '../../routes/logic/parsers';
import { initialRegionParser } from '../../_commons/logic/parsers';

const stopParser = row => ( {
    StopCode: row.StopCode,
    StopDescr: row.StopDescr,
    StopLat: parseFloat( row.StopLat ),
    StopLng: parseFloat( row.StopLng ),
    RouteStopOrder: parseInt( row.RouteStopOrder ),
    routeCodes: { data: null, error: null },
    arrivals: { data: null, error: null },
    map: { data: null, error: null },
} );

const stopsParser = data => {
    data = data.map( row => ( { ...stopParser( row ) } ) );
    const stops = {};
    data.map( row => stops[ row.StopCode ] = row );
    return stops;
}

const stopCodesParser = data => {
    return data.map( stop => stop.StopCode );
};

const stopRoutesParser = data => {

    data = data.filter( row => row.hidden === '0' );

    // avoid some duplicated entries included in api responses (distinguished only by MasterLineCode)
    const uniqueRoutes = createUniquesArr();
    data = data.filter( row => uniqueRoutes.push( row.RouteCode + row.RouteDescr ) );

    // group all line descriptions by route code
    const linesDescr = {};
    data.forEach( row => linesDescr[ row.LineCode ] = {} );
    data.forEach( row => linesDescr[ row.LineCode ][ row.RouteCode ] = row.LineDescr );
    // {     
    //     "1137": {  // LineCode:
    //         "2458": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)",  // RouteCode: LineDescr
    //         "2646": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)"
    //     }, 
    //     "1197": {
    //         "2644": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)",
    //         "2758": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)"
    //     }
    // }

    // remove the common part of the line descriptions per line code 
    // trying to extract more route details, but usually seems that not exists
    Object.keys( linesDescr ).forEach( lineCode => {
        const lineDescr = linesDescr[ lineCode ];
        let descriptions = [];

        Object.keys( lineDescr ).forEach( routeCode => {
            const descr = lineDescr[ routeCode ];
            descriptions.push( descr );
        } );

        descriptions = descriptions.map( descr => descr.split( ' ' ) );
        const position = arrNotEqualAt( descriptions );

        Object.keys( lineDescr ).forEach( routeCode => {
            let descr = lineDescr[ routeCode ];
            descr = descr.split( ' ' );
            descr.splice( 0, position );
            descr = descr.join( ' ' );
            lineDescr[ routeCode ] = descr;
        } );
    } );

    data = data.sort( ( row1, row2 ) => row1.LineID < row2.LineID ? -1 : 1 );

    data = data.map( row => ( { 
        ...routeParser( row ), 
        LineID: row.LineID, 
        LineDescr: linesDescr[ row.LineCode ][ row.RouteCode ],
    } ) );

    return data;
}

const stopRouteCodesParser = data => {
    return data.map( route => route.RouteCode )
};

const stopArrivalParser = row => ( {
    RouteCode: row.route_code,
    minutes: row.btime2,
} );

const stopArrivalsParser = data => 
    data ? data.map( row => stopArrivalParser( row ) ) : []; 
    // data could be null (api returns null whenever there are no arrivals)

const _closestStopParser = row => ( {
    StopCode: row.StopCode,
    StopDescr: row.StopDescr,
    StopLat: parseFloat( row.StopLat ),
    StopLng: parseFloat( row.StopLng ),
} );

const _closestStopsParser = data => data.map( row => _closestStopParser( row ) );
    
const stopMapParser = data => {
    data = _closestStopsParser( data );
    const closestStops = data;
    const initialRegion = initialRegionParser( data.map( point => [ point.StopLat, point.StopLng ] ) );

    return { closestStops, initialRegion };
}
    
export { 
    stopParser, stopsParser, stopCodesParser, 
    stopRoutesParser, stopRouteCodesParser, 
    stopArrivalParser, stopArrivalsParser,
    stopMapParser
};
