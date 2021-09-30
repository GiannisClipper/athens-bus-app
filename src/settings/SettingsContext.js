import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';
import { CACHE_REFRESH_TIME } from '../_commons/logic/constants';

const SettingsContext = createContext();

const SettingsContextProvider = props => {

    const { storage, setSettings, getSettings } = useContext( StorageContext );

    const initialState = {
        cacheTimestamp: null,
    };

    const [ state, setState ] = useState( initialState );

    const saveSettings = settings => {
        setSettings( settings );
        setState( settings );
    }

    const removeCache = async settings => {
        const items = await storage.getItems();
        const noCacheKeys = [ 'settings', 'myRoutes', 'myStops' ];
        const cacheKeys = Object.keys( items ).filter( key => ! noCacheKeys.includes( key ) );
        cacheKeys.forEach( async cacheKey => await storage.removeItem( cacheKey ) );

        settings.cacheTimestamp = Date.now();
        await setSettings( settings );

        return settings;
    }

    useEffect( async () => {
        if ( storage ) {
            let settings = await getSettings();

            if ( Date.now() > settings.cacheTimestamp + CACHE_REFRESH_TIME ) {
                console.log( 'removeCache' );
                settings = await removeCache( settings );
            }

            setState( settings );
        }
    }, [ storage ] );

    useEffect( () => console.log( 'SettingsContext rendering.' ) );

    return (
        <SettingsContext.Provider 
            value={ { 
                settings: state, 
                saveSettings,
            } }
        >
            { props.children }
        </SettingsContext.Provider>
    )
}

export { SettingsContext, SettingsContextProvider };