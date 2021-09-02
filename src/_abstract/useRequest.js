import { useEffect, useState } from 'react';

const request = async ( { uri, onSuccess, onError } ) => {

    // alert( 'Request data from API!' )

    try {
        const response = await fetch( uri );
    
        if ( response.ok ) { // if HTTP-status is 200-299
            const data = await response.json();
            console.log( `Data (${ uri }): ` + JSON.stringify( data ) );
            onSuccess( data );

        } else {
            const error = await response.json();
            console.log( `Error (${ uri }): ` + JSON.stringify( error ) );
            onError( error );
        }

    } catch( error ) {
        console.log( `Error (${ uri }): ` + JSON.stringify( error ) );
        onError( error );
    }

}

const useRequest = ( { uri, store, normalize, refreshTime } ) => {

    const [ status, setStatus ] = useState( {
        toRequest: Object.keys( store ).length === 0,
        hasData: store.data ? true : false,
        hasError: store.error ? true : false,
    } );

    // console.log( 'status, store', status, store )

    useEffect( async () => {

        if ( status.toRequest ) {

            setStatus( { isRequesting: true } );

            normalize = normalize || ( data => data );

            await request( {
                uri,

                onSuccess: data => {
                    store.data = normalize( data );
                    store.error = null;
                    setStatus( { hasData: true } );
                },

                onError: error => {
                    store.data = null;
                    store.error = JSON.stringify( error );
                    setStatus( { hasError: true } );
                }
            } );
        }

    } );

    useEffect( () => {
        if ( refreshTime ) {  // milliseconds
            // console.log( 'refresh request' )
            const intervalID = setInterval( () => setStatus( { toRequest: true } ), refreshTime );
            return () => clearInterval( intervalID );
        }
    }, [] );

    return { status };
}

export default useRequest;