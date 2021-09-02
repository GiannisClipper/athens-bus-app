import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Panel = ( { style } ) => 
    ( { children } ) => ( <View style={ style }>{ children }</View> );

const Item = ( { style } ) => 
    ( { onPress, children } ) => ( <TouchableOpacity style={ style } onPress={ onPress }>{ children }</TouchableOpacity> );

const ItemIcon = ( { style } ) => 
    ( { children } ) => ( <Text style={ style }>{ children }</Text> );

const ItemText = ( { style } ) => 
    ( { children } ) => ( <Text style={ style }>{ children }</Text> );

const Separator = ( { style } ) => 
    ( { children } ) => ( <View style={ style }>{ children }</View> );

export default { Panel, Item, ItemIcon, ItemText, Separator };
export {  Panel, Item, ItemIcon, ItemText, Separator };