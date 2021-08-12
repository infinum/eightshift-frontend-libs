import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts';
import { VideoEditor as VideoEditorComponent } from '../../../components/video/components/video-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const VideoEditor = ({ attributes, setAttributes }) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		blockClass,
	} = attributes;
	return (
		<div className={blockClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<VideoEditorComponent
				{...props('video', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</div>
	);
};
