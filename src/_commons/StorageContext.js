import React, { createContext, useRef, useEffect } from 'react';
import useStorage from '../_abstract/logic/useStorage';

const StorageContext = createContext();

const StorageContextProvider = props => {

    const { storage, error } = useStorage();

    const _setItem = key =>
        async value => {
            await storage.setItem( key, JSON.stringify( value ) );
        }

    const _getItem = ( key, defaultValue ) =>
        async () => {
            const value = await storage.getItem( key );
            return ! value ? defaultValue : JSON.parse( value );
       }

    const setMyStops = _setItem( 'myStops' );
    const getMyStops = _getItem( 'myStops', [] );

    const setMyRoutes = _setItem( 'myRoutes' );
    const getMyRoutes = _getItem( 'myRoutes', [] );

    // useEffect( () => console.log( 'StorageContext rendering.' ) );

    return (
        <StorageContext.Provider 
            value={ { storage, error, setMyStops, getMyStops, setMyRoutes, getMyRoutes } }
        >
            { props.children }
        </StorageContext.Provider>
    )
}

export { StorageContext, StorageContextProvider };