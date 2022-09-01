import React from 'react';
import { __experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl } from '@wordpress/block-editor';
import { __experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar } from '@wordpress/block-editor';
import { __experimentalAlignmentMatrixControl as AlignmentMatrixControl } from '@wordpress/block-editor';

/**
 * An universal component that returns either the `AlignmentMatrixControl`/`BlockAlignmentMatrixControl` (newer WP versions) or `BlockAlignmentMatrixToolbar` (older WP versions).
 *
 * @param {object} props - Props usually passed to `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`
 */
 export const MatrixAlignControl = (props) => {
	if (AlignmentMatrixControl) {
		return (<AlignmentMatrixControl {...props} />);
	}

	if (BlockAlignmentMatrixControl) {
		return (<BlockAlignmentMatrixControl {...props} />);
	}

	if (BlockAlignmentMatrixToolbar) {
		return (<BlockAlignmentMatrixToolbar {...props} />);
	}

	return null;
};
