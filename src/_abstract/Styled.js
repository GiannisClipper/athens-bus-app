import React from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';

const StyledView = ( { style } ) => 
    ( { children } ) => ( <View style={ style }>{ children }</View> );

const StyledTouchableOpacity = ( { style } ) => 
    ( { onPress, children } ) => ( <TouchableOpacity style={ style } onPress={ onPress }>{ children }</TouchableOpacity> );

const StyledText = ( { style } ) => 
    ( { children } ) => ( <Text style={ style }>{ children }</Text> );

const StyledTextInput = ( { style } ) =>
    props => { console.log( props ); return ( <TextInput style={ style } { ...props } /> ) };

const StyledScrollView = ( { style } ) => 
    ( { children } ) => ( <ScrollView style={ style }>{ children }</ScrollView> );

export {  StyledView, StyledTouchableOpacity, StyledText, StyledTextInput, StyledScrollView };