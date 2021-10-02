import React, { useContext, useState, useEffect } from 'react';
import { StyledView } from '../_abstract/Styled';
import * as style from './style/app';
import { InfoMessage } from '../_commons/Messages';

import { AppContext } from './AppContext';
import { StorageContextProvider } from '../_commons/StorageContext';
import { SettingsContextProvider } from '../settings/SettingsContext';
import { LineGroupsContextProvider } from '../lines/LineGroupsContext';
import { LinesContextProvider } from '../lines/LinesContext';
import { RoutesContextProvider } from '../routes/RoutesContext';
import { StopsContextProvider } from '../stops/StopsContext';
import { MyContextProvider } from '../my/MyContext';

import AppNav from './AppNav';

const Container = StyledView( { style: style.container } );

const AppLoad = () => {

    const [ loadStatus, setLoadStatus ] = useState( { isNotLoaded: true } );
    // isNotLoaded, isLoading, isLoaded

    const appContext = useContext( AppContext );
    appContext.setLoadStatus = setLoadStatus;

    useEffect( () => {
        if ( loadStatus.isNotLoaded ) { 
            setLoadStatus( { isLoading: true } );
        }
    }, [ loadStatus ] );

    useEffect( () => console.log( 'Rendering App.' ) );

    return (
        <>
        { loadStatus.isLoading ?
            <Container>
                <InfoMessage>{ 'Loading...' }</InfoMessage>
            </Container>
        : null }

        { loadStatus.isLoading || loadStatus.isLoaded ?
            <StorageContextProvider>
                <SettingsContextProvider>
                    <LineGroupsContextProvider>
                    <LinesContextProvider>
                    <RoutesContextProvider>
                    <StopsContextProvider>
                        <MyContextProvider>
                            <AppNav />
                        </MyContextProvider>
                    </StopsContextProvider>
                    </RoutesContextProvider>
                    </LinesContextProvider>
                    </LineGroupsContextProvider>
                </SettingsContextProvider>
            </StorageContextProvider>
        : null }
        </>
    );
};

export default AppLoad;
