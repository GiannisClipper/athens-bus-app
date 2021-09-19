import React from 'react';
import { StorageContextProvider } from '../_commons/StorageContext';
import { CacheContextProvider } from '../_commons/CacheContext';
import AppDrawerNav from './AppDrawerNav';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <AppDrawerNav />
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
