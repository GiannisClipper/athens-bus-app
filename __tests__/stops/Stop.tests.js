import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StorageContext } from '../../src/_commons/StorageContext';
import { CacheContext } from '../../src/_commons/CacheContext';
import Stop from '../../src/stops/Stop';
import { act } from 'react-test-renderer';

jest.mock( '../../src/_abstract/logic/useRequest', () => {
    const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
    return { __esModule: true, default: useRequest, useRequest };
} );

describe( '<Stop />', () => {

    const STOP = {
        StopCode: 'A code of a stop',
        StopDescr: 'A description of a stop',
        routes: {},
        arrivals: {},
    };

    const mockStorageValue = {
        setMyStops: () => null,
    };

    const mockCacheValue = { 
        cache: { myStops: { data: [] } },
        createMyStop: () => null,
        deleteMyStop: () => null,
    };

    const renderStop = () => render( 
        <StorageContext.Provider value={ mockStorageValue } >
        <CacheContext.Provider value={ mockCacheValue } >
            <Stop stop={ STOP } />
        </CacheContext.Provider>
        </StorageContext.Provider>
    );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = renderStop();
        expect( queryByTestId( 'stop-row' ) ).not.toBeNull();
        expect( queryByText( `${ STOP.StopDescr } (${ STOP.StopCode })` ) ).not.toBeNull();
    } );

    test( 'when is pressed should toggle Arrivals component', async () => {
        const { queryByTestId } = renderStop();;
        const row = queryByTestId( 'stop-row' );
        expect( row ).not.toBeNull();

        expect( queryByTestId( 'arrivals' ) ).toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'arrivals' ) ).not.toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'arrivals' ) ).toBeNull();
    } );

} );
