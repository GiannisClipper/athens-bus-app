import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  
import { MapIcon, StopIcon } from '../_commons/Icons';
import stylePatterns from '../_commons/stylePatterns';
import styles from './styles';
import { StyledView, StyledScrollView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { CacheContext } from '../_commons/CacheContext';
import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import useRequest from '../_abstract/useRequest';
import { calcPointsFrame } from '../_abstract/calcPointsFrame';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
// const List = StyledScrollView( { style: styles.list } );
// const Row = StyledTouchableOpacity( { style: styles.row } );
// const RowIcon = StyledView( { style: styles.rowIcon } );
// const RowIconText = StyledText( { style: styles.rowIconText } );
// const RowDescr = StyledView( { style: styles.rowDescr } );
// const RowDescrText = StyledText( { style: styles.rowDescrText } );

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
    const { RouteCode, stops, coords, map } = route;

    const { status } = useRequest( {

        uri: URI.COORDS_OF_ROUTE + RouteCode,

        normalize: data => { 
            data = data.map( row => ( {
                latitude: parseFloat( row.routed_y ),
                longitude: parseFloat( row.routed_x ),
                order: parseInt( row.routed_order ),
            } ) );

            data = data.sort( ( row1, row2 ) => row1.order < row2.order ? -1 : 1 );

            const frame = calcPointsFrame( data.map( point => [ point.latitude, point.longitude ] ) );

            console.log( 'frame', frame );

            const [ left, top ] = frame[ 0 ];
            const [ right, bottom ] = frame[ 1 ];
            const width = right - left;
            const height = bottom - top;  
  
            console.log( 'width, height', width, height );
  
            route.map = {
                latitude: left + width / 2,
                longitude: top + height / 2,
                latitudeDelta: width * 1.1,
                longitudeDelta: height * 1.1,
            };
  
            console.log( 'route.map', route.map )
            return data;
        },
    
        store: coords,
    } );

    useEffect( () => console.log( 'routeCoords', coords ) );

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
                        latitude: map.latitude, 
                        longitude: map.longitude,
                        latitudeDelta: map.latitudeDelta,
                        longitudeDelta: map.longitudeDelta,
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
                            <StopIcon { ...stylePatterns.map.marker.icon } />
                        </Marker>
                    ) }

                </MapView>

            </View>

        : status.hasError ?
            <ErrorMessage>{ coords.error }</ErrorMessage>

        : null }

        </Main>
    );

    // return ( 
    //     <Main testID='routeCoords'>

    //         { status.isRequesting ?
    //             <WorkingIndicator />

    //         : status.hasData && coords.data.length === 0 ?
    //             <InfoMessage>{ 'No route coords found.' }</InfoMessage>

    //         : status.hasData ?
    //             <List>
    //             { coords.data.map( ( point, i ) => (
    //                 <Row key={ i }>

    //                     <RowIcon>
    //                         <MapIcon { ...stylePatterns.tab.item.icon } />
    //                     </RowIcon>

    //                     <RowDescr>
    //                         <RowDescrText>{ `${ point.lat } - ${ point.long }` }</RowDescrText>
    //                     </RowDescr>

    //                 </Row>
    //             ) ) } 
    //             </List>

    //         : status.hasError ?
    //             <ErrorMessage>{ schedule.error }</ErrorMessage>

    //         : null }

    //     </Main>
    // );
}

export default RouteMap;
