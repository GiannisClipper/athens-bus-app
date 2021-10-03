import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { lines } from '../data';
import LineSearch from '../../src/lines/LineSearch';

const SEARCH_ICON = ' ? ';
const SEARCH_PLACEHOLDER ='to search...';
const SEARCH_TEXT = 'a string to search';

describe( '<LineSearch />', () => {

    let rendered;

    beforeEach( () => {
        rendered = render( <LineSearch lines={ lines } /> );
    } );

    test( 'render component', () => {
        const { queryByText, queryByPlaceholderText } = rendered;

        const icon = queryByText( SEARCH_ICON );
        expect( icon ).not.toBeNull();

        const input = queryByPlaceholderText( SEARCH_PLACEHOLDER );
        expect( input ).not.toBeNull();
    } );

    test( 'when is pressed should toggle Lines component', async () => {
        const { queryByTestId } = rendered;

        const row = queryByTestId( 'search-row' );
        expect( row ).not.toBeNull();

        let lines = queryByTestId( 'lines' );
        expect( lines ).toBeNull();

        act( () => fireEvent.press( row ) );

        lines = queryByTestId( 'lines' );
        expect( lines ).not.toBeNull();

        act( () => fireEvent.press( row ) );

        lines = queryByTestId( 'lines' );
        expect( lines ).toBeNull();
    } );

    test( 'change input value', () => {
        const { queryByPlaceholderText, queryByDisplayValue } = rendered;

        const input = queryByPlaceholderText( SEARCH_PLACEHOLDER );
        expect( input ).not.toBeNull();

        act( () => fireEvent.changeText( input, SEARCH_TEXT ) );

        expect( queryByDisplayValue( SEARCH_TEXT ) ).not.toBeNull();
        // or alternatively:
        expect( input.props.value ).toBe( SEARCH_TEXT );
    } );

} );
