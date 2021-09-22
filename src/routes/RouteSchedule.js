import React, { useContext, useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { CacheContext } from '../_commons/CacheContext';
import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );
const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const RouteSchedule = props => {

    const { data } = props;
    const { route } = data;
    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( ! route.LineCode ) {
        const matchLines = lines.data.filter( line => line.LineID === route.LineID );
        route.LineCode = matchLines.length > 0 ? matchLines[ 0 ].LineCode : '';
    }

    const { LineCode, RouteType, schedule } = route;

    const { status } = useRequest( {

        uri: URI.SCHEDULE_OF_LINE + LineCode,

        normalize: data => {
            const code = { '1': 'sdd_line1', '2': 'sdd_line2' }[ RouteType ];
            const time = { '1': 'sde_start1', '2': 'sde_start2' }[ RouteType ];

            let { come, go } = data;

            come = come.filter( row => row[ code ] === LineCode && typeof row[ time] === 'string' );
            come = come.map( row => row[ time ] );

            go = go.filter( row => row[ code ] === LineCode && typeof row[ time] === 'string' );
            go = go.map( row => row[ time ] );

            // data = {};
            // come.forEach( row => data[ row ] = true );
            // go.forEach( row => data[ row ] = true );
            // data = Object.keys( data );

            data = [];
            come.forEach( row => ! data.includes( row ) ? data.push( row ) : null );
            go.forEach( row => ! data.includes( row ) ? data.push( row ) : null );
            
            data.sort();
            data = data.map( row => row.substr( 11 ) );

            return data;
        },

        store: schedule,
    } );

    useEffect( () => console.log( 'route', route ) );

    return ( 
        <Main testID='routeSchedule'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData && schedule.data.length === 0 ?
                <InfoMessage>{ 'No schedule found.' }</InfoMessage>

            : status.hasData ?
                <List>
                { schedule.data.map( ( time, i ) => (
                    <Row key={ i }>

                        <RowIcon>
                            <RowIconText>!</RowIconText>
                        </RowIcon>

                        <RowDescr>
                            <RowDescrText>{ time }</RowDescrText>
                        </RowDescr>

                    </Row>
                ) ) } 
                </List>

            : status.hasError ?
                <ErrorMessage>{ schedule.error }</ErrorMessage>

            : null }

        </Main>
    );
}

export default RouteSchedule;
