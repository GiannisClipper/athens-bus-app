import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Route from '../../src/routes/Route';
import { act } from 'react-test-renderer';

jest.mock( '../../src/_abstract/useRequest', () => {
    const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
    return { __esModule: true, default: useRequest, useRequest };
} );

describe( '<Route />', () => {

    const ROUTE = {
        RouteDescr: 'A description of a route',
        stops: {},
    };

    let rendered;

    beforeEach( () => {
        rendered = render( <Route route={ ROUTE } /> );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'route-row' ) ).not.toBeNull();
        expect( queryByText( ROUTE.RouteDescr ) ).not.toBeNull();
    } );

    test( 'when is pressed should toggle Stops component', async () => {
        const { queryByTestId } = rendered;

        const row = queryByTestId( 'route-row' );
        expect( row ).not.toBeNull();

        expect( queryByTestId( 'stops' ) ).toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'stops' ) ).not.toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'stops' ) ).toBeNull();
    } );

} );
