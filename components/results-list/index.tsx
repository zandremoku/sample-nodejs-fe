"use client";

import { toast } from '@/lib/toast';
import ResultsTableItem from '@/components/results-table-item';
import { TravelExperienceResponse } from '@/app/my-travel-experiences/page';
import { deleteTravelExperience } from '@/app/my-travel-experiences/actions';
import { useState } from 'react';

interface ResultsListProps {
	data: TravelExperienceResponse[];
}

const ResultsList: React.FC<ResultsListProps> = ({ data }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (idToDelete: number) => {
		if (isDeleting) return;

		setIsDeleting(true);
		try {
			const result = await deleteTravelExperience(idToDelete);

			if (result.success) {
				toast.success('Travel experience profile deleted successfully');
			} else {
				toast.error('Sorry, could not delete this profile');
			}
		} catch (error) {
			toast.error('An error occurred while deleting');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="w-full max-w-5xl mx-4 space-y-6">
			{data && data.length > 0 ? (
				<div className="space-y-6">
					{data.map((experience: TravelExperienceResponse) => (
						<ResultsTableItem
							key={experience.id}
							itemData={experience}
							deleteClicked={handleDelete}
							isDeleting={isDeleting}
						/>
					))}
				</div>
			) : (
				<div className="text-center text-gray-500 py-8">
					No travel experience profiles found
				</div>
			)}
		</div>
	);
};

export default ResultsList;
