import React from 'react';
import { render } from '@testing-library/react-native';
import { RoutesContext } from '../../src/routes/RoutesContext';
import { StopsContext } from '../../src/stops/StopsContext';
import { routes, stops } from '../data';
import StopArrivals from '../../src/stops/StopArrivals';

const mockNavigation = { addListener: () => null };

const stopCode = Object.keys( stops )[ 0 ];
const { arrivals } = stops[ stopCode ];

// jest.mock( 'navigation.addListener', () => {
//     const addListener = jest.fn( () => ( { status: { isRequesting: true } } ) );
//     return { __esModule: true, default: useRequest, useRequest };
// } );

describe( '<StopArrivals />', () => {

    const Render = ( { routes, stops, stopCode } ) => ( 
        <RoutesContext.Provider value={ { routes } } >
        <StopsContext.Provider value={ { stops } } >
            <StopArrivals 
                navigation={ mockNavigation }
                stopCode={ stopCode } 
            /> 
        </StopsContext.Provider>
        </RoutesContext.Provider>
    );

    test( 'render component with data', () => {
        stops[ stopCode ].arrivals = { ...arrivals, error: null };
        const rendered = render( Render( { routes, stops, stopCode } ) );
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'stopArrivals' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stopArrival-row' ).length ).toBe( arrivals.data.length );
    } );

    test( 'render component with no arrivals', () => {
        stops[ stopCode ].arrivals = { ...arrivals, data: [], error: null };
        const rendered = render( Render( { routes, stops, stopCode } ) );
        const { queryByTestId, queryAllByTestId, queryAllByText } = rendered;

        expect( queryByTestId( 'stopArrivals' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stopArrival-row' ).length ).toBe( 0 );
        expect( queryAllByText( 'No arrivals found.' ) ).not.toBeNull();
    } );

    test( 'render component with error', () => {   
        stops[ stopCode ].arrivals = { ...arrivals, data: null };
        const rendered = render( Render( { routes, stops, stopCode } ) );
        const { queryByTestId, queryAllByTestId, queryAllByText } = rendered;

        expect( queryByTestId( 'stopArrivals' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stopArrival-row' ).length ).toBe( 0 );
        expect( queryAllByText( arrivals.error ).length ).not.toBe( 0 );
    } );

} );
