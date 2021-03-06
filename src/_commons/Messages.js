import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StyledText, StyledView } from '../_abstract/Styled';
import * as style from './style/messages';

const InfoMessage = StyledText( { style: style.info } );

const WarningMessage = StyledText( { style: style.warning } );

const ErrorMessage = StyledText( { style: style.error } );

const WorkingIndicator = () => <ActivityIndicator { ...style.workingIndicator } />;

const Dialogue = StyledView( { style: style.dialogue } );

export { InfoMessage, WarningMessage, ErrorMessage, WorkingIndicator, Dialogue };