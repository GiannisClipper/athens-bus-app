import React from 'react';
import { StyledText, StyledTouchableOpacity } from '../_abstract/Styled';
import * as style from './style/buttons';

const WarningView = StyledTouchableOpacity( { style: style.warning.view } );
const WarningText = StyledText( { style: style.warning.text } );

const ErrorView = StyledTouchableOpacity( { style: style.error.view } );
const ErrorText = StyledText( { style: style.error.text } );

const WarningButton = ( { label, onPress } ) => (
    <WarningView onPress={ onPress } >
        <WarningText>{ label }</WarningText>
    </WarningView>
);

const ErrorButton = ( { label, onPress } ) => (
    <ErrorView onPress={ onPress } >
        <ErrorText>{ label }</ErrorText>
    </ErrorView>
);

export { WarningButton, ErrorButton };