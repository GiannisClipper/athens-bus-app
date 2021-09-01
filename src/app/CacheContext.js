import React, { createContext, useContext, useRef, useEffect } from 'react';
import { StorageContext } from './StorageContext';

const CacheContext = createContext();

const CacheContextProvider = props => {

    const { storage, getMyStops } = useContext( StorageContext );

    const cache = useRef( { lines: {}, myStops: {} } );

    function createMyStop( stop ) {
        cache.current.myStops.data.push( stop );
    }

    function deleteMyStop( stop ) {
        cache.current.myStops.data = cache.current.myStops.data.filter( myStop => myStop.StopCode !== stop.StopCode );
    }

    useEffect( async () => {
        if ( storage ) {
            cache.current.myStops.data = await getMyStops();
        }
    }, [ storage ] );

    // useEffect( () => console.log( 'CacheContext rendering.' ) );

    return (
        <CacheContext.Provider value={ { cache: cache.current, createMyStop, deleteMyStop } }>
            { props.children }
        </CacheContext.Provider>
    )
}

export { CacheContext, CacheContextProvider };