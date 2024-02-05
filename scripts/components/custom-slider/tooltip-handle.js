import React from 'react';
import Tooltip from 'rc-tooltip';
import raf from 'rc-util/lib/raf';
import { __, sprintf } from '@wordpress/i18n';

export const renderHandle = ({ tooltipPlacement, tooltipFormat, hasFocus = false }) => {
	return (
		(node, handleProps) => {
			return (
				<HandleTooltip
					value={handleProps.value}
					visible={hasFocus}
					tipFormatter={tooltipFormat}
					placement={tooltipPlacement}
				>
					{node}
				</HandleTooltip>
			);
		}
	);
};

export const renderColumnConfigSliderHandle = ({
	value,
	hasFocus = false,
	noOffsetHandle = false,
	noWidthHandle = false,
}) => {
	return (
		(node, handleProps) => {
			if (handleProps.index === 0 && noOffsetHandle) {
				return null;
			}

			if (handleProps.index === 1 && noWidthHandle) {
				return null;
			}

			const [rawOffset, rawWidth] = value;

			const offset = rawOffset ?? 1;
			const width = rawWidth ?? 1;

			const diff = width - offset;

			const combineTooltip = diff <= 3;

			let tipFormat = () => sprintf(__('Width: %d', 'eightshift-frontend-libs'), width - offset);

			if (combineTooltip && !noOffsetHandle && !noWidthHandle) {
				tipFormat = () => {
					if ((offset - 1) === 0) {
						return sprintf(__('No offset, width: %d', 'eightshift-frontend-libs'), width - offset);
					}

					return sprintf(__('Offset %d, width: %d', 'eightshift-frontend-libs'), offset - 1, width - offset);
				};
			} else if ((!combineTooltip && handleProps.index === 0) || (combineTooltip && !noOffsetHandle && noWidthHandle)) {
				tipFormat = () => {
					if ((offset - 1) === 0) {
						return __('No offset', 'eightshift-frontend-libs');
					}

					return sprintf(__('Offset: %d', 'eightshift-frontend-libs'), offset - 1);
				};
			}

			let showTooltip = hasFocus;

			if (handleProps.index === (noOffsetHandle ? 0 : 1) && combineTooltip) {
				showTooltip = false;
			}

			return (
				<HandleTooltip
					value={handleProps.value}
					visible={showTooltip}
					tipFormatter={tipFormat}
					placement='top'
				>
					{node}
				</HandleTooltip>
			);
		}
	);
};

const HandleTooltip = (props) => {
	const { value, children, visible, tipFormatter = (val) => val, placement, ...restProps } = props;

	const tooltipRef = React.useRef();
	const rafRef = React.useRef(null);

	function cancelKeepAlign() {
		raf.cancel(rafRef.current);
	}

	function keepAlign() {
		rafRef.current = raf(() => {
			if (tooltipRef.current && tooltipRef.current.forcePopupAlign) {
				tooltipRef.current?.forcePopupAlign();
			}
		});
	}

	React.useEffect(() => {
		if (visible) {
			keepAlign();
		} else {
			cancelKeepAlign();
		}

		return cancelKeepAlign;
	}, [value, visible]);

	return (
		<Tooltip
			placement={placement}
			showArrow={false}
			overlay={tipFormatter(value)}
			overlayInnerStyle={{ minHeight: 'auto', minWidth: 'max-content' }}
			overlayClassName='es-pt-0! es-pb-1.5! es-px-0! es-font-weight-600 es-opacity-100! es-custom-slider__tooltip'
			ref={tooltipRef}
			visible={visible}
			{...restProps}
		>
			{children}
		</Tooltip>
	);
};
