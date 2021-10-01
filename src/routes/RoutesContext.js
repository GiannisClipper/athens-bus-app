import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const RoutesContext = createContext();

const RoutesContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { setRoutes, getRoutes } = useContext( StorageContext );

    const saveRoutes = routes => {
        setRoutes( routes );
        setState( routes );
    }

    useEffect( async () => {
        const schema = {};
        const routes = await getRoutes( schema );
        setState( routes );
    }, [] );

    useEffect( () => console.log( 'RoutesContext rendering.' ) );

    return (
        state ?
            <RoutesContext.Provider 
                value={ { 
                    routes: state, 
                    saveRoutes
                } }
            >
                { props.children }
            </RoutesContext.Provider>

        : null
    )
}

export { RoutesContext, RoutesContextProvider };