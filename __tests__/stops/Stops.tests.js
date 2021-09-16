import React from 'react';
import { render } from '@testing-library/react-native';
import { StorageContext } from '../../src/_commons/StorageContext';
import { CacheContext } from '../../src/_commons/CacheContext';
import Stops from '../../src/stops/Stops';

describe('<Stops />', () => {

    const DATA = [
        { StopCode: '1', StopDescr: 'First stop descrption' },
        { StopCode: '2', StopDescr: 'Second stop descrption' },
    ];

    const ERROR = 'An error message...';

    const mockProps = {
        route: { 
            RouteCode: '1', 
            stops: {},
        }
    };

    const mockStorageValue = {
        setMyStops: () => null,
    };

    const mockCacheValue = { 
        cache: { myStops: { data: DATA } },
        createMyStop: () => null,
        deleteMyStop: () => null,
    };

    const renderStops = mockProps => render( 
        <StorageContext.Provider value={ mockStorageValue } >
        <CacheContext.Provider value={ mockCacheValue } >
            <Stops { ...mockProps } />
        </CacheContext.Provider>
        </StorageContext.Provider>
    );

    test( 'render component with data', () => {
        mockProps.route.stops = { data: DATA, error: null };
        const { queryByTestId, queryAllByTestId } = renderStops( mockProps );

        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( 2 );
    } );

    test( 'render component with error', () => {        
        mockProps.route.stops = { data: null, error: ERROR };
        const { queryByTestId, queryAllByTestId, queryByText } = renderStops( mockProps );

        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( 0 );
        expect( queryByText( ERROR ) ).not.toBeNull();
    } );
} );
