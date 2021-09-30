import React from 'react';
import { StorageContextProvider } from '../_commons/StorageContext';
import { SettingsContextProvider } from '../settings/SettingsContext';
import { LineGroupsContextProvider } from '../lines/LineGroupsContext';
import { LinesContextProvider } from '../lines/LinesContext';
import { RoutesContextProvider } from '../routes/RoutesContext';
import { StopsContextProvider } from '../stops/StopsContext';
import { MyContextProvider } from '../my/MyContext';
import AppNav from './AppNav';

const App = () => {

    return (
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
    );
};

export default App;
