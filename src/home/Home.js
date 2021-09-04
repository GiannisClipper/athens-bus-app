import React from 'react';
import { StyledView, StyledText } from '../_abstract/Styled';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../_abstract/useOrientation';

const Home = () => {

    const orientation = useOrientation();

    const styles = orientation === 'PORTRAIT' ? portraitStyles : landscapeStyles;

    const Box = StyledView( { style: styles.box } );
    const NameBox = StyledView( { style: styles.nameBox } );
    const BigText = StyledText( { style: styles.bigText } );
    const SmallText = StyledText( { style: styles.smallText } );
    const VerySmallText = StyledText( { style: styles.verySmallText } );
    const Separator = StyledView( { style: styles.separator } );

    return (
        <Box>
            <NameBox>
                <BigText>ATHENS BUS</BigText>
                <VerySmallText>1.0.0-beta</VerySmallText>
            </NameBox>
            <Separator />
            <SmallText>An application developed by GiannisClipper,</SmallText>
            <SmallText>code written in React Native and data</SmallText>
            <SmallText>powered by OASA telematics API.</SmallText>
            <SmallText></SmallText>
            <SmallText>An independent initiutive for practicing and</SmallText>
            <SmallText>demonstration purposes, not associated</SmallText>
            <SmallText>with OASA organization.</SmallText>
        </Box>
    );
}

export default Home;
