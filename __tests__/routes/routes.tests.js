import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import { LinesContext } from '../../src/lines/LinesContext';
import { RoutesContext } from '../../src/routes/RoutesContext';
import { lines, routes } from '../data';
import Routes from '../../src/routes/Routes';

const lineCode = Object.keys( lines )[ 0 ];
const { routeCodes } = lines[ lineCode ];

describe( '<Routes />', () => {

    const Render = ( { lines, routes, lineCode } ) => (
        <LinesContext.Provider value={ { lines } } >
        <RoutesContext.Provider value={ { routes } } >
            <Routes lineCode={ lineCode } /> 
        </RoutesContext.Provider>
        </LinesContext.Provider>
    );

    test( 'render component with data', () => {
        lines[ lineCode ].routeCodes = { ...routeCodes, error: null };

        const rendered = render( Render( { lines, routes, lineCode } ) );
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'routes' ) ).not.toBeNull();
        expect( queryAllByTestId( 'route-row' ).length ).toBe( routeCodes.data.length );
    } );

    test( 'render component with error', () => {        
        lines[ lineCode ].routeCodes = { ...routeCodes, data: null };

        const rendered = render( Render( { lines, routes, lineCode } ) );
        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'routes' ) ).not.toBeNull();
        expect( queryAllByTestId( 'route-row' ).length ).toBe( 0 );
        expect( queryByText( routeCodes.error ) ).not.toBeNull();
    } );
} );
