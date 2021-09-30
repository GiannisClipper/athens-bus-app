import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const StopsContext = createContext();

const StopsContextProvider = props => {

    const initialState = {};

    const [ state, setState ] = useState( initialState );

    const { storage, setStops, getStops } = useContext( StorageContext );

    const saveStops = stops => {
        const newStops = { ...state, ...stops };
        setStops( newStops );
        setState( newStops );
    }

    useEffect( async () => {
        if ( storage ) {
            const stops = await getStops();
            setState( stops );
        }
    }, [ storage ] );

    // useEffect( () => console.log( 'StopsContext rendering.' ) );

    return (
        <StopsContext.Provider 
            value={ { 
                stops: state, 
                saveStops
            } }
        >
            { props.children }
        </StopsContext.Provider>
    )
}

export { StopsContext, StopsContextProvider };