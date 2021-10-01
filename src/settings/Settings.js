import React from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/settings';
import ClearCache from './ClearCache';
import ClearAll from './ClearAll';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const Settings = props => {
 
    const { setAppStatus } = props.route.params;

    return (
        <Container testID='settings'>
            <List>
                <ClearCache setAppStatus={ setAppStatus } />
                <ClearAll setAppStatus={ setAppStatus } />
            </List>
        </Container>
    );
}

export default Settings;
