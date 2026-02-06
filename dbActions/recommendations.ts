'use server';
import axios     from 'axios';
import {cookies} from 'next/headers';

interface RecommendationPayload {
	age: number;
	risk: string;
	income: number;
}

const url = process.env.API_URL;

const addRecommendation = async (payload: RecommendationPayload) => {
	try {
		const {age, income, risk} = payload;

		if (
			!age ||
			!parseInt(age.toString()) ||
			parseInt(age.toString()) < 0 ||
			parseInt(age.toString()) > 150
		) {
			return {error: 'Age is required'};
		}
		if (
			!income ||
			!parseInt(income.toString()) ||
			parseInt(income.toString()) < 0
		) {
			return {error: 'income is required'};
		}

		const riskList = ['low', 'medium', 'high'];

		const riskLowerCase = risk?.toLowerCase().trim();

		if (!risk && !riskList.includes(riskLowerCase)) {
			return {error: 'Risk Tolerance is required'};
		}
		const cookieStore = await cookies();
		const token = cookieStore.get('sessionId')?.value;

		const response = await axios.post(
			`${url}/recommendation`,
			{
				...payload
			},
			{
				headers: {
					Authorization: token
				}
			}
		);

		return {success: response.data.data.message};
	} catch (error: any) {
		return {error: error.message};
	}
};

export {addRecommendation};
