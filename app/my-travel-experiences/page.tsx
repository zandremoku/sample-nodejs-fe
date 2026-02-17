import { cookies } from 'next/headers';
import axios from 'axios';
import ResultsList from '@/components/results-list';

const url = process.env.NEXT_PUBLIC_API_URL;

export interface ExperienceMatch {
	category: string;
	score: number;
	reasons: string[];
	warnings: string[];
	exampleDestinations: string[];
}

export interface TravelExperienceResponse {
	id: number;
	userId: number;
	age: number;
	income: string;
	riskTolerance: string;
	fitnessLevel: string;
	interests: string[];
	languages: string[];
	tripDuration: string;
	travelGroup: string;
	topMatches: ExperienceMatch[];
	allMatches: ExperienceMatch[];
	profileSummary: string;
	updatedAt: string;
	createdAt: string;
	deletedAt?: string;
}

export default async function MyTravelExperiencesPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;

	let experiences: TravelExperienceResponse[] = [];
	let error = null;

	try {
		const response = await axios.get(
			`${url}/travel-experiences`,
			{
				headers: {
					Authorization: token
				}
			}
		);
		experiences = response.data.data || [];
	} catch (err: any) {
		error = err?.response?.data?.message || 'Failed to load travel experiences';
		console.error('Error fetching travel experiences:', error);
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="mt-16 mb-4 text-center">My Travel Experience Profiles</h1>
			{error && (
				<div className="text-red-600 mb-4">
					{error}
				</div>
			)}
			{experiences.length === 0 ? (
				<p className="text-gray-600 mt-8">No travel experience profiles yet. Create one to get started!</p>
			) : (
				<ResultsList data={experiences} />
			)}
		</div>
	);
}
