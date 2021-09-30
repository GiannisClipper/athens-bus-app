import { linesParser, lineGroupsParser } from './parsers';

const linesResponseHandler = ( { saveLineGroups, saveLines, response } ) => {

    const { data, error } = response;

    if ( data ) {
        saveLineGroups( {
            data: lineGroupsParser( data ),
            error: null,
        } );

        saveLines( linesParser( data ) );

    } else if ( error ) {
        saveLineGroups( {
            data: null,
            error: error,
        } );

        saveLines( {} );

    }
}

export { linesResponseHandler };
