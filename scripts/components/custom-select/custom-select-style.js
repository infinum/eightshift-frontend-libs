/**
 * Default styles shared by all Select components.
 */

// Shared default color scheme.
export const defaultEightshiftColorScheme = (theme) => {
	return ({
		...theme,
		borderRadius: 4,
		colors: {
			...theme.colors,
			primary25: 'var(--es-admin-cool-gray-100)',
			primary50: 'var(--es-admin-cool-gray-200)',
			primary75: 'var(--es-admin-cool-gray-600)',
			primary: 'var(--wp-admin-theme-color, var(--es-admin-accent-color-default))',
			danger: 'var(--es-admin-red-500)',
			neutral0: 'var(--es-admin-pure-white)',
			neutral5: 'var(--es-admin-cool-gray-50)',
			neutral10: 'var(--es-admin-cool-gray-100)',
			neutral20: 'var(--es-admin-cool-gray-200)',
			neutral30: 'var(--es-admin-cool-gray-300)',
			neutral40: 'var(--es-admin-cool-gray-400)',
			neutral50: 'var(--es-admin-cool-gray-500)',
			neutral60: 'var(--es-admin-cool-gray-600)',
			neutral70: 'var(--es-admin-cool-gray-700)',
			neutral80: 'var(--es-admin-cool-gray-800)',
			neutral90: 'var(--es-admin-cool-gray-900)'
		},
	});
};

// Shared default styles.
export const defaultEightshiftStyles = {
	// Dropdown menu.
	menu: (provided, state) => {
		let marginStyle = {
			marginTop: 4,
		};

		if (state?.placement === 'top') {
			marginStyle = {
				marginBottom: 4,
			};
		}

		return {
			...provided,
			...marginStyle,
			zIndex: 9999,
		};
	},

	menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),

	// Main control.
	control: (provided, state) => {
		return {
			...provided,
			'&:hover': {
				...provided['&:hover'],
				borderColor: state.theme.colors.neutral50,
			},
			borderColor: state.theme.colors.neutral40,
			height: state.isMulti ? provided.height : 36,
			minHeight: state.isMulti ? provided.minHeight : 36,
		};
	},

	// Option in the dropdown menu.
	option: (provided) => ({
		...provided,
		margin: '0.125rem 0.375rem',
		width: 'calc(100% - 0.75rem)',
		borderRadius: 3,
	}),

	// Input TextBox.
	input: (provided) => {
		return {
			...provided,
			padding: 0,
			margin: 0,
		};
	},

	// Main container in the dropdown.
	valueContainer: (provided, state) => ({
		...provided,
		padding: state.isMulti && state.hasValue ? '0.125rem' : '0.125rem 0.25rem',
	}),

	// Multi-item 'chip' - single inner item.
	multiValue: (provided, state) => ({
		...provided,
		'&:hover': {
			...provided['&:hover'],
			borderColor: state.theme.colors.neutral20,
		},
		borderRadius: 3,
		border: `1px solid ${state.theme.colors.neutral10}`,
		backgroundColor: state.theme.colors.neutral10,
		cursor: state.isDisabled ? 'none' : 'pointer',
	}),

	// Multi-select value label and remove button.
	multiValueLabel: (provided) => ({
		...provided,
		fontSize: '90%',
		padding: '0.2rem 0.25rem',
		paddingLeft: '0.25rem', // To override the default.
		display: 'flex',
		alignItems: 'center',
	}),

	multiValueRemove: (provided) => ({
		...provided,
		paddingLeft: '0.25rem',
		paddingRight: '0.25rem',
		paddingTop: '0.25rem',
		paddingBottom: '0.25rem',
		borderRadius: '0 0.125rem 0.125rem 0',
	}),

	// Indicators (dropdown arrow, clear all button, ...).
	dropdownIndicator: (provided, state) => ({
		...provided,
		'&:hover': {
			...provided['&:hover'],
			color: state.theme.colors.neutral50,
		},
		color: state.theme.colors.neutral40,
		padding: 0,
		margin: 0,
		width: '1.5rem',
	}),
	clearIndicator: (provided, state) => ({
		...provided,
		'&:hover': {
			...provided['&:hover'],
			color: state.theme.colors.neutral50,
		},
		color: state.theme.colors.neutral40,
		padding: 0,
		margin: 0,
		width: '1.5rem',
	}),
	loadingIndicator: (provided, state) => ({
		...provided,
		color: state.theme.colors.neutral40,
		padding: 0,
		margin: 0,
		width: '1.5rem',
	}),
};
