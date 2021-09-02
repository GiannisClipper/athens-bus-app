import React from 'react';
import Nav from '../_abstract/Nav';
import styles from './styles';

const NavPanel = Nav.Panel( { style: styles.navPanel } );
const NavItem = Nav.Item( { style: styles.navItem } );
const NavItemIcon = Nav.ItemIcon( { style: styles.navItemIcon } );
const NavItemText = Nav.ItemText( { style: styles.navItemText } );
const NavSeparator = Nav.Separator( { style: styles.NavSeparator } );

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
