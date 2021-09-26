import { linesParser, lineGroupsParser } from './parsers';

const linesResponseHandler = ( namespace, response ) => {

    const { data, error } = response;

    if ( data ) {
        namespace.data = linesParser( data );
        namespace.groups = lineGroupsParser( data );
        namespace.error = null;

    } else if ( error ) {
        namespace.data = null;
        namespace.groups = null;
        namespace.error = error;

    }
}

export { linesResponseHandler };
