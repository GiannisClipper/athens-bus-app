import React, { useState, useContext } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import styles from './styles';
import { StorageContext } from '../_commons/StorageContext';
import { CacheContext } from '../_commons/CacheContext';
import Arrivals from '../arrivals/Arrivals';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Stop = props => {

    const { stop, setRerender } = props;

    const { setMyStops } = useContext( StorageContext );
    const { cache, createMyStop, deleteMyStop } = useContext( CacheContext );
    const { myStops } = cache;

    const [ isMyStop, setIsMyStop ] = useState( 
        myStops.data.map( myStop => myStop.StopCode ).includes( stop.StopCode )
    );

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        if ( ! isOpen && stop.routes.error ) { 
            stop.routes = {};  // clear cache in case of error to request again
        }
        if ( ! isOpen ) { 
            stop.arrivals = {};  // clear cache due to always request up to date values
        }
        setIsOpen( ! isOpen );
    }

    const closeArrivals= () => {
        setIsOpen( false );
        if ( setRerender ) {
            setRerender();
        }
    };

    const toggleMyStop = () => {
        const newIsMyStop = ! isMyStop;
        newIsMyStop ? createMyStop( stop ) : deleteMyStop( stop );
        setMyStops( myStops.data );
        setIsMyStop( ! isMyStop )
    };

    return (
        <>
        <Row onPress={ onPress }>

            <RowIcon>
                <RowIconText>&#9995;&#127996;</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `${ stop.StopDescr } (${ stop.StopCode })` }</RowDescrText>
            </RowDescr>

        </Row>

        { isOpen 
            ? 
            <Arrivals 
                stop={ stop } 
                closeArrivals={ closeArrivals } 
                isMyStop={ isMyStop }
                toggleMyStop={ toggleMyStop }
            /> 
            : 
            null 
        }
        </>
    );
}

const SimpleStop = props => {

    const { stop } = props;

    return (
        <Row>

            <RowIcon>
                <RowIconText>&#9995;&#127996;</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `${ stop.StopDescr } (${ stop.StopCode })` }</RowDescrText>
            </RowDescr>

        </Row>
    );
}

export default { Stop, SimpleStop };
export { Stop, SimpleStop };