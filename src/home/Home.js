import React from 'react';
import { StyledView, StyledText } from '../_abstract/Styled';
import styles from './styles';

const Box = StyledView( { style: styles.box } );
const NameBox = StyledView( { style: styles.nameBox } );
const BigText = StyledText( { style: styles.bigText } );
const SmallText = StyledText( { style: styles.smallText } );
const VerySmallText = StyledText( { style: styles.verySmallText } );
const Separator = StyledView( { style: styles.separator } );

const Home = () => {

    return (
        <Box>
            <NameBox>
                <BigText>ATHENS BUS</BigText>
                <VerySmallText>1.0.0 beta</VerySmallText>
            </NameBox>
            <Separator />
            <SmallText>Application developed by GiannisClipper</SmallText>
            <SmallText>for practicing and demonstration purposes,</SmallText>
            <SmallText>powered by OASA telematics API</SmallText>
            <SmallText></SmallText>
        </Box>
    );
}

export default Home;
