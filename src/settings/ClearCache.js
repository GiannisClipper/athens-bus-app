
import React, { useState, useContext } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { TrashIcon } from '../_commons/Icons';
import * as style from './style/settings';
import { SettingsContext } from './SettingsContext';
import { Dialogue, WarningMessage } from '../_commons/Messages';
import { WarningButton } from '../_commons/Buttons';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const setting = {
    descr: 'Clear cache',
    message: 'Temporary cached data will be removed, but not the favourites.'
};

const ClearCache = props => {

    const { setAppStatus } = props;

    const [ isOpen, setIsOpen ] = useState( false );
    const onPress = () => setIsOpen( ! isOpen );

    const { settings, saveSettings } = useContext( SettingsContext );

    const clearCache = () => {
        saveSettings( { ...settings, cacheTimestamp: 0 } );
        setAppStatus( { isNotLoaded: true } );
    };

    return (
        <>
        <Row testID='setting-row' onPress={ onPress }>

            <Col1 testID='setting-icon'>
                <TrashIcon { ...style.icon } />
            </Col1>

            <Col2>
                <Col2Text>{ setting.descr }</Col2Text>
            </Col2>

        </Row>

        { isOpen ? 

            <Dialogue>
                <WarningMessage>{ setting.message }</WarningMessage>
                <WarningButton 
                    label='Confirm to continue'
                    onPress={ clearCache }
                />
            </Dialogue>        

        : null }
        </>

    );
}

export default ClearCache;