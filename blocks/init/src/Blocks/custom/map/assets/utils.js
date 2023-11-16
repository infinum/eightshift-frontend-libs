import { OSM, Vector as VectorSource, VectorTile as VectorTileSource, XYZ, TileJSON } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer, VectorTile as VectorTileLayer } from 'ol/layer';
import { MapboxVectorLayer } from 'ol-mapbox-style';
import OLVectorTileLayer from 'ol/layer/VectorTile';
import { MVT, GeoJSON } from 'ol/format';

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

export const processMapInteraction = (type, options = {}) => {
	switch (type) {
		case 'attribution':
			return new OLAttribution(options);
		case 'fullScreen':
			return new OLFullScreen(options);
		case 'mousePosition':
			return new OLMousePosition(options);
		case 'overviewMap':
			return new OLOverviewMap(Object.keys(options).length > 0 ? options : {
				layers: [
					new TileLayer({ source: new OSM() }),
				],
				mapOptions: {
					maxResolution: 0.0015,
					numZoomLevels: 2,
				}
			});
		case 'rotate':
			return new OLRotate(options);
		case 'scaleLine':
			return new OLScaleLine(options);
		case 'zoomSlider':
			return new OLZoomSlider(options);
		case 'zoomToExtent':
			return new OLZoomToExtent(options);
		case 'zoom':
			return new OLZoom(options);
		default:
			return null;
	}
};

export const processMapLayer = (layer) => {
	if (layer?.type === 'vectorJson') {
		const mapLayer = new OLVectorTileLayer({ declutter: true });
		OLMBStyleApply(mapLayer, layer?.styleUrl, { accessToken: layer?.apiKey });

		return mapLayer;
	}

	switch (layer?.type) {
		case 'openStreetMap':
			return new TileLayer({
				source: new OSM(),
			});
		case 'mapBoxVector':
			if (!layer?.apiKey) {
				return null;
			}

			return new MapboxVectorLayer({
				styleUrl: layer?.styleUrl,
				accessToken: layer?.apiKey,
			});
		case 'mapBoxRaster':
			if (!layer?.apiKey) {
				return null;
			}

			return new TileLayer({
				source: new XYZ({
					url: layer?.styleUrl,
				})
			});
		case 'mapTilerVector':
			if (!layer?.apiKey) {
				return null;
			}

			return new VectorTileLayer({
				source: new VectorTileSource({
					format: new MVT(),
					url: layer?.styleUrl,
				}),
			});
		case 'mapTilerRasterXyz':
			if (!layer?.apiKey) {
				return null;
			}

			return new TileLayer({
				source: new XYZ({
					url: layer?.styleUrl,
				}),
			});
		case 'mapTilerRasterJson':
			if (!layer?.apiKey) {
				return null;
			}

			return new TileLayer({
				source: new TileJSON({
					url: layer?.styleUrl,
				})
			});
		case 'geoJson':
			if (!layer?.geoJsonUrl) {
				return null;
			}

			return new VectorLayer({
				source: new VectorSource({
					format: new GeoJSON(),
					url: layer?.geoJsonUrl,
				}),
				// Stylize GeoJSON features based on type.
				style: (feature, resolution) => {
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
				},
			});
	}

	return null;
};
