import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  

import { StyledView } from '../_abstract/Styled';
import * as style from './style/routes';

import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { routeMapResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import { MapIcon } from '../_commons/Icons';

const Container = StyledView( { style: style.container } );

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
        <Container testID='routeMap'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData && coords.data.length === 0 ?
            <InfoMessage>{ 'No route coords found.' }</InfoMessage>

        : status.hasData ?
            <View style={ style.map.container }>

                <MapView
                    style={ style.map.map }
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
                        { ...style.map.polyline }
                    />

                    { stops.data.map( ( stop, i ) => 
                        <Marker
                            { ...style.map.marker }
                            key={ i }
                            coordinate={ { latitude: stop.latitude, longitude: stop.longitude } }
                            title={ `${ stop.StopDescr }` }
                            description={ `(${ stop.StopCode })` }
                        >
                            <MapIcon { ...style.map.marker.icon } />
                        </Marker>
                    ) }

                </MapView>

            </View>

        : status.hasError ?
            <ErrorMessage>{ coords.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default RouteMap;
