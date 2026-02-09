import {cookies} from 'next/headers';
import axios from 'axios';
import ResultsTableItem from '@/components/results-table-item';
import ResultsList from '@/components/results-list';

const url = process.env.NEXT_PUBLIC_API_URL;

export interface RecommendationResponse {
	id: number;
	userId: number;
	age: number;
	risk: string;
	income: number;
	updatedAt: string, //'2026-02-09T10:03:39.575Z'
	createdAt: string,
	deletedAt?: string,
	result?: string
}

export default async function MyResultsListPage() {

	// const params = useParams<{ id: string}>();
	//
	// console.log(params);

	const cookieStore = await cookies();
	const token = cookieStore.get('sessionId')?.value;

	const response = await axios.get(
		`${url}/recommendations`,
		{
			headers: {
				Authorization: token
			}
		}
	);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="mt-16 mb-4 text-center">My recommendations results</h1>
			<ResultsList data={response.data.data} />
		</div>
	);
}
