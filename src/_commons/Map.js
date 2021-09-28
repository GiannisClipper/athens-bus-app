import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  
import { FlagIcon } from '../_commons/Icons';
import * as defaultStyle from './style/map';

const Map = ( { style, initialRegion, onRegionChange, onRegionChangeComplete, children } ) => {

    style = style || defaultStyle;

    return (
        <View style={ style.container }>

            <MapView
                style={ style.map }
                showsUserLocation={ false }
                zoomEnabled={ true }
                zoomControlEnabled={ true }
                initialRegion={ initialRegion }
                onRegionChange={ onRegionChange }
                onRegionChangeComplete={ onRegionChangeComplete }
            >

                { children }

            </MapView>

        </View>
    );
}

const MapPolyline = ( { style, coordinates } ) => {

    style = style || defaultStyle;

    return (
        <Polyline 
            { ...style.polyline }
            coordinates={ coordinates } 
        />
    );
}

const MapMarker = ( { style, Icon, coordinate, title, description } ) => {

    style = style || defaultStyle;

    Icon = Icon || FlagIcon;

    return (
        <Marker
            { ...style.marker.marker }
            coordinate={ { latitude: coordinate.latitude, longitude: coordinate.longitude } }
            title={ title }
            description={ description }
        >
            <Icon { ...style.marker.icon } />
        </Marker>
    );
}

export { Map, MapPolyline, MapMarker };
