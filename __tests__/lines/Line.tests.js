import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LinesContext } from '../../src/lines/LinesContext';
import { RoutesContext } from '../../src/routes/RoutesContext';
import Line from '../../src/lines/Line';
import { act } from 'react-test-renderer';
import { lineGroups, lines, routes } from '../data';

const { lineCodes } = lineGroups.data[ 0 ];

// jest.mock( '../../src/_abstract/logic/useRequest', () => {
//     const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
//     return { __esModule: true, default: useRequest, useRequest };
// } );

describe( '<Line />', () => {

    let rendered;

    beforeEach( () => {
        rendered = render(
            <LinesContext.Provider value={ { lines } } >
                <RoutesContext.Provider value={ { routes } } >
                    <Line lineCode={ lineCodes[ 0 ] } /> 
                </RoutesContext.Provider>
            </LinesContext.Provider>
        );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'line-row' ) ).not.toBeNull();
        expect( queryByText( lines[ lineCodes[ 0 ] ].LineID ) ).not.toBeNull();
        expect( queryByText( lines[ lineCodes[ 0 ] ].LineDescr ) ).not.toBeNull();
    } );

    test( 'bus LineID should have blue background', () => {
        const { rerender, queryByTestId } = rendered;

        rerender( 
            <LinesContext.Provider value={ { lines } } >
                <RoutesContext.Provider value={ { routes } } >
                    <Line lineCode={ lineCodes[ 1 ] } /> 
                </RoutesContext.Provider>
            </LinesContext.Provider>
        );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( 'blue' );
    } );

    test( 'trolley LineID should have yellow background', () => {
        const { rerender, queryByTestId } = rendered;

        rerender( 
            <LinesContext.Provider value={ { lines } } >
                <RoutesContext.Provider value={ { routes } } >
                    <Line lineCode={ lineCodes[ 0 ] } /> 
                </RoutesContext.Provider>
            </LinesContext.Provider>
        );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( 'yellow' );
    } );

    test( 'when is pressed should toggle Routes component', async () => {
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
