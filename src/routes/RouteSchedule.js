import React, { useContext, useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { CacheContext } from '../_commons/CacheContext';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
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

    const { LineCode, schedule } = route;

    const { status } = useRequest( {

        uri: URI.SCHEDULE_OF_LINE + LineCode,

        normalize: data => {
            const timeField = route.RouteType === '1' 
                ? 'sde_start1' 
                : route.RouteType === '2' 
                ? 'sde_start2' 
                : 'unknown';

            data = data.go;
            data = data.map( row => row[ timeField ] );
            data = data.map( row => row ? row.substr( 11, 5 ) : '??:??' );

            console.log( "DATA", data );
            return data;
        },

        store: schedule,
    } );

    useEffect( () => console.log( 'route', route ) );

    return ( 
        <Main testID='routeSchedule'>

            { status.isRequesting ?
                <WorkingIndicator />

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
