import React from 'react';
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';

export const WrapperToolbar = ({attributes, setAttributes}) => {

    const copyAttributes = (closeMenu) => {
        localStorage.removeItem('esCopiedWrapperAttributes');

        const copiedWrapperAttributes = Object.keys(attributes).filter((key) => key.includes('wrapper'))
        .reduce((cur, key) => { 
            cur[key] = attributes[key];
            return cur;
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
        <DropdownMenu 
            icon={icons.wrapperConfig}
            label={__('Copy/paste wrapper attributes', 'eightshift-boilerplate')}
            className="components-toolbar es-toolbar-icon-24"
        >
            {({onClose}) => (
                <MenuGroup>
                    <MenuItem onClick={() => copyAttributes(onClose)} icon={icons.copy}>
                        {__('Copy wrapper attributes', 'eightshift-boilerplate')}
                    </MenuItem>
                    <MenuItem onClick={() => pasteAttributes(onClose)} icon={icons.paste}>
                        {__('Paste wrapper attributes', 'eightshift-boilerplate')}
                    </MenuItem>
                </MenuGroup>
            )}
        </DropdownMenu>
	);
};
