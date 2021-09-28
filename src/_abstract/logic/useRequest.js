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
            throw `REQUEST ERROR: ${ txt }`;

        } )

        .catch( err => {
            throw `REQUEST ERROR: ${ err }`;
        } );
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

    return { status, setStatus };
}

const initRequestStatus = namespace =>
    namespace.data ? { hasData: true } :
    namespace.error ? { hasError: true } :
    { toRequest: true }

export default useRequest;
export { customFetch, useRequest, initRequestStatus };