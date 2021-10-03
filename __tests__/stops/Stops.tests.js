import React from 'react';
import { render } from '@testing-library/react-native';
import { RoutesContext } from '../../src/routes/RoutesContext';
import { StopsContext } from '../../src/stops/StopsContext';
import { routes, stops } from '../data';
import Stops from '../../src/stops/Stops';

const routeCode = Object.keys( routes )[ 0 ];
const { stopCodes } = routes[ routeCode ];

describe( '<Stops />', () => {

    const Render = ( { routes, stops, routeCode } ) => (
        <RoutesContext.Provider value={ { routes } } >
        <StopsContext.Provider value={ { stops } } >
            <Stops routeCode={ routeCode } /> 
        </StopsContext.Provider>
        </RoutesContext.Provider>
    );

    test( 'render component with data', () => {
        routes[ routeCode ].stopCodes = { ...stopCodes, error: null };

        const rendered = render( Render( { routes, stops, routeCode } ) );
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( stopCodes.data.length );
    } );

    test( 'render component with error', () => {        
        routes[ routeCode ].stopCodes = { ...stopCodes, data: null };

        const rendered = render( Render( { routes, stops, routeCode } ) );
        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'stops' ) ).not.toBeNull();
        expect( queryAllByTestId( 'stop-row' ).length ).toBe( 0 );
        expect( queryByText( stopCodes.error ) ).not.toBeNull();
    } );

} );
