import React from 'react';
import { StyledView, StyledText } from '../_abstract/Styled';
import * as style from './style/home';
import useOrientation from '../_abstract/logic/useOrientation';

const Container = StyledView( { style: style.container } );
const NameBox = StyledView( { style: style.nameBox } );
const BigText = StyledText( { style: style.bigText } );
const SmallText = StyledText( { style: style.smallText } );
const VerySmallText = StyledText( { style: style.verySmallText } );
const Separator = StyledView( { style: style.separator } );

const Home = () => {

    const orientation = useOrientation();

    const Box = StyledView( { style: style.box[ orientation === 'PORTRAIT' ? 'portrait' : 'landscape' ] } );

    return (
        <Container>
            <Box testID='home-box'>
                <NameBox>
                    <BigText testID='home-title'>ATHENS BUS</BigText>
                    <VerySmallText testID='home-subtitle'>2.0.0-beta</VerySmallText>
                </NameBox>
                <Separator />
                <SmallText>Application developed by GiannisClipper,</SmallText>
                <SmallText>code written in React Native and data</SmallText>
                <SmallText>powered by OASA telematics API.</SmallText>
                <SmallText></SmallText>
                <SmallText>An independent initiative, not associated</SmallText>
                <SmallText>with OASA organization, for practicing</SmallText>
                <SmallText>and demonstration purposes.</SmallText>
            </Box>
        </Container>
    );
}

export default Home;
