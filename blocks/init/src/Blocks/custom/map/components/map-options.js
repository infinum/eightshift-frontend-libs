import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import {
	Collapsable,
	Control,
	IconLabel,
	IconToggle,
	Notification,
	NumberPicker,
	OptionSelector,
	Repeater,
	RepeaterItem,
	Section,
	checkAttr,
	getAttrKey,
	icons,
	truncateMiddle,
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const MapOptions = ({ attributes, setAttributes }) => {

	const mapLayers = checkAttr('mapLayers', attributes, manifest);
	const mapCenterLat = checkAttr('mapCenterLat', attributes, manifest);
	const mapCenterLon = checkAttr('mapCenterLon', attributes, manifest);
	const mapZoom = checkAttr('mapZoom', attributes, manifest);
	const mapInteractions = checkAttr('mapInteractions', attributes, manifest);
	const mapControls = checkAttr('mapControls', attributes, manifest);

	const layerTypes = {
		openStreetMap: {
			icon: icons.mapLayer,
			title: __('OpenStreetMap', 'eightshift-frontend-libs'),
		},
		vectorJson: {
			icon: icons.mapLayerJson, title: __('Vector map', 'eightshift-frontend-libs'),
			subtitle: __('with JSON styles', 'eightshift-frontend-libs'),
		},
		mapBoxVector: {
			icon: icons.mapLayerVector, title: __('Mapbox map', 'eightshift-frontend-libs'),
			subtitle: __('Vector tiles', 'eightshift-frontend-libs'),
		},
		mapBoxRaster: {
			icon: icons.mapLayerRaster, title: __('Mapbox map', 'eightshift-frontend-libs'),
			subtitle: __('Raster tiles', 'eightshift-frontend-libs'),
		},
		mapTilerVector: {
			icon: icons.mapLayerVector, title: __('MapTiler tiles', 'eightshift-frontend-libs'),
			subtitle: __('Vector - XYZ (PBF)', 'eightshift-frontend-libs'),
		},
		mapTilerRasterXyz: {
			icon: icons.mapLayerRaster, title: __('MapTiler map/tiles', 'eightshift-frontend-libs'),
			subtitle: __('Raster - XYZ', 'eightshift-frontend-libs'),
		},
		mapTilerRasterJson: {
			icon: icons.mapLayerRaster, title: __('MapTiler map/tiles', 'eightshift-frontend-libs'),
			subtitle: __('Raster - JSON', 'eightshift-frontend-libs'),
		},
		geoJson: { icon: icons.fileMetadata, title: __('GeoJSON', 'eightshift-frontend-libs') },
	};

	return (
		<PanelBody title={__('Map', 'eightshift-frontend-libs')}>
			<Section icon={icons.play} label={__('Initial view', 'eightshift-frontend-libs')}>
				<Control icon={icons.alignHorizontalVerticalAlt} label={__('Center point', 'eightshift-frontend-libs')} additionalLabelClasses='es-mb-1!'>
					<div className='es-fifty-fifty-h'>
						<TextControl
							label={__('Lat', 'eightshift-frontend-libs')}
							value={mapCenterLat}
							onChange={(value) => setAttributes({ [getAttrKey('mapCenterLat', attributes, manifest)]: value })}
							className='es-m-0! es-m-0-bcf!'
						/>

						<TextControl
							label={__('Lon', 'eightshift-frontend-libs')}
							value={mapCenterLon}
							onChange={(value) => setAttributes({ [getAttrKey('mapCenterLon', attributes, manifest)]: value })}
							className='es-m-0! es-m-0-bcf!'
						/>
					</div>
				</Control>

				<NumberPicker
					icon={icons.search}
					label={__('Zoom', 'eightshift-frontend-libs')}
					value={mapZoom}
					onChange={(value) => setAttributes({ [getAttrKey('mapZoom', attributes, manifest)]: value })}
					min={1}
					max={30}
					additionalClasses='es-flex-shrink-0'
					inlineLabel
				/>
			</Section>

			<Section icon={icons.options} label={__('Configuration', 'eightshift-frontend-libs')} noBottomSpacing>
				<Repeater
					icon={icons.layers}
					label={__('Layers', 'eightshift-frontend-libs')}

					items={mapLayers}
					attributeName={getAttrKey('mapLayers', attributes, manifest)}
					setAttributes={setAttributes}
				>
					{mapLayers.map((layer, index) => {
						// eslint-disable-next-line max-len
						const needsApiKey = ['mapBoxVector', 'mapBoxRaster', 'mapTilerVector', 'vectorJson', 'mapTilerRasterXyz', 'mapTilerRasterJson'].includes(layer?.type);
						// eslint-disable-next-line max-len
						const hasMapStyleOptions = ['mapBoxVector', 'mapBoxRaster', 'mapTilerVector', 'vectorJson', 'mapTilerRasterXyz', 'mapTilerRasterJson'].includes(layer?.type);

						return (
							<RepeaterItem
								key={layer.id}
								icon={layer?.type ? layerTypes?.[layer?.type]?.icon ?? icons.mapLayer : icons.layerOff}
								title={layerTypes?.[layer?.type]?.title ?? __('New layer', 'eightshift-frontend-libs')}
								subtitle={
									layer?.type === 'geoJson'
										? truncateMiddle(layer?.geoJsonUrl?.slice(layer?.geoJsonUrl?.lastIndexOf('/') + 1) ?? '', 20)
										: layerTypes?.[layer?.type]?.subtitle
								}
								preIcon={
									layer?.type?.length < 1 ? icons.dummySpacer : (
										<Button
											icon={mapLayers[index]?.hidden ? icons.dummySpacer : icons.visible}
											onClick={() => {
												const modifiedData = [...mapLayers];
												modifiedData[index].hidden = !modifiedData[index].hidden;
												setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
											}}
											// eslint-disable-next-line max-len
											className='es-mr-1 es-button-square-20 es-button-icon-16 es-rounded-1 es-border-cool-gray-300 es-hover-border-cool-gray-300 es-focus-border-transparent es-transition-colors'
											label={mapLayers[index]?.hidden ? __('Show', 'eightshift-frontend-libs') : __('Hide', 'eightshift-frontend-libs')}
											showTooltip
										/>
									)
								}
							>
								{!layer?.type &&
									<OptionSelector
										label={__('Layer type', 'eightshift-frontend-libs')}
										options={Object.entries(layerTypes).map(([value, { icon, title, subtitle }]) => ({
											value: value,
											label: title,
											icon: icon,
											subtitle: subtitle,
										}))}
										onChange={(value) => {
											const modifiedData = [...mapLayers];
											modifiedData[index].type = value;
											setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
										}}
										alignment='vertical'
										noBottomSpacing
									/>
								}

								{needsApiKey &&
									<TextControl
										label={<IconLabel icon={icons.key} label={__('API key', 'eightshift-frontend-libs')} />}
										value={mapLayers[index]?.apiKey}
										onChange={(value) => {
											const modifiedData = [...mapLayers];
											modifiedData[index].apiKey = value;
											setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
										}}
									/>
								}

								{hasMapStyleOptions &&
									<TextControl
										label={<IconLabel icon={icons.color} label={__('Map style', 'eightshift-frontend-libs')} />}
										value={mapLayers[index]?.styleUrl}
										onChange={(value) => {
											const modifiedData = [...mapLayers];
											modifiedData[index].styleUrl = value;
											setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
										}}
										help={
											<>
												{!layer?.type?.startsWith('mapBox') &&
													__('Copy the full style URL from MapTiler. Keep the API key inside the URL.', 'eightshift-frontend-libs')
												}

												{layer?.type === 'mapBoxVector' &&
													__('Copy the full style URL from Mapbox.', 'eightshift-frontend-libs')
												}

												{layer?.type === 'mapBoxRaster' &&
													// eslint-disable-next-line max-len
													__('Copy the full style URL from Mapbox or a Mapbox-compatible source. Keep the access token inside the URL.', 'eightshift-frontend-libs')
												}

												<br />
												<br />

												{['mapBoxRaster', 'mapTilerVector', 'mapTilerRasterXyz'].includes(layer?.type) &&
													<>
														<code className='es-bg-transparent es-p-0 es-text-3'>{'{z}/{x}/{y}'}</code>
														{
															// eslint-disable-next-line max-len
															__("should be left as they are in the URL; they're needed for the map to work properly.", 'eightshift-frontend-libs')
														}
														<br />
														<br />
													</>
												}

												{__('Example', 'eightshift-frontend-libs')}:
												<br />
												<span className='es-word-break-all'>
													{['mapTilerRasterJson', 'vectorJson'].includes(layer?.type) &&
														'https://api.maptiler.com/maps/{styleName}/tiles.json?key={apiKey}'
													}

													{layer?.type === 'mapTilerVector' && 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key={apiKey}'}

													{layer?.type === 'mapBoxVector' &&
														<>
															{'mapbox://styles/{styleName},'}
															<br />
															{'mapbox://styles/{userId}/{styleId}'}
														</>
													}

													{layer?.type === 'mapBoxRaster' &&
														'https://api.mapbox.com/v4/{tilesetId}/{z}/{x}/{y}[@2x].{imageFormat}?acess_token={apiKey}'
													}

													{layer?.type === 'mapTilerRasterXyz' &&
														'https://api.maptiler.com/maps/{styleName}/{z}/{x}/{y}.png?key={apiKey}'
													}
												</span>
											</>
										}
										className='es-m-0! es-mb-0-bcf!'
									/>
								}

								{layer?.type === 'geoJson' && (layer?.geoJsonUrl?.length < 1 || !layer?.geoJsonUrl) &&
									<MediaPlaceholder
										icon={icons.file}
										accept={['.json', '.geojson']}
										labels={{ title: __('GeoJSON file', 'eightshift-frontend-libs') }}
										onSelect={
											(file) => {
												const modifiedData = [...mapLayers];
												modifiedData[index].geoJsonUrl = file.url;
												setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
											}
										}
									/>
								}

								{layer?.type === 'geoJson' && layer?.geoJsonUrl?.length > 0 &&
									<div className='es-h-between'>
										<IconLabel
											icon={icons.file}
											label={
												<code className='es-word-break-all es-bg-transparent es-p-0 es-text-2.75!'>
													{layer.geoJsonUrl.slice(layer.geoJsonUrl.lastIndexOf('/') + 1)}
												</code>
											}
											additionalClasses='es-flex-shrink-1'
											standalone
										/>

										<Button
											onClick={() => {
												const modifiedData = [...mapLayers];
												delete modifiedData[index].geoJsonUrl;
												setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
											}}
											// eslint-disable-next-line max-len
											className='es-button-icon-24 es-border-cool-gray-100 es-hover-border-cool-gray-200 es-hover-color-admin-accent es-rounded-1.5 es-nested-color-cool-gray-650'
										>
											{__('Replace', 'eightshift-frontend-libs')}
										</Button>
									</div>
								}
							</RepeaterItem>
						);
					})}
				</Repeater>

				<Collapsable label={__('Controls', 'eightshift-frontend-libs')} icon={icons.buttonOutline}>
					<IconToggle
						icon={icons.tag}
						label={__('Attribution', 'eightshift-frontend-libs')}
						checked={mapControls.attribution}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.attribution = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.expandXl}
						label={__('Full screen', 'eightshift-frontend-libs')}
						checked={mapControls.fullScreen}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.fullScreen = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.mouseCursor}
						label={__('Pointer position', 'eightshift-frontend-libs')}
						checked={mapControls.mousePosition}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.mousePosition = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.mapPin}
						label={__('Minimap', 'eightshift-frontend-libs')}
						checked={mapControls.overviewMap}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.overviewMap = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.rotateLeft}
						label={__('Reset rotation', 'eightshift-frontend-libs')}
						checked={mapControls.rotate}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.rotate = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.ruler}
						label={__('Map scale', 'eightshift-frontend-libs')}
						checked={mapControls.scaleLine}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.scaleLine = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel icon={icons.search} label={__('Zoom', 'eightshift-frontend-libs')} additionalClasses='es-mb-1.5 es-font-weight-500' standalone />

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Slider', 'eightshift-frontend-libs')}
						checked={mapControls.zoomSlider}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.zoomSlider = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Buttons', 'eightshift-frontend-libs')}
						checked={mapControls.zoom}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.zoom = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('To extent', 'eightshift-frontend-libs')}
						checked={mapControls.zoomToExtent}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.zoomToExtent = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<Notification
						type='info'
						text={__('Note', 'eightshift-frontend-libs')}
						subtitle={__('Some of the options might not be reflected in the editor', 'eightshift-frontend-libs')}
						noBottomSpacing
					/>
				</Collapsable>

				<Collapsable label={__('Interactions', 'eightshift-frontend-libs')} icon={icons.pointerHand} noBottomSpacing>
					<IconToggle
						icon={icons.focus}
						label={__('Only when map is focused', 'eightshift-frontend-libs')}
						checked={mapInteractions.onFocusOnly}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.onFocusOnly = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel
						icon={icons.rotateRight}
						label={__('Rotate', 'eightshift-frontend-libs')}
						additionalClasses='es-mb-1.5 es-font-weight-500'
						standalone
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Alt+Shift and drag to rotate', 'eightshift-frontend-libs')}
						checked={mapInteractions.altShiftDragRotate}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.altShiftDragRotate = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Pinch to rotate', 'eightshift-frontend-libs')}
						checked={mapInteractions.pinchRotate}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.pinchRotate = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel icon={icons.search} label={__('Zoom', 'eightshift-frontend-libs')} additionalClasses='es-mb-1.5 es-font-weight-500' standalone />
					<IconToggle
						icon={icons.dummySpacer}
						label={__('Double-click to zoom', 'eightshift-frontend-libs')}
						checked={mapInteractions.doubleClickZoom}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.doubleClickZoom = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Zoom with mousewheel', 'eightshift-frontend-libs')}
						checked={mapInteractions.mouseWheelZoom}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.mouseWheelZoom = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Shift and drag to zoom', 'eightshift-frontend-libs')}
						checked={mapInteractions.shiftDragZoom}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.shiftDragZoom = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Pinch to zoom', 'eightshift-frontend-libs')}
						checked={mapInteractions.pinchZoom}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.pinchZoom = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						reducedBottomSpacing
					/>

					<NumberPicker
						icon={icons.dummySpacer}
						label={__('Animation duration (ms)', 'eightshift-frontend-libs')}
						value={mapInteractions.zoomDuration}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.zoomDuration = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						min={0}
						max={10000}
						reducedBottomSpacing
						inlineLabel
					/>

					<NumberPicker
						icon={icons.dummySpacer}
						label={__('Zoom-in step', 'eightshift-frontend-libs')}
						value={mapInteractions.zoomDelta}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.zoomDelta = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
						inlineLabel
						min={1}
						max={10}
					/>

					<IconToggle
						icon={icons.keyboard}
						label={__('Keyboard interactions', 'eightshift-frontend-libs')}
						checked={mapInteractions.keyboard}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.keyboard = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.cursorMove}
						label={__('Drag to move map', 'eightshift-frontend-libs')}
						checked={mapInteractions.dragPan}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.dragPan = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<Notification
						type='info'
						text={__('Note', 'eightshift-frontend-libs')}
						subtitle={__('Some of the options might not be reflected in the editor', 'eightshift-frontend-libs')}
						noBottomSpacing
					/>
				</Collapsable>
			</Section>
		</PanelBody>
	);
};
