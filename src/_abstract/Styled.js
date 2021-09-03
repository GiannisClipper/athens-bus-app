import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const StyledView = ( { style } ) => 
    ( { children } ) => ( <View style={ style }>{ children }</View> );

const StyledTouchableOpacity = ( { style } ) => 
    ( { onPress, children } ) => ( <TouchableOpacity style={ style } onPress={ onPress }>{ children }</TouchableOpacity> );

const StyledText = ( { style } ) => 
    ( { children } ) => ( <Text style={ style }>{ children }</Text> );

export {  StyledView, StyledTouchableOpacity, StyledText };