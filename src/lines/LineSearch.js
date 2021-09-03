import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText, StyledTextInput } from '../_abstract/Styled';
import { lineGroupStyles as styles } from './styles';
import Lines from './Lines';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrTextInput = StyledTextInput( { style: styles.rowDescrText } );

const LineSearch= props => {

    const { lines } = props;

    const [ searchText, setSearchText ] = useState( '' );

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    const isMatch = line => searchText !== '' && ( line.LineID.includes( searchText ) || line.LineDescr.includes( searchText ) );

    useEffect( () => console.log( 'Rendering LineSearch' ) );

    return (
        <>
        <Row onPress={ onPress }>

            <RowIcon>
                <RowIconText> ? </RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrTextInput
                    placeholder="to search..."
                    onFocus ={ () => setIsOpen( true ) }
                    onChangeText={ setSearchText }
                    onFocus ={ () => setIsOpen( true ) }
                />  
            </RowDescr>

        </Row>

        { isOpen ? <Lines lines={ lines } isMatch={ isMatch } /> : null }
        </>
    );
}

export default LineSearch;
