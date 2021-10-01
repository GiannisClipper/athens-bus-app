import React, { useState, useEffect } from 'react';
import { StyledView } from '../_abstract/Styled';
import * as style from './style/app';
import { InfoMessage } from '../_commons/Messages';

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

    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( () => console.log( 'Rendering App.' ) );

    return (
        <>
        { isLoading ?
            <Container>
                <InfoMessage>{ 'Loading...' }</InfoMessage>
            </Container>
        : null }

        <StorageContextProvider>
            <SettingsContextProvider>
                <LineGroupsContextProvider>
                <LinesContextProvider>
                <RoutesContextProvider>
                <StopsContextProvider>
                    <MyContextProvider>
                        <AppNav setIsLoading={ setIsLoading } />
                    </MyContextProvider>
                </StopsContextProvider>
                </RoutesContextProvider>
                </LinesContextProvider>
                </LineGroupsContextProvider>
            </SettingsContextProvider>
        </StorageContextProvider>
        </>
    );
};

export default App;
