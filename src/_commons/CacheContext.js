import React, { createContext, useRef } from 'react';

const CacheContext = createContext();

const CacheContextProvider = props => {

    const cache = useRef( { 
        lines: {}, 
    } );

    // useEffect( () => console.log( 'CacheContext rendering.' ) );

    return (
        <CacheContext.Provider value={ { cache: cache.current } }>
            { props.children }
        </CacheContext.Provider>
    )
}

export { CacheContext, CacheContextProvider };