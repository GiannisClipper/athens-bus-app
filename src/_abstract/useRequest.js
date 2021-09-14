import { useEffect, useState } from 'react';

const fetch = require( 'node-fetch' );

const customFetch = uri => {

    return fetch( uri )

        .then( async res => {

            if ( ! res.ok ) { // res.ok is true when http status is between 200-299
                const txt = await res.text();
                throw { message: txt };
            }

            const obj = await res.json();
            return obj;
        } )

        .catch( err => { throw err } );
}

const useRequest = ( { fetchFunc, uri, store, normalize, refreshTime } ) => {

    fetchFunc = fetchFunc || customFetch;

    const [ status, setStatus ] = useState( {
        toRequest: Object.keys( store ).length === 0,
        hasData: store.data ? true : false,
        hasError: store.error ? true : false,
    } );

    useEffect( async () => {

        if ( status.toRequest ) {

            setStatus( { isRequesting: true } );

            normalize = normalize || ( data => data );

            fetchFunc( uri )
    
                .then( data => {
                    console.log( `Data (${ uri }): ` + JSON.stringify( data ) );
                    store.data = normalize( data );
                    store.error = null;
                    setStatus( { hasData: true } );
                } )
    
                .catch( error => {
                    console.log( `Error (${ uri }): ` + JSON.stringify( error ) );
                    store.data = null;
                    store.error = JSON.stringify( error );
                    setStatus( { hasError: true } );
                } )
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
export { customFetch, useRequest };