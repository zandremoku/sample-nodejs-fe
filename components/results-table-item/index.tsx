"use client";

import { TravelExperienceResponse } from '@/app/my-travel-experiences/page';

interface ResultsTableItemParams {
	itemData: TravelExperienceResponse;
	deleteClicked?: (idToDelete: number) => void;
	isDeleting?: boolean;
}

const ResultsTableItem: React.FC<ResultsTableItemParams> = ({ itemData, deleteClicked, isDeleting }) => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
			{/* Header with profile summary */}
			<div className="mb-4">
				<div className="flex justify-between items-start mb-3">
					<h3 className="text-lg font-semibold text-gray-800">Travel Profile #{itemData.id}</h3>
					<span className="text-sm text-gray-500">{new Date(itemData.createdAt).toLocaleDateString()}</span>
				</div>
				<p className="text-sm text-gray-600 italic">{itemData.profileSummary}</p>
			</div>

			{/* Profile Details */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
				<div>
					<p className="text-xs text-gray-500 uppercase font-semibold">Age</p>
					<p className="text-lg font-semibold">{itemData.age}</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 uppercase font-semibold">Income</p>
					<p className="text-lg font-semibold capitalize">{itemData.income}</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 uppercase font-semibold">Risk</p>
					<p className="text-lg font-semibold capitalize">{itemData.riskTolerance}</p>
				</div>
				<div>
					<p className="text-xs text-gray-500 uppercase font-semibold">Fitness</p>
					<p className="text-lg font-semibold capitalize">{itemData.fitnessLevel}</p>
				</div>
			</div>

			{/* Interests & Languages */}
			<div className="mb-4">
				<p className="text-sm font-semibold text-gray-700 mb-2">Interests & Languages</p>
				<div className="space-y-2">
					<div className="flex gap-2 flex-wrap">
						{itemData.interests.slice(0, 3).map(interest => (
							<span key={interest} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
								{interest}
							</span>
						))}
						{itemData.interests.length > 3 && (
							<span className="text-xs text-gray-600">+{itemData.interests.length - 3} more</span>
						)}
					</div>
					<div className="flex gap-2 flex-wrap">
						{itemData.languages.map(lang => (
							<span key={lang} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
								{lang}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Top Matches */}
			<div className="mb-4">
				<p className="text-sm font-semibold text-gray-700 mb-3">🏆 Top 3 Experience Matches</p>
				<div className="space-y-3">
					{itemData.topMatches?.slice(0, 3).map((match, index) => (
						<div key={match.category} className="p-3 bg-gray-50 rounded border border-gray-200">
							<div className="flex items-center gap-3 mb-2">
								<span className="text-sm font-medium w-24">{index + 1}. {match.category}</span>
								<div className="flex-1 bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full"
										style={{ width: `${match.score}%` }}
									></div>
								</div>
								<span className="text-sm font-semibold text-gray-700 w-12 text-right">{match.score}/100</span>
							</div>
							{match.exampleDestinations && match.exampleDestinations.length > 0 && (
								<p className="text-xs text-gray-600">📍 {match.exampleDestinations.join(' · ')}</p>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Trip Info & Delete Button */}
			<div className="flex justify-between items-center pt-4 border-t border-gray-200">
				<div className="text-sm text-gray-600">
					<span className="font-medium capitalize">Trip: {itemData.tripDuration} · </span>
					<span className="capitalize">{itemData.travelGroup}</span>
				</div>
				<button
					onClick={() => {
						if (deleteClicked) {
							deleteClicked(itemData.id);
						}
					}}
					disabled={isDeleting}
					className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition duration-200 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isDeleting ? 'Deleting...' : 'Delete'}
				</button>
			</div>
		</div>
	);
};

export default ResultsTableItem;
