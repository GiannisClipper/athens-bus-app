import { useEffect, useState, useRef } from 'react';

const fetch = require( 'node-fetch' );

const customFetch = uri => {

    return fetch( uri )

        .then( async res => {

            if ( res.ok ) { // res.ok is true when http status is between 200-299
                const obj = await res.json();
                return obj;
            }

            const txt = await res.text();
            throw { message: `REQUEST ERROR: ${ txt }` };

        } )

        .catch( err => { throw err } );
}

const useRequest = ( { fetchFunc, uri, requestStatus, responseHandler, refreshTime } ) => {

    fetchFunc = fetchFunc || customFetch;

    const [ status, setStatus ] = useState( requestStatus );

    useEffect( async () => {

        if ( status.toRequest ) {

            setStatus( { isRequesting: true } );

            fetchFunc( uri )
    
                .then( data => {
                    console.log( `Data (${ uri }): ` + JSON.stringify( data ) );
                    responseHandler( { data } );
                    setStatus( { hasData: true } );
                } )
    
                .catch( error => {
                    console.log( `Error (${ uri }): ` + JSON.stringify( error ) );
                    responseHandler( { error: JSON.stringify( error ) } );
                    setStatus( { hasError: true } );
                } )
        }

    } );

    const intervalRef = useRef( { id: null, hasCleared: false } );

    useEffect( () => {
        const interval = intervalRef.current;

        if ( interval.id ) { 
            // to clear a previous setup if exists 
            clearInterval( interval.id );
            interval.id = null;
            interval.hasCleared = true;
        }

        if ( refreshTime && interval.hasCleared ) { 
            // to perform instant request prior to a new setup
            setStatus( { toRequest: true } );
            interval.hasCleared = false;
        }

        if ( refreshTime ) { 
            // to setup the interval process
            interval.id = setInterval( () => setStatus( { toRequest: true } ), refreshTime );
            return () => clearInterval( interval.id );
        }
    
    }, [ refreshTime ] );

    return { status };
}

const initRequestStatus = namespace =>
    namespace.data ? { hasData: true } :
    namespace.error ? { hasError: true } :
    { toRequest: true }

export default useRequest;
export { customFetch, useRequest, initRequestStatus };