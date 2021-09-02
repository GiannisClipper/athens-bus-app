import React from 'react';
import { StorageContextProvider } from '../_commons/StorageContext';
import { CacheContextProvider } from '../_commons/CacheContext';
import AppPages from './AppPages';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <AppPages />
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
