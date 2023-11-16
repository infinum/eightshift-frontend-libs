/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useRef, useState, useEffect, useContext } from 'react';
import { Map as OLMap, View } from 'ol/index.js';
import { OSM, Vector as VectorSource, VectorTile as VectorTileSource, XYZ, TileJSON, } from 'ol/source';
import { Tile as OLTileLayer, Vector as OLVectorLayer, VectorTile as OLVectorTile } from 'ol/layer';
import {MapboxVectorLayer} from 'ol-mapbox-style';
import OLVectorTileLayer from 'ol/layer/VectorTile';
import { useGeographic } from 'ol/proj';
import { MVT, GeoJSON } from 'ol/format';
import { defaults as OLDefaultInteractions } from 'ol/interaction/defaults';
import { defaults as OLDefaultControls } from 'ol/control/defaults';

import OLAttribution from 'ol/control/Attribution.js';
import OLFullScreen from 'ol/control/FullScreen.js';
import OLMousePosition from 'ol/control/MousePosition.js';
import OLOverviewMap from 'ol/control/OverviewMap.js';
import OLRotate from 'ol/control/Rotate.js';
import OLScaleLine from 'ol/control/ScaleLine.js';
import OLZoomSlider from 'ol/control/ZoomSlider.js';
import OLZoomToExtent from 'ol/control/ZoomToExtent.js';
import OLZoom from 'ol/control/Zoom.js';

import { applyStyle as OLMBStyleApply } from 'ol-mapbox-style';

import { Style, Fill, Stroke, Icon } from 'ol/style';

// eslint-disable-next-line max-len
const mapMarkerImage = 'data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7.35938C16 11.9873 11.8347 16.9857 10.1728 18.7958C9.80508 19.1964 9.19492 19.1964 8.82717 18.7958C7.16529 16.9857 3 11.9873 3 7.35938C3 3.84719 5.91015 1 9.5 1C13.0899 1 16 3.84719 16 7.35938Z" fill="%233A66A8" stroke="%232E5590" stroke-linejoin="round"/><path d="M9.5 9.25C10.4665 9.25 11.25 8.4665 11.25 7.5C11.25 6.5335 10.4665 5.75 9.5 5.75C8.5335 5.75 7.75 6.5335 7.75 7.5C7.75 8.4665 8.5335 9.25 9.5 9.25Z" fill="white"/></svg>';

export const MapContext = new createContext();

export const OpenLayersMap = ({ children, zoom, center, blockClass }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// Map init.
	useEffect(() => {
		useGeographic();

		let options = {
			view: new View({ zoom, center }),
			layers: [],
			interactions: [],
			controls: [],
		};

		const mapObject = new OLMap(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// Default zoom level change.
	useEffect(() => {
		if (!map) {
			return;
		}

		map.getView().setZoom(zoom);
	}, [zoom]);

	// Default center point change.
	useEffect(() => {
		if (!map) {
			return;
		}

		map.getView().setCenter(center);
	}, [center]);

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className={blockClass}>
				{children}
			</div>
		</MapContext.Provider>
	);
};

export const Layers = ({ children }) => children;
export const Interactions = ({ children }) => children;
export const Overlays = ({ children }) => children;
export const Controls = ({ children }) => children;

export const MapLayer = (props) => {
	const {
		type = 'tile',
		source,
		accessToken,
		styleUrl,
		style,
	} = props;

	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) {
			return;
		}

		let tileLayer;

		switch (type) {
			case 'mapboxVector':
				tileLayer = new MapboxVectorLayer({
					styleUrl,
					accessToken,
				});
				break;
			case 'vectorJson':
				tileLayer = new OLVectorTileLayer({ declutter: true });
				break;
			case 'vectorTile':
				tileLayer = new OLVectorTile({
					source,
				});
				break;
			case 'vector':
				tileLayer = new OLVectorLayer({
					source,
					style,
				});
				break;
			default:
				tileLayer = new OLTileLayer({
					source,
				});
				break;
		}

		if (type === 'vectorJson') {
			OLMBStyleApply(tileLayer, styleUrl, { accessToken: accessToken });
		}

		map.addLayer(tileLayer);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map]);
	return null;
};

