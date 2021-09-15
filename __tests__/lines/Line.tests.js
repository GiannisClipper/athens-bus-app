import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Line from '../../src/lines/Line';
import { act } from 'react-test-renderer';

jest.mock( '../../src/_abstract/useRequest', () => {
    const useRequest = jest.fn( () => ( { status: { isRequesting: true } } ) );
    return { __esModule: true, default: useRequest, useRequest };
} );

describe('<Line />', () => {

    const LINE = {
        LineID: 'An ID of a line',
        LineDescr: 'A description of a line',
        routes: {},
    }

    let rendered;

    beforeEach( () => {
        rendered = render( <Line line={ LINE } /> );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'line-row' ) ).not.toBeNull();
        expect( queryByText( LINE.LineID ) ).not.toBeNull();
        expect( queryByText( LINE.LineDescr ) ).not.toBeNull();
    } );

    test( 'bus LineID should have blue background', () => {
        const { rerender, queryByTestId } = rendered;

        LINE.LineID = '900';
        rerender( <Line line={ LINE } /> );

        const icon = queryByTestId( 'line-icon' );
        expect( icon ).not.toBeNull();
        expect( icon.props.style.backgroundColor ).toBe( 'blue' );
    } );

    test( 'trolley LineID should have yellow background', () => {
        const { rerender, queryByTestId } = rendered;

        LINE.LineID = '20';
        rerender( <Line line={ LINE } /> );

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
