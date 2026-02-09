"use client";

import { toast } from '@/lib/toast';
import ResultsTableItem from '@/components/results-table-item';
import { RecommendationResponse } from '@/app/my-results-list/page';
import { deleteRecommendation } from '@/app/my-results-list/actions';
import { useState } from 'react';

interface ResultsListProps {
	data: RecommendationResponse[];
}

const ResultsList: React.FC<ResultsListProps> = ({ data }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (idToDelete: number) => {
		if (isDeleting) return;

		setIsDeleting(true);
		try {
			const result = await deleteRecommendation(idToDelete);

			if (result.success) {
				toast.success('Item successfully deleted');
			} else {
				toast.error('Sorry, could not delete this');
			}
		} catch (error) {
			toast.error('An error occurred while deleting');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="border border-b-cyan-700 max-w-1/2">
			{data && (
				<div>
					<div className="grid grid-cols-5 p-4 border-b border-b-cyan-700">
						<h2>Age</h2>
						<h2>Income</h2>
						<h2>Risk</h2>
						<h2>Result</h2>
						<h2>Actions</h2>
					</div>
					{data.length > 0 &&
						data.map((r: RecommendationResponse) => (
							<ResultsTableItem
								key={r.id}
								itemData={r}
								deleteClicked={handleDelete}
								isDeleting={isDeleting}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default ResultsList;
