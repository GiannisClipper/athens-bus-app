import React from 'react';
import * as RootNavigation from '../_commons/RootNavigation';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { StopIcon } from '../_commons/Icons';
import stylePatterns from '../_commons/stylePatterns';
import styles from './styles';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Stop = props => {

    const { stop } = props;

    const onPress = () => {
        if ( stop.routes.error ) { 
            stop.routes = {};  // clear cache in case of error to request again
        }
        stop.arrivals = {};  // clear cache due to always request up to date values

        RootNavigation.navigate( 'StopNav', { stop } );  
        // navigation.navigate() passes the parameters to the component throught `props.route.params`
    }

    return (
        <>
        <Row 
            testID='stop-row'
            onPress={ onPress }
        >

            <RowIcon>
                <StopIcon { ...stylePatterns.tab.item.icon } />
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `${ stop.StopDescr } (${ stop.StopCode })` }</RowDescrText>
            </RowDescr>

        </Row>

        </>
    );
}

export default Stop;
