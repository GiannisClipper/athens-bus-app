import React from 'react';
import { render } from '@testing-library/react-native';
import { StorageContext } from '../../src/_commons/StorageContext';
import { CacheContext } from '../../src/_commons/CacheContext';
import MyStops from '../../src/stops/MyStops';

describe( '<MyStops />', () => {

    const DATA = [
        { StopCode: '1', StopDescr: 'First stop descrption' },
        { StopCode: '2', StopDescr: 'Second stop descrption' },
    ];

    const mockStorageValue = {
        setMyStops: () => null,
    };

    const mockCacheValue = { 
        cache: { myStops: { data: DATA } },
        createMyStop: () => null,
        deleteMyStop: () => null,
    };

    const renderMyStops = () => render( 
        <StorageContext.Provider value={ mockStorageValue } >
        <CacheContext.Provider value={ mockCacheValue } >
            <MyStops />
        </CacheContext.Provider>
        </StorageContext.Provider>
    );

    test( 'render component with data', () => {        
        const { queryByTestId, queryAllByTestId } = renderMyStops();
        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( 2 );
    } );

    test( 'render component with no data', () => {        
        mockCacheValue.cache.myStops.data = [];
        const { queryByTestId, queryAllByTestId, queryByText } = renderMyStops();
        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( 0 );
        expect( queryByText( 'No favourite stops found.' ) ).not.toBeNull();
    } );

} );
