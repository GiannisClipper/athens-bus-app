import React, { createContext, useEffect } from 'react';
import useStorage from '../_abstract/logic/useStorage';

const StorageContext = createContext();

const StorageContextProvider = props => {

    const { storage, error } = useStorage();

    const _setItem = key =>
        async value => {
            await storage.setItem( key, JSON.stringify( value ) );
        }

    const _getItem = key =>
        async defaultValue => {
            const value = await storage.getItem( key );
            return ! value ? defaultValue : JSON.parse( value );
       }

    const setSettings = _setItem( 'settings' );
    const getSettings = _getItem( 'settings' );
   
    const setLineGroups = _setItem( 'lineGroups' );
    const getLineGroups = _getItem( 'lineGroups' );

    const setLines = _setItem( 'lines' );
    const getLines = _getItem( 'lines' );

    const setRoutes = _setItem( 'routes' );
    const getRoutes = _getItem( 'routes' );

    const setStops = _setItem( 'stops' );
    const getStops = _getItem( 'stops' );

    const setMyRoutes = _setItem( 'myRoutes' );
    const getMyRoutes = _getItem( 'myRoutes' );

    const setMyStops = _setItem( 'myStops' );
    const getMyStops = _getItem( 'myStops' );

    const noCacheKeys = [ 'settings', 'myRoutes', 'myStops' ];

    const clearStorageCache = async () => {
        const items = await storage.getItems();
        const cacheKeys = Object.keys( items ).filter( key => ! noCacheKeys.includes( key ) );
        cacheKeys.forEach( async cacheKey => await storage.removeItem( cacheKey ) );
    }

    const clearStorageAll = async () => {
        await storage.clear();
    }

    useEffect( () => console.log( 'StorageContext rendering.' ) );

    return (
        storage ?
            <StorageContext.Provider 
                value={ { 
                    storage, error,
                    setSettings, getSettings,
                    setLineGroups, getLineGroups,
                    setLines, getLines,
                    setRoutes, getRoutes,
                    setStops, getStops, 
                    setMyRoutes, getMyRoutes,
                    setMyStops, getMyStops,
                    clearStorageCache, clearStorageAll,
                } }
            >
                { props.children }
            </StorageContext.Provider>

        : error ?
            <Text>{ error }</Text>

        : null
    );
}

export { StorageContext, StorageContextProvider };