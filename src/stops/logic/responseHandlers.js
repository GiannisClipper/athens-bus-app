import { stopsParser, stopRoutesParser, stopArrivalsParser } from './parsers';

const stopsResponseHandler = ( namespace, response ) => {

    let { data, error } = response;

    if ( data ) {
        namespace.data = stopsParser( data );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.error = error;

    }
}

const stopRoutesResponseHandler = ( namespace, response ) => {

    let { data, error } = response;

    if ( data ) {
        namespace.data = stopRoutesParser( data );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.error = error;

    }
}

const stopArrivalsResponseHandler = ( namespace, response ) => {

    let { data, error } = response;

    if ( error ) {
        namespace.data = null;
        namespace.error = error;

    } else { 
        // data could be null (api returns null whenever there are no arrivals)
        // but handler replaces null to an empty array      
        namespace.data = stopArrivalsParser( data );
        namespace.error = null;

    }
}

export { stopsResponseHandler, stopRoutesResponseHandler, stopArrivalsResponseHandler };