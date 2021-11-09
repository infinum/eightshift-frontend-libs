import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';

export const WrapperToolbar = ({attributes, setAttributes}) => {

    const iconCopy = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M19 0v6l2 2V2h15v12h12v26H33v2h17V12.594L37.406 0Zm19 3.406L46.594 12H38ZM0 8v42h31V20.594l-.281-.313-12-12L18.406 8Zm2 2h15v12h12v26H2Zm17 1.438L27.563 20H19Z"/></svg>;
    };

    const iconPaste = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M14.813 0A1 1 0 0 0 14 1v1H5.906A2.91 2.91 0 0 0 3 4.906V43c0 1.645 1.305 3 2.906 3H16v-2H5.906C5.508 44 5 43.555 5 43V4.906C5 4.508 5.508 4 5.906 4H14v2H7v36h9v-2H9V8h5v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V8h5v6h2V6h-7V4h8.094c.398 0 .906.508.906.906V14h2V4.906A2.91 2.91 0 0 0 38.094 2H30V1c0-.55-.45-1-1-1H14.812ZM16 2h12v6H16Zm1.813 13A1 1 0 0 0 17 16v33c0 .55.45 1 1 1h28c.55 0 1-.45 1-1V16c0-.55-.45-1-1-1H17.813ZM19 17h26v31H19Zm4.719 6c-.551.078-.938.59-.86 1.14.078.551.59.938 1.141.86h17c.36.004.695-.184.879-.496a1.01 1.01 0 0 0 0-1.008c-.184-.312-.52-.5-.879-.496H23.719Zm0 6c-.551.078-.938.59-.86 1.14.078.551.59.938 1.141.86h12c.36.004.695-.184.879-.496a1.01 1.01 0 0 0 0-1.008c-.184-.312-.52-.5-.879-.496H23.719Zm0 6c-.551.078-.938.59-.86 1.14.078.551.59.938 1.141.86h17c.36.004.695-.184.879-.496a1.01 1.01 0 0 0 0-1.008c-.184-.312-.52-.5-.879-.496H23.719Zm0 6c-.551.078-.938.59-.86 1.14.078.551.59.938 1.141.86h12c.36.004.695-.184.879-.496a1.01 1.01 0 0 0 0-1.008c-.184-.312-.52-.5-.879-.496H23.719Z"/></svg>;
    };

    const copyAttributes = () => {
        localStorage.removeItem('copiedWrapperAttributes');

        const copiedWrapperAttributes = Object.keys(attributes).filter((key) => key.includes('wrapper'))
        .reduce((cur, key) => { 
            return Object.assign(cur, { [key]: attributes[key] });
        }, {});

        localStorage.setItem('copiedWrapperAttributes', JSON.stringify(copiedWrapperAttributes));
    };

    const pasteAttributes = () => {
        const wrapperAttributesToBePasted = JSON.parse(localStorage.getItem('copiedWrapperAttributes'));
        setAttributes(wrapperAttributesToBePasted);
    };

	return (
		<>
            <DropdownMenu 
                icon={iconCopy()}
                label={__('Copy/Paste wrapper attributes', 'eighsfhit-frontend-libs')}
                className="components-toolbar es-toolbar-icon-24"
            >
                { ( { onClose } ) => (
                    <Fragment>
                        <MenuGroup>
                            <MenuItem onClick={ () => {copyAttributes(); onClose();} } icon={iconCopy()}>
                                <button className="components-button components-dropdown-menu__toggle has-icon">
                                    {__('Copy Wrapper Attributes', 'eighsfhit-frontend-libs')}
                                </button>
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup>
                            <MenuItem onClick={ () => {pasteAttributes(); onClose();} } icon={iconPaste()}>
                                <button className="components-button components-dropdown-menu__toggle has-icon">
                                    {__('Paste Wrapper Attributes', 'eighsfhit-frontend-libs')}
                                </button>
                            </MenuItem>
                        </MenuGroup>
                    </Fragment>
                ) }
            </DropdownMenu>
        </>
	);
};
