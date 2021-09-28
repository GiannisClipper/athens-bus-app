import { useEffect, useState, useRef } from 'react';

const useInterval = ( { action, duration } ) => {

    const intervalRef = useRef( null );

    useEffect( () => {

        if ( intervalRef.current ) { // clear a previous setup if exists 
            clearInterval( intervalRef.current );
            intervalRef.current = null;
        }

        if ( duration ) { // setup the interval process
            intervalRef.current = setInterval( () => action(), duration );
            return () => clearInterval( intervalRef.current );
        }
    
    }, [ duration ] );

    return intervalRef.current;
}

export default useInterval;