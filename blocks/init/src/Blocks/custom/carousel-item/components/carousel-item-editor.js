import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { ImageEditor } from '../../../components/image/components/image-editor';
import manifest from '../manifest.json';
import globalManifest from '../../../manifest.json';

export const CarouselItemEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditor
				{...props('image', attributes, { setAttributes })}
			/>
		</div>
	);
};
