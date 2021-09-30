import { 
    routesParser, routeCodesParser, routeScheduleParser, routeMapParser 
} from './parsers';


const routesResponseHandler = ( { 
    lines, lineCode, saveLines, routes, saveRoutes, response 
} ) => {

    let { data, error } = response;

    if ( data ) {
        const line = lines[ lineCode ];
        line.routeCodes.data = routeCodesParser( data );
        line.routeCodes.error = null;
        saveLines( { ...lines, [ lineCode ]: line } );

        data = routesParser( data, line.LineID );
        saveRoutes( { ...data, ...routes } );

    } else if ( error ) {
        const line = lines[ lineCode ];
        line.routeCodes.data = null;
        line.routeCodes.error = error;
        saveLines( { ...lines, [ lineCode ]: line } );

    }
}


const routeScheduleResponseHandler = ( { 
    routes, routeCode, saveRoutes, response, LineCode, RouteType 
} ) => {

    let { data, error } = response;

    if ( data ) {
        const route = routes[ routeCode ];
        route.schedule.data = routeScheduleParser( data, LineCode, RouteType );
        route.schedule.error = null;
        saveRoutes( { ...routes, [ route.RouteCode ]: route } );

    } else if ( error ) {
        const route = routes[ routeCode ];
        route.schedule.data = null;
        route.schedule.error = error;
        saveRoutes( { ...routes, [ route.RouteCode ]: route } );

    }
}


const routeMapResponseHandler = ( { 
    routes, routeCode, saveRoutes, response 
} ) => {

    let { data, error } = response;

    if ( data ) {
        const route = routes[ routeCode ];
        route.map.data = routeMapParser( data );
        route.map.error = null;
        saveRoutes( { ...routes, [ route.RouteCode ]: route } );

    } else if ( error ) {
        const route = routes[ routeCode ];
        route.map.data = null;
        route.map.error = error;
        saveRoutes( { ...routes, [ route.RouteCode ]: route } );

    }
}


export { 
    routesResponseHandler, routeScheduleResponseHandler, routeMapResponseHandler 
};