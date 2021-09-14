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
        <Box testID='box'>
            <NameBox>
                <BigText testID='title'>ATHENS BUS</BigText>
                <VerySmallText testID='version'>1.0.2-beta</VerySmallText>
            </NameBox>
            <Separator />
            <SmallText>Application developed by GiannisClipper,</SmallText>
            <SmallText>code written in React Native and data</SmallText>
            <SmallText>powered by OASA telematics API.</SmallText>
            <SmallText></SmallText>
            <SmallText>An indypendent initiative, not associated</SmallText>
            <SmallText>with OASA organization, for practicing</SmallText>
            <SmallText>and demonstration purposes.</SmallText>
        </Box>
    );
}

export default Home;
