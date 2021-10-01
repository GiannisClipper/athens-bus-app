import React, { useState, useEffect } from 'react';
import { StyledView } from '../_abstract/Styled';
import * as style from './style/app';
import { InfoMessage } from '../_commons/Messages';

import { AppContextProvider } from './AppContext';
import { StorageContextProvider } from '../_commons/StorageContext';
import { SettingsContextProvider } from '../settings/SettingsContext';
import { LineGroupsContextProvider } from '../lines/LineGroupsContext';
import { LinesContextProvider } from '../lines/LinesContext';
import { RoutesContextProvider } from '../routes/RoutesContext';
import { StopsContextProvider } from '../stops/StopsContext';
import { MyContextProvider } from '../my/MyContext';

import AppNav from './AppNav';

const Container = StyledView( { style: style.container } );

const App = () => {

    const [ status, setStatus ] = useState( { isNotLoaded: true } );
    // isNotLoaded, isLoading, isLoaded

    useEffect( () => status.isNotLoaded ? setStatus( { isLoading: true } ) : null );

    useEffect( () => console.log( 'Rendering App.' ) );

    return (
        <>
        { status.isLoading ?
            <Container>
                <InfoMessage>{ 'Loading...' }</InfoMessage>
            </Container>
        : null }

        { status.isLoading || status.isLoaded ?
            <AppContextProvider>
            <StorageContextProvider>
                <SettingsContextProvider>
                    <LineGroupsContextProvider>
                    <LinesContextProvider>
                    <RoutesContextProvider>
                    <StopsContextProvider>
                        <MyContextProvider>
                            <AppNav setAppStatus={ setStatus } />
                        </MyContextProvider>
                    </StopsContextProvider>
                    </RoutesContextProvider>
                    </LinesContextProvider>
                    </LineGroupsContextProvider>
                </SettingsContextProvider>
            </StorageContextProvider>
            </AppContextProvider>
        : null }
        </>
    );
};

export default App;
