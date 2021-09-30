import { 
    stopsParser, stopCodesParser, stopRoutesParser, stopRouteCodesParser, stopArrivalsParser 
} from './parsers';

import { routesParser } from '../../routes/logic/parsers';


const stopsResponseHandler = ( { 
    routes, routeCode, saveRoutes, stops, saveStops, response 
} ) => {

    let { data, error } = response;

    if ( data ) {
        const route = routes[ routeCode ];
        route.stopCodes.data = stopCodesParser( data );
        route.stopCodes.error = null;
        saveRoutes( { ...routes, [ routeCode ]: route } );

        data = stopsParser( data );
        saveStops( { ...data, ...stops } );

    } else if ( error ) {
        const route = routes[ routeCode ];
        route.stopCodes.data = null;
        route.stopCodes.error = error;
        saveRoutes( { ...routes, [ routeCode ]: route } );

    }
}

const stopRoutesResponseHandler = ( { 
    stops, stopCode, saveStops, routes, saveRoutes, response 
} ) => {

    let { data, error } = response;

    if ( data ) {
        data = stopRoutesParser( data );

        const stop = stops[ stopCode ];
        stop.routeCodes.data = stopRouteCodesParser( data );
        stop.routeCodes.error = null;
        saveStops( { ...stops, [ stopCode ]: stop } );

        saveRoutes( { ...routesParser( data ), ...routes } );

    } else if ( error ) {
        const stop = stops[ stopCode ];
        stop.routeCodes.data = null;
        stop.routeCodes.error = error;
        saveStops( { ...stops, [ stopCode ]: stop } );

    }
}


const stopArrivalsResponseHandler = ( {
    stops, stopCode, saveStops, response 
} ) => {

    let { data, error } = response;

    if ( error ) {
        const stop = stops[ stopCode ];
        stop.arrivals.data = null;
        stop.arrivals.error = error;
        saveStops( { ...stops, [ stopCode ]: stop } );

    } else { 
        // data could be null (api returns null whenever there are no arrivals)
        // but handler replaces null to an empty array
        const stop = stops[ stopCode ];
        stop.arrivals.data = stopArrivalsParser( data );
        stop.arrivals.error = null;
        saveStops( { ...stops, [ stopCode ]: stop } );

    }
}


export { 
    stopsResponseHandler, stopRoutesResponseHandler, stopArrivalsResponseHandler 
};