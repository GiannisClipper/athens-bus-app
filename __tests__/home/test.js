import 'react-native';import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../../src/home/Home'

describe('<Home />', () => {

    it( 'renders box', async () => {
        const { getByTestId } = await render( <Home /> );
        const home = getByTestId( 'box' );
        expect( home.props.style.borderWidth ).toBe( 2 );
        expect( home.props.style.borderColor ).toBe( 'skyblue' );
    } );

    it( 'renders title', async () => {
        const { getByTestId } = await render( <Home /> );
        const title = getByTestId( 'title' );
        expect( title.props.children ).toBe( 'ATHENS BUS' );
    } );

    it( 'renders version', async () => {
        const { getByTestId } = await render( <Home /> );
        const version = getByTestId( 'version' );
        expect( version.props.children ).toBe( '1.0.2-beta' );
    } );

} );