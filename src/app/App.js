import React from 'react';
import { StorageContextProvider } from '../commons/StorageContext';
import { CacheContextProvider } from '../commons/CacheContext';
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
