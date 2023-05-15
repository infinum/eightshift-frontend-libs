import React from 'react';
import { checkAttr } from '@eightshift/frontend-libs/scripts';
import { Interactions, Layers, MapInteraction, OpenLayersMap, Controls, MapControl, processMapLayer } from './map-components';
import manifest from '../manifest.json';

export const MapEditor = ({ attributes }) => {
	const {
		blockClass,
	} = attributes;

	const mapLayers = checkAttr('mapLayers', attributes, manifest);
	const mapCenterLat = checkAttr('mapCenterLat', attributes, manifest, true);
	const mapCenterLon = checkAttr('mapCenterLon', attributes, manifest, true);
	const mapZoom = checkAttr('mapZoom', attributes, manifest);
	const mapInteractions = checkAttr('mapInteractions', attributes, manifest);
	const mapControls = checkAttr('mapControls', attributes, manifest);

	return (
		<OpenLayersMap center={[mapCenterLat ?? 46.314045, mapCenterLon ?? 16.352532].reverse()} zoom={mapZoom} blockClass={blockClass}>
			<Layers key={mapLayers.map(({ id, type }) => `${id}-${type}`).join(',')}>
				{[...mapLayers].reverse().map((layer) => processMapLayer(layer))}
			</Layers>

			<Interactions>
				<MapInteraction
					key={Math.random()}
					type='defaults'
					options={mapInteractions}
				/>
			</Interactions>

			<Controls>
				{Object.entries(mapControls).map(([type, use]) => {
					if (!use) {
						return null;
					}

					return (
						<MapControl
							key={Math.random()}
							type={type}
						/>
					);
				})}
			</Controls>
		</OpenLayersMap>
	);
};
