import { createReduxStore, register } from '@wordpress/data';

export const WRAPPER_STORE_NAME = 'wrapperColumnPreviewStore';

const DEFAULT_STATE = {
	previewVisible: false,
	graphicalEditing: false,
	currentClientId: '',
};

export const initWrapperStore = () => {
	const wrapperStore = createReduxStore(WRAPPER_STORE_NAME, {
		reducer: (state = DEFAULT_STATE, action) => {
			switch (action.type) {
				case 'SHOW_PREVIEW': {
					return {
						...state,
						previewVisible: true,
					};
				}
				case 'HIDE_PREVIEW': {
					return {
						...state,
						previewVisible: false,
					};
				}
				case 'TOGGLE_PREVIEW': {
					return {
						...state,
						previewVisible: !state.previewVisible,
					};
				}
				case 'TOGGLE_GRAPHICAL_EDITING': {
					return {
						...state,
						graphicalEditing: !state.graphicalEditing,
					};
				}
				case 'SET_CLIENT_ID': {
					return {
						...state,
						currentClientId: action.clientId,
					};
				}
				default: {
					return state;
				}
			}
		},
		actions: {
			showPreview: () => ({
				type: 'SHOW_PREVIEW',
			}),
			hidePreview: () => ({
				type: 'HIDE_PREVIEW',
			}),
			togglePreview: () => ({
				type: 'TOGGLE_PREVIEW'
			}),
			toggleGraphicalEditing: () => ({
				type: 'TOGGLE_GRAPHICAL_EDITING'
			}),
			setClientId: (clientId) => ({
				type: 'SET_CLIENT_ID',
				clientId: clientId,
			}),
		},
		selectors: {
			get: (state) => state,
		},
	});

	register(wrapperStore);
};
