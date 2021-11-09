import React from 'react';
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';

export const WrapperToolbar = ({attributes, setAttributes}) => {

    const copyAttributes = (closeMenu) => {
        localStorage.removeItem('esCopiedWrapperAttributes');

        const copiedWrapperAttributes = Object.keys(attributes).filter((key) => key.includes('wrapper'))
        .reduce((cur, key) => { 
            return Object.assign(cur, { [key]: attributes[key] });
        }, {});

        localStorage.setItem('esCopiedWrapperAttributes', JSON.stringify(copiedWrapperAttributes));
        closeMenu();
    };

    const pasteAttributes = (closeMenu) => {
        const wrapperAttributesToBePasted = JSON.parse(localStorage.getItem('esCopiedWrapperAttributes'));
        setAttributes(wrapperAttributesToBePasted);
        closeMenu();
    };

	return (
		<>
            <DropdownMenu 
                icon={icons.wrapperConfig}
                label={__('Copy/Paste wrapper attributes', 'eighsfhit-frontend-libs')}
                className="components-toolbar es-toolbar-icon-24"
            >
                { ( { onClose } ) => (
                    <>
                        <MenuGroup>
                            <MenuItem onClick={ () => {copyAttributes(onClose);} } icon={icons.copy}>
                                <button className="components-button components-dropdown-menu__toggle has-icon">
                                    {__('Copy Wrapper Attributes', 'eighsfhit-frontend-libs')}
                                </button>
                            </MenuItem>
                            <MenuItem onClick={ () => {pasteAttributes(onClose);} } icon={icons.paste}>
                                <button className="components-button components-dropdown-menu__toggle has-icon">
                                    {__('Paste Wrapper Attributes', 'eighsfhit-frontend-libs')}
                                </button>
                            </MenuItem>
                        </MenuGroup>
                    </>
                ) }
            </DropdownMenu>
        </>
	);
};
