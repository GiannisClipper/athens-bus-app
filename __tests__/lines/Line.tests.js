import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LinesContext } from '../../src/lines/LinesContext';
import { RoutesContext } from '../../src/routes/RoutesContext';
import Line from '../../src/lines/Line';
import * as colors from '../../src/_commons/style/colors';
import { act } from 'react-test-renderer';
import { lineGroups, lines, routes } from '../data';

const { lineCodes } = lineGroups.data[ 0 ];

// jest.mock( '../../src/_abstract/logic/useRequest', () => {
//     const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
//     return { __esModule: true, default: useRequest, useRequest };
// } );

describe( '<Line />', () => {

    const Render = ( { lines, routes, lineCode } ) => (
        <LinesContext.Provider value={ { lines } } >
        <RoutesContext.Provider value={ { routes } } >
            <Line lineCode={ lineCode } /> 
        </RoutesContext.Provider>
        </LinesContext.Provider>
    );

    test( 'render component', () => {
        const rendered = render( Render( { lines, routes, lineCode: lineCodes[ 0 ] } ) );
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'line-row' ) ).not.toBeNull();
        expect( queryByText( lines[ lineCodes[ 0 ] ].LineID ) ).not.toBeNull();
        expect( queryByText( lines[ lineCodes[ 0 ] ].LineDescr ) ).not.toBeNull();
    } );

    test( 'bus LineID should have something like blue background', () => {
        const rendered = render( Render( { lines, routes, lineCode: lineCodes[ 1 ] } ) );
        const { rerender, queryByTestId } = rendered;
        // rerender( Render( { lines, routes, lineCode: lineCodes[ 1 ] } ) );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( colors.bus );
    } );

    test( 'trolley LineID should have something like yellow background', () => {
        const rendered = render( Render( { lines, routes, lineCode: lineCodes[ 0 ] } ) );
        const { rerender, queryByTestId } = rendered;
        // rerender( Render( { lines, routes, lineCode: lineCodes[ 0 ] } ) );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( colors.trolley );
    } );

    test( 'when is pressed should toggle Routes component', async () => {
        const rendered = render( Render( { lines, routes, lineCode: lineCodes[ 0 ] } ) );
        const { queryByTestId } = rendered;

        const row = queryByTestId( 'line-row' );
        expect( row ).not.toBeNull();
        expect( queryByTestId( 'routes' ) ).toBeNull();

        act( () => fireEvent.press( row ) );
        expect( queryByTestId( 'routes' ) ).not.toBeNull();

        act( () => fireEvent.press( row ) );
        expect( queryByTestId( 'routes' ) ).toBeNull();
    } );

} );
