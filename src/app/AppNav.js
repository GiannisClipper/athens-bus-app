import React from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import styles from './styles';

const NavPanel = StyledView( { style: styles.navPanel } );
const NavItem = StyledTouchableOpacity( { style: styles.navItem } );
const NavItemIcon = StyledText( { style: styles.navItemIcon } );
const NavItemText = StyledText( { style: styles.navItemText } );
const NavSeparator = StyledView( { style: styles.NavSeparator } );

const AppNav = props => {

    const { setPage } = props;

    return (
        <NavPanel>

            <NavItem onPress={ () => setPage( 'HOME' ) }>
                <NavItemIcon>&#8962;</NavItemIcon> 
                <NavItemText>HOME</NavItemText>
            </NavItem>

            <NavSeparator />

            <NavItem onPress={ () => setPage( 'LINES' ) }>
                <NavItemIcon>&#8679;</NavItemIcon> 
                <NavItemText>LINES</NavItemText>
            </NavItem>

            <NavSeparator />
 
            <NavItem onPress={ () => setPage( 'MySTOPS' ) }>
            {/* &#9995;&#127997; */}
                <NavItemIcon>&#9734;</NavItemIcon>
                <NavItemText>MySTOPS</NavItemText>
            </NavItem>

        </NavPanel>
    );
}

export default AppNav;
