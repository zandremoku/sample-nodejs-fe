'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const url = process.env.API_URL;

export async function deleteRecommendation(id: number) {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('sessionId')?.value;

		const response = await axios.delete(
			`${url}/recommendation/${id}`,
			{
				headers: {
					Authorization: token
				}
			}
		);

		// Revalidate the page to refresh the data
		revalidatePath('/my-results-list');

		return { success: true };
	} catch (error) {
		console.error('Delete error:', error);
		return { success: false, error: 'Failed to delete recommendation' };
	}
}
