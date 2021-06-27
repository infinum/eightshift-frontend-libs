import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { video } from '@wordpress/icons';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const VideoEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		videoUse = checkAttr('videoUse', attributes, manifest, componentName),
		videoUrl = checkAttr('videoUrl', attributes, manifest, componentName),
	} = attributes;

	const videoClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{videoUse &&
				<>
					{_.isEmpty(videoUrl) ?
						<Placeholder icon={video} label={__('Please add video using sidebar options!', 'eightshift-frontend-libs')} /> :
						<video
							className={videoClass}
						>
							{videoUrl.map((item) => (<source key={item.url} src={item.url} type={item.mime} />))}
							<track kind="captions" />
						</video>
					}
				</>
			}
		</>
	);
};

