import React from 'react';
import Nav from '../core/Nav';
import styles from './styles';

const NavPanel = Nav.Panel( { style: styles.navPanel } );
const NavItem = Nav.Item( { style: styles.navItem } );
const NavItemIcon = Nav.ItemIcon( { style: styles.navItemIcon } );
const NavItemText = Nav.ItemText( { style: styles.navItemText } );
const NavSeparator = Nav.Separator( { style: styles.NavSeparator } );

const ArrivalsNav = props => {

    const { closeArrivals, isMyStop, toggleMyStop } = props;

    return (
        <NavPanel>

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

        </NavPanel>
    );
}

export default ArrivalsNav;