export const MapInteraction = (props) => {
	const {
		type = 'defaults',
		options = {},
	} = props;

	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) {
			return;
		}

		let interaction;

		switch (type) {
			default:
				interaction = OLDefaultInteractions(options).getArray();
				break;
		}

		if (Array.isArray(interaction)) {
			interaction.forEach((i) => map.addInteraction(i));
		} else {
			map.addInteraction(interaction);
		}

		return () => {
			if (map) {

				if (Array.isArray(interaction)) {
					interaction.forEach((i) => map.removeInteraction(i));
				} else {
					map.removeInteraction(interaction);
				}
			}
		};
	}, [map]);
	return null;
};

export const MapControl = (props) => {
	const {
		type = 'defaults',
		options = {},
	} = props;

	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) {
			return;
		}

		let control;

		switch (type) {
			case 'attribution':
				control = new OLAttribution(options);
				break;
			case 'fullScreen':
				control = new OLFullScreen(options);
				break;
			case 'mousePosition':
				control = new OLMousePosition(options);
				break;
			case 'overviewMap':
				control = new OLOverviewMap(Object.keys(options).length > 0 ? options : {
					layers: [
						new OLTileLayer({ source: new OSM() }),
					],
					mapOptions: {
						maxResolution: 0.0015,
						numZoomLevels: 2,
					}
				});
				break;
			case 'rotate':
				control = new OLRotate(options);
				break;
			case 'scaleLine':
				control = new OLScaleLine(options);
				break;
			case 'zoomSlider':
				control = new OLZoomSlider(options);
				break;
			case 'zoomToExtent':
				control = new OLZoomToExtent(options);
				break;
			case 'zoom':
				control = new OLZoom(options);
				break;
			default:
				control = OLDefaultControls(options).getArray();
				break;
		}

		if (Array.isArray(control)) {
			control.forEach((i) => map.addControl(i));
		} else {
			map.addControl(control);
		}

		return () => {
			if (map) {
				if (Array.isArray(control)) {
					control.forEach((i) => map.removeControl(i));
				} else {
					map.removeControl(control);
				}
			}
		};
	}, [map]);
	return null;
};

export const processMapLayer = (layer) => {
	if (layer?.hidden) {
		return null;
	}

	switch (layer?.type) {
		case 'openStreetMap':
			return (
				<MapLayer source={new OSM()} />
			);
		case 'mapBoxVector':
			if (!layer?.apiKey || layer?.styleUrl?.length < 1) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					type='mapboxVector'
					styleUrl={layer?.styleUrl}
					accessToken={layer?.apiKey}
				/>
			);
		case 'mapBoxRaster':
			if (!layer?.apiKey || layer?.styleUrl?.length < 1) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					source={new XYZ({
						url: layer?.styleUrl,
					})}
				/>
			);
		case 'mapTilerVector':
			if (!layer?.apiKey || layer?.styleUrl?.length < 1) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					type='vectorTile'
					source={new VectorTileSource({
						format: new MVT(),
						url: layer?.styleUrl,
					})}
				/>
			);

		case 'vectorJson':
			if (!layer?.apiKey || layer?.styleUrl?.length < 1) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					type='vectorJson'
					styleUrl={layer?.styleUrl}
					accessToken={layer?.apiKey}
				/>
			);

		case 'mapTilerRasterXyz':
			if (!layer?.apiKey || layer?.styleUrl?.length < 1) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					source={new XYZ({
						url: layer?.styleUrl,
					})}
				/>
			);

		case 'mapTilerRasterJson':
			if (!layer?.apiKey) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					source={new TileJSON({
						url: layer?.styleUrl,
					})}
				/>
			);

		case 'geoJson':
			if (!layer?.geoJsonUrl) {
				return null;
			}

			return (
				<MapLayer
					key={layer?.id ?? Math.random()}
					type='vector'
					source={new VectorSource({
						format: new GeoJSON(),
						url: layer?.geoJsonUrl,
					})}
					// Stylize GeoJSON features based on type.
					style={(feature, resolution) => {
						const name = feature.getGeometry().getType();

						if (name === 'Point') {
							return new Style({
								image: new Icon({
									src: mapMarkerImage,
									scale: 2 / Math.pow(resolution, 1 / 4),
									displacement: [0, 15 / Math.pow(resolution, 1 / 4)],
								})
							});
						}

						return new Style({
							fill: new Fill({
								color: 'rgb(58 102 168 / 0.25)',
							}),
							stroke: new Stroke({
								color: '#3A66A8',
								lineJoin: 'round',
								lineCap: 'round',
								width: 2.5,
							}),
						});
					}}
				/>
			);
	}

	return null;
};
