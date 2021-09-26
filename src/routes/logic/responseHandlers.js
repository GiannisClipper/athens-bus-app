import { routesParser, routeScheduleParser, routeMapParser, routeCoordsParser } from './parsers';

const routesResponseHandler = ( namespace, response, LineID ) => {

    let { data, error } = response;

    if ( data ) {
        namespace.data = routesParser( data, LineID );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.error = error;

    }
}

const routeScheduleResponseHandler = ( namespace, response, LineCode, RouteType ) => {

    let { data, error } = response;

    if ( data ) {
        namespace.data = routeScheduleParser( data, LineCode, RouteType );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.error = error;

    }
}

const routeMapResponseHandler = ( namespace, response ) => {

    let { data, error } = response;

    if ( data ) {
        namespace.data = routeCoordsParser( data );
        namespace.map = routeMapParser( namespace.data );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.map = null;
        namespace.error = error;

    }
}

export { routesResponseHandler, routeScheduleResponseHandler, routeMapResponseHandler };