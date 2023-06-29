import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useSelect } from '@wordpress/data';
import { checkAttr, outputCssVariables, getUnique, classnames } from '@eightshift/frontend-libs/scripts';
import { WrapperDragNDropEditEditorComponent } from '../wrapper-drag-n-drop-editing';
import { WRAPPER_STORE_NAME } from '../wrapper-stores';
import { GridGuides } from '../wrapper-grid-guides';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ attributes, setAttributes, children }) => {
	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseInner = checkAttr('wrapperUseInner', attributes, manifest);
	const wrapperNoControls = checkAttr('wrapperNoControls', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperParentClass = checkAttr('wrapperParentClass', attributes, manifest);
	const wrapperSimple = checkAttr('wrapperSimple', attributes, manifest);
	const wrapperGetGridInfo = checkAttr('wrapperGetGridInfo', attributes, manifest);
	const wrapperIsFullWidthLarge = checkAttr('wrapperIsFullWidthLarge', attributes, manifest, true);

	const wrapperOffsetLarge = checkAttr('wrapperOffsetLarge', attributes, manifest, true);
	const wrapperWidthLarge = checkAttr('wrapperWidthLarge', attributes, manifest, true);

	// First letter of WrapperTag variable is capitalized on purpose. That way it can be used as a dynamic tag.
	const WrapperTag = checkAttr('wrapperTag', attributes, manifest);

	const {
		blockClientId,
	} = attributes;

	if (!wrapperUse || wrapperNoControls) {
		if (!wrapperParentClass) {
			return children;
		}

		return (
			<div className={`${wrapperParentClass}__item`}>
				<div className={`${wrapperParentClass}__item-inner`}>
					{children}
				</div>
			</div>
		);
	}

	const storeData = useSelect((select) => select(WRAPPER_STORE_NAME).get());
	const previewVisible = storeData.previewVisible && storeData.currentClientId === blockClientId;

	const unique = useMemo(() => getUnique(), []);
	attributes.uniqueWrapperId = unique;

	const wrapperMainClass = attributes['componentClass'] || manifest['componentClass'];

	const wrapperClass = classnames(
		wrapperMainClass,
		wrapperSimple && `${wrapperMainClass}--simple`,
		previewVisible && `${wrapperMainClass}--edit-mode`,
		previewVisible && wrapperIsFullWidthLarge && `${wrapperMainClass}--edit-mode-fullwidth`,
	);

	const wrapperInnerClass = `${wrapperMainClass}__inner`;

	const reference = useRef(null);
	const [gridWidth, setGridWidth] = useState([]);

	// Additional grid info, if needed.
	const calculateGridWidth = () => {
		const [edgeColumn, middleColumn] = getComputedStyle(reference.current).gridTemplateColumns.split(' ');

		setGridWidth({
			'--wrapper-grid-column-width-edge': edgeColumn,
			'--wrapper-grid-column-width-middle': middleColumn,
		});
	};

	useEffect(() => {
		if (!wrapperGetGridInfo) {
			return () => { };
		}

		calculateGridWidth();
		window.addEventListener('resize', calculateGridWidth);

		return () => {
			window.removeEventListener('resize', calculateGridWidth);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WrapperTag ref={reference} style={gridWidth} className={wrapperClass} data-id={unique} id={wrapperId}>
			<GridGuides
				previewVisible={previewVisible}
				wrapperIsFullWidthLarge={wrapperIsFullWidthLarge}
				wrapperMainClass={wrapperMainClass}
			/>

			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{wrapperUseInner &&
				<div className={wrapperInnerClass}>
					{children}
				</div>
			}

			{!wrapperUseInner && children}

			<WrapperDragNDropEditEditorComponent
				attributes={attributes}
				setAttributes={setAttributes}
				manifest={manifest}
				wrapperWidthLarge={wrapperWidthLarge}
				wrapperOffsetLarge={wrapperOffsetLarge}
				wrapperIsFullWidthLarge={wrapperIsFullWidthLarge}
			/>
		</WrapperTag>
	);
};
