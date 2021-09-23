import React, { useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { createUniqueList } from '../_abstract/uniqueList';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { sameListItemsFromTop } from '../_abstract/sameListItemsFromTop';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const normalizeStopRoutes = data => {

    data = data.filter( row => row.hidden === '0' );

    // to avoid duplicated entries sometimes seem to be included in api responses
    const uniqueRoutes = createUniqueList();
    data = data.filter( row => uniqueRoutes.push( row.RouteCode + row.RouteDescr ) );

    // to group all line descriptions by route code
    const lineDescr = {};
    data.forEach( row => lineDescr[ row.LineCode ] = {} );
    data.forEach( row => lineDescr[ row.LineCode ][ row.RouteCode ] = row.LineDescr );

    // { 
    //     "1137": {
    //         "2458": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)", 
    //         "2646": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)"
    //     }, 
    //     "1197": {
    //         "2644": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)",
    //         "2758": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)"
    //     }
    // }

    console.log( 'LINE DESCRIPTIONS', lineDescr )
    // to remove the common part of the line descriptions per route code
    // Object.keys( lineDescr ).forEach( routeCode => {
    //     lineDescr[ routeCode ] = lineDescr[ routeCode ].map( descrArr => {
    //         descrArr = descrArr.map( descr => descr.split( ' ' ) );
    //         const common = sameListItemsFromTop( descrArr );
    //         descrArr = descrArr.map( descr => descr.splice( 0, common ) );
    //         descrArr = descrArr.map( descr => descr.join( ' ' ) );
    //     } );
    // } );

    data = data.map( row => ( {
        LineID: row.LineID,
        // LineDescr: lineDescr( row.RouteCode ),
        RouteCode: row.RouteCode,
        RouteDescr: row.RouteDescr,
        RouteType: row.RouteType,
        stops: {},
        schedule: {},
    } ) );

    data = data.sort( ( row1, row2 ) => row1.LineID < row2.LineID ? -1 : 1 );

    return data;
}

const StopRoutes = props => {

    const { stop } = props;
    const { routes } = stop;

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: normalizeStopRoutes,

        store: routes,
    } );

    useEffect( () => console.log( 'StopRoutes', routes.data ) );

    return ( 
        <Main testID='routes'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData ?
                <List>
                { routes.data.map( ( route, i ) => (
                    <Route 
                        key={ i }
                        route={ route }
                    />
                ) ) } 
                </List>

            : status.hasError ?
                <ErrorMessage>{ routes.error }</ErrorMessage>

            : null }

        </Main>
    );
}

export default StopRoutes;
export { StopRoutes, normalizeStopRoutes };