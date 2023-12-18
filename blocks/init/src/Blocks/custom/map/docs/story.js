import React from 'react';
import manifest from './../manifest.json';
import { Gutenberg } from '../../../../../../../.storybook/assets';

export default {
	title: 'Blocks/Map',
};

const additionalDescription = `
<p>Block that displays a map with various configurable layers. <a href="https://openlayers.org/">Open Layers</a> is used as the base for the map.</p>
<p>Various map layers are supported:</p>
<ul>
	<li>OpenStreetMap raster (free)</li>
	<li>Mapbox vector maps (paid)</li>
	<li>Mapbox raster maps (paid)</li>
	<li>Vector maps (based on OpenStreetMap) with Mapbox-compatible styles (e.g. from MapTiler or Mapbox, paid)</li>
	<li>MapTiler raster maps (XYZ or JSON format, paid)</li>
	<li>MapTiler raster tiles (XYZ or JSON format, paid)</li>
	<li>MapTiler vector maps (XYZ, .pbf format, paid)</li>
	<li>GeoJSON</li>
</ul>
`;

export const block = () => <Gutenberg manifest={manifest} additionalDescription={additionalDescription} />;
