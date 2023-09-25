import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect, dispatch } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { IconToggle, RangeSlider, getAttrKey, icons } from '@eightshift/frontend-libs/scripts';
import { WRAPPER_STORE_NAME } from './wrapper-stores';
import globalManifest from '../manifest.json';

export const WrapperDragNDropEditOptionsComponent = ({ attributes }) => {
	if (!globalManifest.config.experiments.wrapperDragNDropEditing) {
		return null;
	}

	if (attributes.wrapperUse && attributes.wrapperSimple) {
		return null;
	}

	const storeData = useSelect((select) => select(WRAPPER_STORE_NAME).get());
	const isGraphicalEditingMode = storeData.graphicalEditing && storeData.currentClientId === attributes.blockClientId;

	return (
		<PanelBody>
			<IconToggle
				icon={icons.experiment}
				label={__('Drag & drop width/offset editing', 'eightshift-frontend-libs')}
				help={__('Experimental', 'eightshift-frontend-libs')}
				onChange={() => dispatch(WRAPPER_STORE_NAME).toggleGraphicalEditing()}
				checked={isGraphicalEditingMode}
				noBottomSpacing
				inlineHelp
			/>
		</PanelBody>
	);
};

export const WrapperDragNDropEditEditorComponent = (props) => {
	const { attributes, setAttributes, manifest, wrapperWidthLarge, wrapperOffsetLarge, wrapperIsFullWidthLarge } = props;

	if (!globalManifest.config.experiments.wrapperDragNDropEditing) {
		return null;
	}

	if (attributes.wrapperUse && attributes.wrapperSimple) {
		return null;
	}

	const storeData = useSelect((select) => select(WRAPPER_STORE_NAME).get());
	const isGraphicalEditingMode = storeData.graphicalEditing && storeData.currentClientId === attributes.blockClientId;

	if (!isGraphicalEditingMode) {
		return null;
	}

	return (
		<div
			style={{
				position: 'absolute',
				inset: '0',
				display: 'grid',
				gridTemplateColumns: 'var(--wrapper-grid-template-columns)',
				columnGap: 'var(--global-grid-gutter)',
				marginTop: '-0.5rem',
				alignItems: 'center',
			}}>
			<div style={{
				gridColumn: wrapperIsFullWidthLarge
					? `1 / span ${globalManifest.globalVariables.maxCols + 2}`
					: `2 / span ${globalManifest.globalVariables.maxCols}`,
				gridRow: 1,
			}}>
				<RangeSlider
					min={1}
					max={globalManifest.globalVariables.maxCols + (wrapperIsFullWidthLarge ? 3 : 1)}

					value={[wrapperOffsetLarge, wrapperOffsetLarge + wrapperWidthLarge]}
					onChange={([offset, width]) => setAttributes({
						[getAttrKey('wrapperOffsetLarge', attributes, manifest)]: offset,
						[getAttrKey('wrapperWidthLarge', attributes, manifest)]: width - offset,
					})}
					noBottomSpacing
					trackColor='rgb(255 0 255 / 0.15)'
					railColor='rgb(255 0 255 / 0)'
					draggableTrack
					noCross
					step={1}
					pushable={1}
					onBeforeChange={() => dispatch(WRAPPER_STORE_NAME).showPreview()}
					onAfterChange={() => dispatch(WRAPPER_STORE_NAME).hidePreview()}
					handleColor='magenta'
					noTooltip
				/>
			</div>
		</div>
	);
};
