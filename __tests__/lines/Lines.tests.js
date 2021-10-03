import 'react-native';import React from 'react';
import { render } from '@testing-library/react-native';

import { LinesContext } from '../../src/lines/LinesContext';
import { lineGroups, lines } from '../data';

import Lines from '../../src/lines/Lines';

const { lineCodes } = lineGroups.data[ 0 ];

describe( '<Lines />', () => {

    let rendered;

    beforeEach( () => {
        rendered = render(
            <LinesContext.Provider value={ { lines } } >
                <Lines lineCodes={ lineCodes } /> 
            </LinesContext.Provider>
        );
    } );

    test( 'render component with data', () => {
        const { queryByTestId, queryAllByTestId } = rendered;

        const lines = queryByTestId( 'lines' );
        expect( lines ).not.toBeNull();

        const rows = queryAllByTestId( 'line-row' );
        expect( rows.length ).toBe( lineCodes.length );
    } );
} );
