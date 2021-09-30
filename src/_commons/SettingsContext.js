import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const CACHE_DURATION = 60000; // milliseconds

const SettingsContext = createContext();

const SettingsContextProvider = props => {

    const { storage, setSettings, getSettings } = useContext( StorageContext );

    const initialState = {
        cacheTimestamp: null,
    };

    const [ state, setState ] = useState( initialState );

    const saveSettings = settings => {
        const newSettings = { ...state, ...settings };
        setSettings( newSettings );
        setState( newSettings );
    }

    const isCacheValid = () => {
        const result = ( state.cacheTimestamp + CACHE_DURATION ) > Date.now();
        return result;
    }

    useEffect( async () => {
        if ( storage ) {
            const settings = await getSettings();
            console.log( 'settings', settings.cacheTimestamp, Date.now() - settings.cacheTimestamp )
            setState( settings );
        }
    }, [ storage ] );

    // useEffect( () => console.log( 'SettingsContext rendering.' ) );

    return (
        <SettingsContext.Provider 
            value={ { 
                settings: state, 
                saveSettings,
                isCacheValid 
            } }
        >
            { props.children }
        </SettingsContext.Provider>
    )
}

export { SettingsContext, SettingsContextProvider };