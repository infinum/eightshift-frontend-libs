import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useSelect } from '@wordpress/data';
import { checkAttr, outputCssVariables, getUnique, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ attributes, children }) => {
	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseInner = checkAttr('wrapperUseInner', attributes, manifest);
	const wrapperNoControls = checkAttr('wrapperNoControls', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperParentClass = checkAttr('wrapperParentClass', attributes, manifest);
	const wrapperSimple = checkAttr('wrapperSimple', attributes, manifest);
	const wrapperGetGridInfo = checkAttr('wrapperGetGridInfo', attributes, manifest);
	const wrapperIsFullWidthLarge = checkAttr('wrapperIsFullWidthLarge', attributes, manifest, true);

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

	const isEditMode = useSelect((select) => select('core/block-editor').isNavigationMode());

	const unique = useMemo(() => getUnique(), []);
	attributes['uniqueWrapperId'] = unique;

	const wrapperMainClass = attributes['componentClass'] || manifest['componentClass'];
	const wrapperClass = classnames(
		wrapperMainClass,
		wrapperSimple ? `${wrapperMainClass}--simple` : '',
		isEditMode ? `${wrapperMainClass}--edit-mode` : '',
		isEditMode && wrapperIsFullWidthLarge ? `${wrapperMainClass}--edit-mode-fullwidth` : '',
	);

	const wrapperInnerClass = classnames(
		`${wrapperMainClass}__inner`,
	);

	const reference = useRef(null);
	const [gridWidth, setGridWidth] = useState([]);

	if (wrapperGetGridInfo) {
		const calculateGridWidth = () => {
			const [edgeColumn, middleColumn] = getComputedStyle(reference.current).gridTemplateColumns.split(' ');

			setGridWidth({
				'--wrapper-grid-column-width-edge': edgeColumn,
				'--wrapper-grid-column-width-middle': middleColumn,
			});
		};

		useEffect(() => {
			calculateGridWidth();
			window.addEventListener('resize', calculateGridWidth);

			return () => {
				window.removeEventListener('resize', calculateGridWidth);
			};
		}, []); // eslint-disable-line react-hooks/exhaustive-deps
	}

	const GridGuides = () => {
		const items = [];

		const maxItems = wrapperIsFullWidthLarge ? 14 : 12;

		for (let i = 1; i <= maxItems; i++) {
			const itemStyle = {
				gridColumn: `${wrapperIsFullWidthLarge ? i : i + 1} / span 1`,
			};

			items.push(<div className={`${wrapperMainClass}__grid-item`} style={itemStyle} key={i}>{i}</div>);
		}

		return (
			<div className={`${wrapperMainClass}__grid`}>
				{items}
			</div>
		);
	};

	const blockName = attributes?.blockName ?? '';
	const gridGuidesAllowList = ['columns'];

	const shouldHaveGuides = ((attributes?.wrapperSimple ?? false) === false && (attributes?.wrapperUse ?? false) === true) || gridGuidesAllowList?.includes(blockName);

	return (
		<div ref={reference} style={gridWidth} className={wrapperClass} data-id={unique} id={wrapperId}>
			{isEditMode && shouldHaveGuides && <GridGuides />}

			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{wrapperUseInner &&
				<div className={wrapperInnerClass}>
					{children}
				</div>
			}

			{!wrapperUseInner && children}
		</div>
	);
};
