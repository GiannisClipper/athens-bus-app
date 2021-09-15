import 'react-native';import React from 'react';
import { render } from '@testing-library/react-native';
import Lines from '../../src/lines/Lines';

describe('<Lines />', () => {

    const LINES = {
        data: [
            { LineID: '1', LineDescr: 'First' },
            { LineID: '2', LineDescr: 'Second' }
        ],
    };

    const IS_MATCH = () => true;

    let rendered;

    beforeEach( () => {
        rendered = render( <Lines lines={ LINES } isMatch={ IS_MATCH }/> );
    } );

    test( 'render component with data', () => {
        const { queryByTestId, queryAllByTestId } = rendered;

        const lines = queryByTestId( 'lines' );
        expect( lines ).not.toBeNull();

        const rows = queryAllByTestId( 'line-row' );
        expect( rows.length ).toBe( LINES.data.length );
    } );
} );
