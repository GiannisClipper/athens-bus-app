import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StyledText } from '../_abstract/Styled';
import styles from './styles';

const InfoMessage = StyledText( { style: styles.infoMessage } );

const WarningMessage = StyledText( { style: styles.warningMessage } );

const ErrorMessage = StyledText( { style: styles.errorMessage } );

const WorkingIndicator = () => <ActivityIndicator size="large" color={ styles.workingIndicator.color } />

export { InfoMessage, WarningMessage, ErrorMessage, WorkingIndicator };