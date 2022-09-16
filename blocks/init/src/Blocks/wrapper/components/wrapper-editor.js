import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';
import { checkAttr, outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../manifest.json';

export const WrapperEditor = ({ attributes, children }) => {
	const wrapperUse = checkAttr('wrapperUse', attributes, manifest);
	const wrapperUseInner = checkAttr('wrapperUseInner', attributes, manifest);
	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperParentClass = checkAttr('wrapperParentClass', attributes, manifest);
	const wrapperUseSimple = checkAttr('wrapperUseSimple', attributes, manifest);
	const wrapperGetGridInfo = checkAttr('wrapperGetGridInfo', attributes, manifest);
	const wrapperIsFullWidthLarge = checkAttr('wrapperIsFullWidthLarge', attributes, manifest, true);

	if (!wrapperUse || wrapperDisable) {
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

	const isEditMode = useSelect((select) => {
		return select('core/block-editor').isNavigationMode();
	});

	const unique = useMemo(() => getUnique(), []);
	attributes['uniqueWrapperId'] = unique;

	const wrapperMainClass = attributes['componentClass'] || manifest['componentClass'];
	const wrapperClass = classnames([
		wrapperMainClass,
		wrapperUseSimple ? `${wrapperMainClass}--simple` : '',
		isEditMode ? `${wrapperMainClass}--edit-mode` : '',
		isEditMode && wrapperIsFullWidthLarge ? `${wrapperMainClass}--edit-mode-fullwidth` : '',
	]);

	const wrapperInnerClass = classnames([
		`${wrapperMainClass}__inner`,
	]);

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
			items.push(<div className={`${wrapperMainClass}__grid-item`} key={i}>{i}</div>);
		}

		return (
			<div className={`${wrapperMainClass}__grid`}>
				{items}
			</div>
		);
	};

	return (
		<div ref={reference} style={gridWidth} className={wrapperClass} data-id={unique} id={wrapperId}>
			{isEditMode && <GridGuides />}

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
