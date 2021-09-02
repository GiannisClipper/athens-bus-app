import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import styles from './styles';

const Message = ( { style } ) => 
    ( { children } ) => ( <Text style={ style }>{ children }</Text> );

const InfoMessage = Message( { style: styles.infoMessage } );

const WarningMessage = Message( { style: styles.warningMessage } );

const ErrorMessage = Message( { style: styles.errorMessage } );

const WorkingIndicator = () => <ActivityIndicator size="large" color={ styles.workingIndicator.color } />

export { InfoMessage, WarningMessage, ErrorMessage, WorkingIndicator };