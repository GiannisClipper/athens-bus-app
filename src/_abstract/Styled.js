import React from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';

const StyledView = ( { style } ) => 
    ( { children, ...props } ) => ( 
        <View 
            style={ style } 
            { ...props }
        >
            { children }
        </View> 
    );

const StyledTouchableOpacity = ( { style } ) => 
    ( { onPress, children, ...props } ) => ( 
        <TouchableOpacity 
            style={ style } 
            onPress={ onPress }
            { ...props } 
        >
            { children }
        </TouchableOpacity> 
    );

const StyledText = ( { style } ) => 
    ( { children, ...props } ) => ( 
        <Text 
            style={ style } 
            { ...props }
        >
            { children }
        </Text>
    );

const StyledTextInput = ( { style } ) =>
    ( props ) => ( 
        <TextInput 
            style={ style } 
            { ...props } 
        /> 
    );

const StyledScrollView = ( { style } ) => 
    ( { children, ...props } ) => ( 
        <ScrollView 
            style={ style } 
            { ...props }
        >
            { children }
        </ScrollView>
    );

export {  StyledView, StyledTouchableOpacity, StyledText, StyledTextInput, StyledScrollView };