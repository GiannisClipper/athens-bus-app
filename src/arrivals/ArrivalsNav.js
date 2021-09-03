import React from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import styles from './styles';

const Nav = StyledView( { style: styles.nav } );
const NavItem = StyledTouchableOpacity( { style: styles.navItem } );
const NavItemIcon = StyledText( { style: styles.navItemIcon } );
const NavItemText = StyledText( { style: styles.navItemText } );
const NavSeparator = StyledView( { style: styles.NavSeparator } );

const ArrivalsNav = props => {

    const { closeArrivals, isMyStop, toggleMyStop } = props;

    return (
        <Nav>

            <NavItem onPress={ closeArrivals }>
                <NavItemIcon>&#8630;</NavItemIcon> 
                <NavItemText>CLOSE</NavItemText>
            </NavItem>

            <NavSeparator />

            <NavItem onPress={ toggleMyStop }>
                { isMyStop
                ? <NavItemIcon>&#9745;</NavItemIcon> 
                : <NavItemIcon>&#9744;</NavItemIcon> 
                }
                <NavItemText>MySTOP</NavItemText>
            </NavItem>

        </Nav>
    );
}

export default ArrivalsNav;
