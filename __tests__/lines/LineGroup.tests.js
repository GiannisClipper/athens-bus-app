import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LineGroup from '../../src/lines/LineGroup';
import { act } from 'react-test-renderer';

describe('<LineGroup />', () => {

    const LINES = { data: [] };
    const GROUP = '0';

    let rendered;

    beforeEach( () => {
        rendered = render( <LineGroup lines={ LINES } group={ GROUP } /> );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = rendered;

        const row = queryByTestId( 'group-row' );
        expect( row ).not.toBeNull();

        expect( queryByText( GROUP ) ).not.toBeNull();
    } );

    test( 'when is pressed should toggle Lines component', async () => {
        const { queryByTestId } = rendered;

        const row = queryByTestId( 'group-row' );
        expect( row ).not.toBeNull();

        expect( queryByTestId( 'lines' ) ).toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'lines' ) ).not.toBeNull();

        act( () => fireEvent.press( row ) );

        expect( queryByTestId( 'lines' ) ).toBeNull();
    } );

} );
