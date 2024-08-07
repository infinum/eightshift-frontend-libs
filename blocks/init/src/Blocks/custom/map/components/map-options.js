import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import {
	Collapsable,
	Control,
	IconLabel,
	IconToggle,
	Menu,
	MenuItem,
	MenuSeparator,
	Notification,
	NumberPicker,
	Repeater,
	RepeaterItem,
	Section,
	checkAttr,
	getAttrKey,
	truncateMiddle,
} from '@eightshift/frontend-libs/scripts';
import { icons } from '@eightshift/ui-components/icons';
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
			title: __('OpenStreetMap', '%g_textdomain%'),
			hasSeparator: true,
		},
		vectorJson: {
			icon: icons.mapLayerJson, title: __('Vector map', '%g_textdomain%'),
			subtitle: __('with JSON styles', '%g_textdomain%'),
			hasSeparator: true,
		},
		mapBoxVector: {
			icon: icons.mapLayerVector, title: __('Mapbox map', '%g_textdomain%'),
			subtitle: __('Vector tiles', '%g_textdomain%'),
		},
		mapBoxRaster: {
			icon: icons.mapLayerRaster, title: __('Mapbox map', '%g_textdomain%'),
			subtitle: __('Raster tiles', '%g_textdomain%'),
			hasSeparator: true,
		},
		mapTilerVector: {
			icon: icons.mapLayerVector, title: __('MapTiler tiles', '%g_textdomain%'),
			subtitle: __('Vector - XYZ (PBF)', '%g_textdomain%'),
		},
		mapTilerRasterXyz: {
			icon: icons.mapLayerRaster, title: __('MapTiler map/tiles', '%g_textdomain%'),
			subtitle: __('Raster - XYZ', '%g_textdomain%'),
		},
		mapTilerRasterJson: {
			icon: icons.mapLayerRaster, title: __('MapTiler map/tiles', '%g_textdomain%'),
			subtitle: __('Raster - JSON', '%g_textdomain%'),
			hasSeparator: true,
		},
		geoJson: { icon: icons.fileMetadata, title: __('GeoJSON', '%g_textdomain%') },
	};

	return (
		<PanelBody title={__('Map', '%g_textdomain%')}>
			<Section icon={icons.play} label={__('Initial view', '%g_textdomain%')}>
				<Control icon={icons.alignHorizontalVerticalAlt} label={__('Center point', '%g_textdomain%')} additionalLabelClasses='es-mb-1!'>
					<div className='es-fifty-fifty-h'>
						<TextControl
							label={__('Lat', '%g_textdomain%')}
							value={mapCenterLat}
							onChange={(value) => setAttributes({ [getAttrKey('mapCenterLat', attributes, manifest)]: value })}
							className='es-m-0! es-m-0-bcf!'
						/>

						<TextControl
							label={__('Lon', '%g_textdomain%')}
							value={mapCenterLon}
							onChange={(value) => setAttributes({ [getAttrKey('mapCenterLon', attributes, manifest)]: value })}
							className='es-m-0! es-m-0-bcf!'
						/>
					</div>
				</Control>

				<NumberPicker
					icon={icons.search}
					label={__('Zoom', '%g_textdomain%')}
					value={mapZoom}
					onChange={(value) => setAttributes({ [getAttrKey('mapZoom', attributes, manifest)]: value })}
					min={1}
					max={30}
					additionalClasses='es-flex-shrink-0'
					inlineLabel
				/>
			</Section>

			<Section icon={icons.options} label={__('Configuration', '%g_textdomain%')} noBottomSpacing>
				<Repeater
					icon={icons.layers}
					label={__('Layers', '%g_textdomain%')}

					items={mapLayers}
					attributeName={getAttrKey('mapLayers', attributes, manifest)}
					setAttributes={setAttributes}

					customAddButton={({ disabled }) => (
						<Menu
							buttonClass='es-button-square-28 es-button-icon-24 es-nested-color-cool-gray-650 es-rounded-1'
							icon={icons.plusCircle}
							disabled={disabled}
						>
							{Object.entries(layerTypes).map(([value, { icon, title, subtitle, hasSeparator }], index) => {
								return (
									<>
										<MenuItem
											key={index}
											icon={icon}
											label={<IconLabel label={title} subtitle={subtitle} standalone />}
											additionalClass='es-content-start!'
											onClick={() => {
												const modifiedData = [...mapLayers];
												modifiedData.push({
													id: modifiedData.length + 1,
													type: value,
													hidden: false,
												});
												setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
											}}
										/>

										{hasSeparator && <MenuSeparator />}
									</>
								);
							})}
						</Menu>
					)}
				>
					{mapLayers.map((layer, index) => {
						const needsApiKey = ['mapBoxVector', 'mapBoxRaster', 'mapTilerVector', 'vectorJson', 'mapTilerRasterXyz', 'mapTilerRasterJson'].includes(layer?.type);
						const hasMapStyleOptions = ['mapBoxVector', 'mapBoxRaster', 'mapTilerVector', 'vectorJson', 'mapTilerRasterXyz', 'mapTilerRasterJson'].includes(layer?.type);

						return (
							<RepeaterItem
								key={layer.id}
								icon={layer?.type ? layerTypes?.[layer?.type]?.icon ?? icons.mapLayer : icons.layerOff}
								title={layerTypes?.[layer?.type]?.title ?? __('New layer', '%g_textdomain%')}
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
											className='es-mr-1 es-button-square-20 es-button-icon-16 es-rounded-1 es-border-cool-gray-300 es-hover-border-cool-gray-300 es-focus-border-transparent es-transition-colors'
											label={mapLayers[index]?.hidden ? __('Show', '%g_textdomain%') : __('Hide', '%g_textdomain%')}
											showTooltip
										/>
									)
								}
							>
								{!layer?.type &&
									<Notification
										type='error'
										text={__('Error', '%g_textdomain%')}
										subtitle={__('Layer type is missing, please remove the layer and add a new one.', '%g_textdomain%')}
									/>
								}

								{needsApiKey &&
									<TextControl
										label={<IconLabel icon={icons.key} label={__('API key', '%g_textdomain%')} />}
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
										label={<IconLabel icon={icons.color} label={__('Map style', '%g_textdomain%')} />}
										value={mapLayers[index]?.styleUrl}
										onChange={(value) => {
											const modifiedData = [...mapLayers];
											modifiedData[index].styleUrl = value;
											setAttributes({ [getAttrKey('mapLayers', attributes, manifest)]: modifiedData });
										}}
										help={
											<>
												{!layer?.type?.startsWith('mapBox') &&
													__('Copy the full style URL from MapTiler. Keep the API key inside the URL.', '%g_textdomain%')
												}

												{layer?.type === 'mapBoxVector' &&
													__('Copy the full style URL from Mapbox.', '%g_textdomain%')
												}

												{layer?.type === 'mapBoxRaster' &&
													__('Copy the full style URL from Mapbox or a Mapbox-compatible source. Keep the access token inside the URL.', '%g_textdomain%')
												}

												<br />
												<br />

												{['mapBoxRaster', 'mapTilerVector', 'mapTilerRasterXyz'].includes(layer?.type) &&
													<>
														<code className='es-bg-transparent es-p-0 es-text-3'>{'{z}/{x}/{y}'}</code>
														{
															__("should be left as they are in the URL; they're needed for the map to work properly.", '%g_textdomain%')
														}
														<br />
														<br />
													</>
												}

												{__('Example', '%g_textdomain%')}:
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
										labels={{ title: __('GeoJSON file', '%g_textdomain%') }}
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
											className='es-button-icon-24 es-border-cool-gray-100 es-hover-border-cool-gray-200 es-hover-color-admin-accent es-rounded-1.5 es-nested-color-cool-gray-650'
										>
											{__('Replace', '%g_textdomain%')}
										</Button>
									</div>
								}
							</RepeaterItem>
						);
					})}
				</Repeater>

				<Collapsable label={__('Controls', '%g_textdomain%')} icon={icons.buttonOutline}>
					<IconToggle
						icon={icons.tag}
						label={__('Attribution', '%g_textdomain%')}
						checked={mapControls.attribution}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.attribution = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.expandXl}
						label={__('Full screen', '%g_textdomain%')}
						checked={mapControls.fullScreen}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.fullScreen = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.mouseCursor}
						label={__('Pointer position', '%g_textdomain%')}
						checked={mapControls.mousePosition}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.mousePosition = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.mapPin}
						label={__('Minimap', '%g_textdomain%')}
						checked={mapControls.overviewMap}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.overviewMap = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.rotateLeft}
						label={__('Reset rotation', '%g_textdomain%')}
						checked={mapControls.rotate}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.rotate = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.ruler}
						label={__('Map scale', '%g_textdomain%')}
						checked={mapControls.scaleLine}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.scaleLine = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel icon={icons.search} label={__('Zoom', '%g_textdomain%')} additionalClasses='es-mb-1.5 es-font-weight-500' standalone />

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Slider', '%g_textdomain%')}
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
						label={__('Buttons', '%g_textdomain%')}
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
						label={__('To extent', '%g_textdomain%')}
						checked={mapControls.zoomToExtent}
						onChange={(value) => {
							const newValue = { ...mapControls };
							newValue.zoomToExtent = value;

							setAttributes({ [getAttrKey('mapControls', attributes, manifest)]: newValue });
						}}
					/>

					<Notification
						type='info'
						text={__('Note', '%g_textdomain%')}
						subtitle={__('Some of the options might not be reflected in the editor', '%g_textdomain%')}
						noBottomSpacing
					/>
				</Collapsable>

				<Collapsable label={__('Interactions', '%g_textdomain%')} icon={icons.pointerHand} noBottomSpacing>
					<IconToggle
						icon={icons.focus}
						label={__('Only when map is focused', '%g_textdomain%')}
						checked={mapInteractions.onFocusOnly}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.onFocusOnly = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel
						icon={icons.rotateRight}
						label={__('Rotate', '%g_textdomain%')}
						additionalClasses='es-mb-1.5 es-font-weight-500'
						standalone
					/>

					<IconToggle
						icon={icons.dummySpacer}
						label={__('Alt+Shift and drag to rotate', '%g_textdomain%')}
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
						label={__('Pinch to rotate', '%g_textdomain%')}
						checked={mapInteractions.pinchRotate}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.pinchRotate = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconLabel icon={icons.search} label={__('Zoom', '%g_textdomain%')} additionalClasses='es-mb-1.5 es-font-weight-500' standalone />
					<IconToggle
						icon={icons.dummySpacer}
						label={__('Double-click to zoom', '%g_textdomain%')}
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
						label={__('Zoom with mousewheel', '%g_textdomain%')}
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
						label={__('Shift and drag to zoom', '%g_textdomain%')}
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
						label={__('Pinch to zoom', '%g_textdomain%')}
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
						label={__('Animation duration (ms)', '%g_textdomain%')}
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
						label={__('Zoom-in step', '%g_textdomain%')}
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
						label={__('Keyboard interactions', '%g_textdomain%')}
						checked={mapInteractions.keyboard}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.keyboard = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<IconToggle
						icon={icons.cursorMove}
						label={__('Drag to move map', '%g_textdomain%')}
						checked={mapInteractions.dragPan}
						onChange={(value) => {
							const newValue = { ...mapInteractions };
							newValue.dragPan = value;

							setAttributes({ [getAttrKey('mapInteractions', attributes, manifest)]: newValue });
						}}
					/>

					<Notification
						type='info'
						text={__('Note', '%g_textdomain%')}
						subtitle={__('Some of the options might not be reflected in the editor', '%g_textdomain%')}
						noBottomSpacing
					/>
				</Collapsable>
			</Section>
		</PanelBody>
	);
};
