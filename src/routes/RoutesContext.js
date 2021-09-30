import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const RoutesContext = createContext();

const RoutesContextProvider = props => {

    const initialState = {};

    const [ state, setState ] = useState( initialState );

    const { storage, setRoutes, getRoutes } = useContext( StorageContext );

    const saveRoutes = routes => {
        setRoutes( routes );
        setState( routes );
    }

    useEffect( async () => {
        if ( storage ) {
            const routes = await getRoutes();
            setState( routes );
        }
    }, [ storage ] );

    // useEffect( () => console.log( 'RoutesContext rendering.' ) );

    return (
        <RoutesContext.Provider 
            value={ { 
                routes: state, 
                saveRoutes
            } }
        >
            { props.children }
        </RoutesContext.Provider>
    )
}

export { RoutesContext, RoutesContextProvider };