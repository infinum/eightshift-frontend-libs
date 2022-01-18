import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Fragment, useState } from '@wordpress/element';
import { PanelBody, TextControl, RangeControl, KeyboardShortcuts } from '@wordpress/components';
import {
	ColorPaletteCustom,
	Responsive,
	HelpModal,
	icons,
	ucfirst,
	getOptionColors,
	IconToggle,
	checkAttr,
	IconLabel,
	getOption,
	ComponentUseToggle
} from '@eightshift/frontend-libs/scripts';
import { WrapperOptionsLayout } from './wrapper-options-layout';
import manifest from './../manifest.json';

export const WrapperOptions = ({ attributes, setAttributes }) => {
	const {
		attributes: reset,
		options,
	} = manifest;

	const wrapperDisable = checkAttr('wrapperDisable', attributes, manifest);
	const wrapperLayoutUse = checkAttr('wrapperLayoutUse', attributes, manifest);
	const wrapperIdShow = checkAttr('wrapperIdShow', attributes, manifest);
	const wrapperId = checkAttr('wrapperId', attributes, manifest);
	const wrapperAnchorIdShow = checkAttr('wrapperAnchorIdShow', attributes, manifest);
	const wrapperAnchorId = checkAttr('wrapperAnchorId', attributes, manifest);
	const wrapperBackgroundColorShow = checkAttr('wrapperBackgroundColorShow', attributes, manifest);
	const wrapperBackgroundColor = checkAttr('wrapperBackgroundColor', attributes, manifest);
	const wrapperSpacingTopShow = checkAttr('wrapperSpacingTopShow', attributes, manifest);
	const wrapperSpacingBottomShow = checkAttr('wrapperSpacingBottomShow', attributes, manifest);
	const wrapperSpacingTopInShow = checkAttr('wrapperSpacingTopInShow', attributes, manifest);
	const wrapperSpacingBottomInShow = checkAttr('wrapperSpacingBottomInShow', attributes, manifest);
	const wrapperDividerTopShow = checkAttr('wrapperDividerTopShow', attributes, manifest);
	const wrapperDividerBottomShow = checkAttr('wrapperDividerBottomShow', attributes, manifest);

	if (wrapperDisable) {
		return null;
	}

	const [showAdvanced, setShowAdvanced] = useState(false);

	const spacingBottomPlusCallback = () => {
		const wrapperSpacingBottomLarge = checkAttr('wrapperSpacingBottomLarge', attributes, manifest);
		const { max, step } = getOption('wrapperSpacing', attributes, manifest);

		if (wrapperSpacingBottomLarge < max) {
			setAttributes({ 'wrapperSpacingBottomLarge': wrapperSpacingBottomLarge + step });
		}
	};

	const spacingBottomMinusCallback = () => {
		const wrapperSpacingBottomLarge = checkAttr('wrapperSpacingBottomLarge', attributes, manifest);
		const { min, step } = getOption('wrapperSpacing', attributes, manifest);

		if (wrapperSpacingBottomLarge > min) {
			setAttributes({ 'wrapperSpacingBottomLarge': wrapperSpacingBottomLarge - step });
		}
	};

	const isEditMode = useSelect((select) => {
		return select('core/block-editor').isNavigationMode();
	});

	return (
		<PanelBody title={<span>{__('Layout', 'eightshift-boilerplate')}</span>} initialOpen={isEditMode ?? false} icon={icons.wrapper} className='es-panel-title es-panel-wrapper'>

			<HelpModal />

			<KeyboardShortcuts
				shortcuts={{
					'option+z': spacingBottomMinusCallback,
					'option+x': spacingBottomPlusCallback,
				}}
			/>

			<br /><br />

			{wrapperSpacingBottomShow &&
				<Responsive label={<IconLabel icon={icons.spacingBottom} label={__('Bottom spacing', 'eightshift-boilerplate')} />}>
					{options.breakpoints.map((item, index) => {
						const point = ucfirst(item);
						const attr = `wrapperSpacingBottom${point}`;
						const { min, max, step } = getOption('wrapperSpacing', attributes, manifest);

						return (
							<Fragment key={index}>
								<RangeControl
									label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
									allowReset={true}
									value={attributes[attr]}
									onChange={(value) => setAttributes({ [attr]: value })}
									min={min}
									max={max}
									step={step}
								/>
							</Fragment>
						);
					})}
				</Responsive>
			}

			{wrapperLayoutUse &&
				<WrapperOptionsLayout
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			}

			{wrapperBackgroundColorShow &&
				<ColorPaletteCustom
					label={<IconLabel icon={icons.backgroundTypeAlt} label={__('Background color', 'eightshift-boilerplate')} />}
					colors={getOptionColors(options.colors)}
					value={wrapperBackgroundColor}
					onChange={(value) => setAttributes({ wrapperBackgroundColor: value })}
				/>
			}

			<ComponentUseToggle
				label={__('Show advanced', 'eightshift-boilerplate')}
				checked={showAdvanced}
				onChange={() => setShowAdvanced(!showAdvanced)}
				showUseToggle={true}
				showLabel={true}
			/>

			{showAdvanced &&
				<>
					{wrapperSpacingTopShow &&
						<Responsive label={<IconLabel icon={icons.spacingTop} label={__('Top spacing', 'eightshift-boilerplate')} />}>
							{options.breakpoints.map((item, index) => {
								const point = ucfirst(item);
								const attr = `wrapperSpacingTop${point}`;
								const { min, max, step } = getOption('wrapperSpacing', attributes, manifest);

								return (
									<Fragment key={index}>
										<RangeControl
											label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
											allowReset={true}
											value={attributes[attr]}
											onChange={(value) => setAttributes({ [attr]: value })}
											min={min}
											max={max}
											step={step}
											resetFallbackValue={reset[attr]?.default}
										/>
									</Fragment>
								);
							})}
						</Responsive>
					}

					{wrapperSpacingTopInShow &&
						<Responsive label={<IconLabel icon={icons.spacingTopIn} label={__('Top inner spacing', 'eightshift-boilerplate')} />}>
							{options.breakpoints.map((item, index) => {
								const point = ucfirst(item);
								const attr = `wrapperSpacingTopIn${point}`;
								const { min, max, step } = getOption('wrapperSpacingInner', attributes, manifest);

								return (
									<Fragment key={index}>
										<RangeControl
											label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
											allowReset={true}
											value={attributes[attr]}
											onChange={(value) => setAttributes({ [attr]: value })}
											min={min}
											max={max}
											step={step}
											resetFallbackValue={reset[attr]?.default}
										/>
									</Fragment>
								);
							})}
						</Responsive>
					}

					{wrapperSpacingBottomInShow &&
						<Responsive label={<IconLabel icon={icons.spacingBottomIn} label={__('Bottom inner spacing', 'eightshift-boilerplate')} />}>
							{options.breakpoints.map((item, index) => {
								const point = ucfirst(item);
								const attr = `wrapperSpacingBottomIn${point}`;
								const { min, max, step } = getOption('wrapperSpacingInner', attributes, manifest);

								return (
									<Fragment key={index}>
										<RangeControl
											label={<IconLabel icon={icons[`screen${point}`]} label={point} />}
											allowReset={true}
											value={attributes[attr]}
											onChange={(value) => setAttributes({ [attr]: value })}
											min={min}
											max={max}
											step={step}
											resetFallbackValue={reset[attr]?.default}
										/>
									</Fragment>
								);
							})}
						</Responsive>
					}

					{wrapperDividerTopShow &&
						<Responsive label={<IconLabel icon={icons.dividerTop} label={__('Top divider', 'eightshift-boilerplate')} />}>
							{options.breakpoints.map((item, index) => {
								const point = ucfirst(item);
								const attr = `wrapperDividerTop${point}`;

								return (
									<Fragment key={index}>
										<IconToggle
											icon={icons[`screen${point}`]}
											label={point}
											checked={attributes[attr]}
											onChange={(value) => setAttributes({ [attr]: value })}
										/>
									</Fragment>
								);
							})}
						</Responsive>
					}

					{wrapperDividerBottomShow &&
						<Responsive label={<IconLabel icon={icons.dividerBottom} label={__('Bottom divider', 'eightshift-boilerplate')} />}>
							{options.breakpoints.map((item, index) => {
								const point = ucfirst(item);
								const attr = `wrapperDividerBottom${point}`;

								return (
									<Fragment key={index}>
										<IconToggle
											icon={icons[`screen${point}`]}
											label={point}
											checked={attributes[attr]}
											onChange={(value) => setAttributes({ [attr]: value })}
										/>
									</Fragment>
								);
							})}
						</Responsive>
					}

					<hr />

					{wrapperAnchorIdShow &&
						<TextControl
							label={<IconLabel icon={icons.anchor} label={__('Block anchor ID', 'eightshift-boilerplate')} />}
							value={wrapperAnchorId}
							onChange={(value) => setAttributes({ wrapperAnchorId: value })}
						/>
					}

					{wrapperIdShow &&
						<TextControl
							label={<IconLabel icon={icons.id} label={__('Block unique identifier', 'eightshift-boilerplate')} />}
							value={wrapperId}
							onChange={(value) => setAttributes({ wrapperId: value })}
						/>
					}
				</>
			}

		</PanelBody>
	);
};
