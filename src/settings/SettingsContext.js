import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';
import { CACHE_REFRESH_TIME } from '../_commons/logic/constants';

const SettingsContext = createContext();

const SettingsContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { clearStorageCache, setSettings, getSettings } = useContext( StorageContext );

    const saveSettings = settings => {
        setSettings( settings );
        setState( settings );
    }

    useEffect( async () => {
        const schema = { cacheTimestamp: 0 };
        let settings = await getSettings( schema );
        // remove cached data considering the specified refresh time
        if ( Date.now() > settings.cacheTimestamp + CACHE_REFRESH_TIME ) {
            await clearStorageCache();
            settings.cacheTimestamp = Date.now();
            await setSettings( settings );        
        }
        setState( settings );
    }, [] );

    useEffect( () => console.log( 'SettingsContext rendering.' ) );

    return (
        state ?
            <SettingsContext.Provider 
                value={ { 
                    settings: state, 
                    saveSettings,
                } }
            >
                { props.children }
            </SettingsContext.Provider>

        : null
    );
}

export { SettingsContext, SettingsContextProvider };