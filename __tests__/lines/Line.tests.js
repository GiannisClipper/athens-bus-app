import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Line from '../../src/lines/Line';
import { act } from 'react-test-renderer';

// to replace the process of actual useRequest with the following code:
jest.mock( '../../src/_abstract/useRequest', () => {
    const useRequest = jest.fn( () => ( { status: { isRequesting: true  } } ) );
    return {
        __esModule: true,
        default: useRequest,
        useRequest,
    };
} );

describe('<Line />', () => {

    const line = {
        LineID: 'The ID of the line',
        LineDescr: 'the description of the line',
        routes: {},
    }

    let rendered;

    beforeEach( () => {
        rendered = render( <Line line={ line } /> );
    } );

    test( 'render component', () => {
        const { queryByText } = rendered;

        const lineID = queryByText( line.LineID );
        expect( lineID ).not.toBeNull();

        const lineDescr = queryByText( line.LineDescr );
        expect( lineDescr ).not.toBeNull();
    } );

    test( 'bus LineID should have blue background', () => {
        const { rerender, queryByTestId } = rendered;

        line.LineID = '900';
        rerender( <Line line={ line } /> );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( 'blue' );
    } );

    test( 'trolley LineID should have yellow background', () => {
        const { rerender, queryByTestId } = rendered;

        line.LineID = '20';
        rerender( <Line line={ line } /> );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( 'yellow' );
    } );

    test( 'when is pressed should toggle Routes component', async () => {
        const { queryByTestId } = rendered;

        const row = queryByTestId( 'line-row' );
        expect( row ).not.toBeNull();

        let routes = queryByTestId( 'routes' );
        expect( routes ).toBeNull();

        act( () => fireEvent.press( row ) );

        routes = queryByTestId( 'routes' );
        expect( routes ).not.toBeNull();

        act( () => fireEvent.press( row ) );

        routes = queryByTestId( 'routes' );
        expect( routes ).toBeNull();
    } );

} );
