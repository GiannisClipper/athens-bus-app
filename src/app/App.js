import React from 'react';
import { StorageContextProvider } from '../_commons/StorageContext';
import { CacheContextProvider } from '../_commons/CacheContext';
import { MyContextProvider } from '../_commons/MyContext';
import AppNav from './AppNav';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <MyContextProvider>
                    <AppNav />
                </MyContextProvider>
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
