"use client";

import {RecommendationResponse} from '@/app/my-results-list/page';

interface ResultsTableItemParams {
	itemData: RecommendationResponse;
	deleteClicked?: (idToDelete: number) => void;
	isDeleting?: boolean;
}

const ResultsTableItem : React.FC<ResultsTableItemParams> = ({itemData, deleteClicked, isDeleting}) => {
	return (
		<div className="grid grid-cols-5 p-4 not-last:border-b border-b-cyan-700">
			<p>{itemData.age}</p>
			<p>{itemData.income}</p>
			<p>{itemData.risk}</p>
			<p>{itemData.result || '-'}</p>
			<div>
				<button
					onClick={() => {
						if (deleteClicked) {
							deleteClicked(itemData.id);
						}
					}}
					disabled={isDeleting}
					className="py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 disabled:cursor-not-allowed"
				>
					{isDeleting ? 'Deleting...' : 'Delete'}
				</button>
			</div>
		</div>
	);
}

export default ResultsTableItem;
