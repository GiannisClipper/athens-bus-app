import React from 'react';
import { StyledText, StyledTouchableOpacity } from '../_abstract/Styled';
import * as style from './style/buttons';

const ErrorView = StyledTouchableOpacity( { style: style.error.view } );
const ErrorText = StyledText( { style: style.error.text } );

const ErrorButton = ( { label, onPress } ) => (
    <ErrorView onPress={ onPress } >
        <ErrorText>{ label }</ErrorText>
    </ErrorView>
);

export { ErrorButton };