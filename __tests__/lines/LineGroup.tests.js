import 'react-native';import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LinesContext } from '../../src/lines/LinesContext';
import LineGroup from '../../src/lines/LineGroup';
import { act } from 'react-test-renderer';
import { lineGroups, lines } from '../data';

describe( '<LineGroup />', () => {

    let rendered, lineGroup;

    beforeEach( () => {
        lineGroup = lineGroups.data[ 0 ];
        rendered = render(
            <LinesContext.Provider value={ { lines } } >
                <LineGroup lineGroup={ lineGroup } /> 
            </LinesContext.Provider>
        );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryByText } = rendered;

        const row = queryByTestId( 'group-row' );
        expect( row ).not.toBeNull();

        expect( queryByText( lineGroup.lineGroup ) ).not.toBeNull();
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
