import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  

import { StyledView } from '../_abstract/Styled';
import stylePatterns from '../_commons/stylePatterns';
import styles from './styles';

import { URI } from '../_commons/constants';
import { useRequest, initRequestStatus } from '../_abstract/useRequest';
import { routeMapResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import { MapIcon } from '../_commons/Icons';

const Main = StyledView( { style: styles.main } );

const mapStyles = StyleSheet.create( {
    container: {
        ...stylePatterns.map.container
    },
    map: {
        ...stylePatterns.map.container
    },
} );

const RouteMap = props => {

    const { data } = props;
    const { route } = data;
    const { RouteCode, stops, coords } = route;

    const { status } = useRequest( {
        uri: URI.COORDS_OF_ROUTE + RouteCode,
        requestStatus: initRequestStatus( coords ),
        responseHandler: response => routeMapResponseHandler( coords, response ),
    } );

    return ( 
        <Main testID='routeMap'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData && coords.data.length === 0 ?
            <InfoMessage>{ 'No route coords found.' }</InfoMessage>

        : status.hasData ?
            <View style={ mapStyles.container }>

                <MapView
                    style={ mapStyles.map }
                    showsUserLocation={ false }
                    zoomEnabled={ true }
                    zoomControlEnabled={ true }
                    initialRegion={ {
                        latitude: coords.map.latitude, 
                        longitude: coords.map.longitude,
                        latitudeDelta: coords.map.latitudeDelta,
                        longitudeDelta: coords.map.longitudeDelta,
                    } }>

                    <Polyline 
                        coordinates={ coords.data } 
                        strokeWidth={ 2 }
                        strokeColor='blue'
                    />

                    { stops.data.map( ( stop, i ) => 
                        <Marker
                            { ...stylePatterns.map.marker }
                            key={ i }
                            coordinate={ { latitude: stop.latitude, longitude: stop.longitude } }
                            title={ `${ stop.StopDescr }` }
                            description={ `(${ stop.StopCode })` }
                        >
                            <MapIcon { ...stylePatterns.map.marker.icon } />
                        </Marker>
                    ) }

                </MapView>

            </View>

        : status.hasError ?
            <ErrorMessage>{ coords.error }</ErrorMessage>

        : null }

        </Main>
    );
}

export default RouteMap;
