import React from 'react';
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { BaseControl, Button, Icon, PanelBody } from '@wordpress/components';
import { LottieSettings } from './lottie-settings';
import { Responsive, UseToggle, IconLabel, checkAttr, checkAttrResponsive, getAttrKey, icons, ucfirst } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import _ from 'lodash';

export const LottieOptions = ({ attributes, setAttributes }) => {
	const {
		responsiveAttributes: {
			lottieUrl,
			lottieAspectRatio,
			lottieName,
		},
		title,
	} = manifest;

	const {
		lottieLabel = title,
		showLottieUse = true,
		showLottieUrl = true,
		showLottieSettings = true,
		showLabel = false,
	} = attributes;

	const lottieUse = checkAttr('lottieUse', attributes, manifest);
	const lottieUrlValue = checkAttrResponsive('lottieUrl', attributes, manifest);
	const lottieSettingsConditional = (showLottieSettings && Boolean(Object.values(lottieUrlValue).filter((value) => value).length));

	return (
		<PanelBody title={__('Lottie', '%g_namespace%')}>
			<UseToggle
				label={lottieLabel}
				checked={lottieUse}
				onChange={(value) => setAttributes({ [getAttrKey('lottieUse', attributes, manifest)]: value })}
				noUseToggle={!showLottieUse}
				noLabel={!showLabel}
			>
				{lottieUse &&
					<>
						<Responsive
							label={<IconLabel icon={icons.media} label={__('Animation file', '%g_namespace%')} />}
						>
							{showLottieUrl &&
								Object.entries(lottieUrl).map(([breakpoint, responsiveAttribute]) => {

									const lottieUrlKey = getAttrKey(responsiveAttribute, attributes, manifest);
									const lottieAspectRatioKey = getAttrKey(lottieAspectRatio[breakpoint], attributes, manifest);
									const lottieNameKey = getAttrKey(lottieName[breakpoint], attributes, manifest);

									let point = breakpoint.length > 1 ? ucfirst(breakpoint) : breakpoint;

									let pointLabel = point;
									if (point === 'Large') {
										point = '';
										pointLabel = __('Default (all screens)', '%g_namespace%');
									}

									return (
										<BaseControl
											key={breakpoint}
											label={
												<IconLabel icon={icons[breakpoint]} label={pointLabel} />
											}
										>
											{!_.isEmpty(attributes[lottieUrlKey]) &&
												<div className='es-flex'>
													<code style={{
														display: 'flex',
														alignItems: 'center',
														gap: '0.2rem',
														fontSize: '0.8rem',
													}}>
														{<Icon icon={icons.file} size='64' />}
														{attributes[lottieNameKey]}.json
													</code>

													<Button
														variant='secondary'
														onClick={() => setAttributes({
															[lottieUrlKey]: undefined,
															[lottieAspectRatioKey]: undefined,
															[lottieNameKey]: undefined,
														})}
														icon={icons.trash}
														label={__('Remove', '%g_namespace%')}
														isDestructive
													/>
												</div>
											}
											{_.isEmpty(attributes[lottieUrlKey]) &&
												<MediaPlaceholder
													icon={icons.animation}
													labels={{
														title: __('Lottie animation', '%g_namespace%'),
														// eslint-disable-next-line max-len
														instructions: __('Upload an animation file or pick one from your media library. You can set different animations for each screen size in the options sidebar.', '%g_namespace%'),
													}}
													onSelect={(value) => {
														fetch(value.url, { method: 'GET' })
															.then((response) => response.json())
															.then(({
																w: lottieWidth,
																h: lottieHeight,
															}) => {
																setAttributes({
																	[lottieUrlKey]: value.url,
																	[lottieAspectRatioKey]: (lottieHeight / lottieWidth * 100),
																	[lottieNameKey]: value.title,
																});
															});
													}}
													accept={'application/json'}
													allowedTypes={['application/json']}
												/>
											}
										</BaseControl>
									);
								})
							}
						</Responsive>
						{lottieSettingsConditional &&
							<LottieSettings
								attributes={attributes}
								setAttributes={setAttributes}
								manifest={manifest}
							/>
						}

					</>
				}
			</UseToggle>
		</PanelBody>
	);
};
