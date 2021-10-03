import React from 'react';
import { render } from '@testing-library/react-native';
import { RoutesContext } from '../../src/routes/RoutesContext';
import { routes } from '../data';
import Route, { routeRepr } from '../../src/routes/Route';

const routeCode = Object.keys( routes )[ 0 ];

// jest.mock( '../../src/_abstract/useRequest', () => {
//     const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
//     return { __esModule: true, default: useRequest, useRequest };
// } );

describe( '<Route />', () => {

    test( 'render component', () => {
        const rendered = render( 
            <RoutesContext.Provider value={ { routes } } >
                <Route routeCode={ routeCode } /> 
            </RoutesContext.Provider>
        );
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'route-row' ) ).not.toBeNull();
        expect( queryByText( routeRepr( routes[ routeCode ] ) ) ).not.toBeNull();
    } );

} );
