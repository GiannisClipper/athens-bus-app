import React, { useEffect, useState } from 'react';
import { Map, MapPolyline, MapMarker } from '../_commons/Map';

import { StyledView } from '../_abstract/Styled';
import * as style from './style/routes';

import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { routeMapResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
// import { MapIcon, StopIcon } from '../_commons/Icons';

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

    const [ zoom, setZoom ] = useState( null );

    const onRegionChangeComplete = region => {
        const newZoom = Math.round( Math.log( 360 / region.longitudeDelta ) / Math.LN2 );
        // https://stackoverflow.com/questions/46568465/convert-a-region-latitudedelta-longitudedelta-into-an-approximate-zoomlevel
        
        if ( zoom !== newZoom ) {
            setZoom( newZoom );
        }
    }

    // useEffect( () => console.log( 'Rerender map with zoom:', zoom ) );
    // TODO: using the zoom value to rescale marker icons on the map

    return ( 
        <Container testID='routeMap'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData && coords.data.length === 0 ?
            <InfoMessage>{ 'No route coords found.' }</InfoMessage>

        : status.hasData ?
            <Map 
                initialRegion={ {
                    latitude: coords.map.latitude, 
                    longitude: coords.map.longitude,
                    latitudeDelta: coords.map.latitudeDelta,
                    longitudeDelta: coords.map.longitudeDelta,
                } }
                onRegionChangeComplete={ onRegionChangeComplete }
            >
                <MapPolyline coordinates={ coords.data } />

                { stops.data.map( ( stop, i ) => 
                    <MapMarker
                        key={ i }
                        coordinate={ { latitude: stop.latitude, longitude: stop.longitude } }
                        title={ `${ stop.StopDescr }` }
                        description={ `(${ stop.StopCode })` }
                        // Icon={ zoom < 15 ? MapIcon : StopIcon }  // lower performance
                    />
                ) }

            </Map>

        : status.hasError ?
            <ErrorMessage>{ coords.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default RouteMap;
