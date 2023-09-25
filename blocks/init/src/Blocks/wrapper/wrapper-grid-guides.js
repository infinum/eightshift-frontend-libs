import { icons } from "@eightshift/frontend-libs/scripts";

export const GridGuides = ({ previewVisible, wrapperIsFullWidthLarge, wrapperMainClass }) => {
	if (!previewVisible) {
		return null;
	}

	const items = [];

	const maxItems = wrapperIsFullWidthLarge ? 14 : 12;

	for (let i = 1; i <= maxItems; i++) {
		const itemStyle = {
			gridColumn: `${wrapperIsFullWidthLarge ? i : i + 1} / span 1`,
		};

		let label = wrapperIsFullWidthLarge ? i - 1 : i;

		if (wrapperIsFullWidthLarge && i === 1) {
			label = icons.arrowsLeft;
		}
		if (wrapperIsFullWidthLarge && i === maxItems) {
			label = icons.arrowsRight;
		}

		items.push(
			<div
				className={`${wrapperMainClass}__grid-item es-button-icon-32`}
				style={itemStyle}
				key={i}
			>
				<span>{label}</span>
				<span>{label}</span>
			</div>
		);
	}

	return (
		<div className={`${wrapperMainClass}__grid`}>
			{items}
		</div>
	);
};
