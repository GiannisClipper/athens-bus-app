import React from 'react';
import { StorageContextProvider } from '../_commons/StorageContext';
import { CacheContextProvider } from '../_commons/CacheContext';
import AppNav from './AppNav';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <AppNav />
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
