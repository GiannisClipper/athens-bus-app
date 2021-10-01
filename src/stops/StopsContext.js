import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const StopsContext = createContext();

const StopsContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { setStops, getStops } = useContext( StorageContext );

    const saveStops = stops => {
        const newStops = { ...state, ...stops };
        setStops( newStops );
        setState( newStops );
    }

    useEffect( async () => {
        const schema = {};
        const stops = await getStops( schema );
        setState( stops );
    }, [] );

    useEffect( () => console.log( 'StopsContext rendering.' ) );

    return (
        state ?
            <StopsContext.Provider 
                value={ { 
                    stops: state, 
                    saveStops
                } }
            >
                { props.children }
            </StopsContext.Provider>

        : null
    )
}

export { StopsContext, StopsContextProvider };