'use server';
import axios from 'axios';
import {cookies} from 'next/headers';

interface TravelExperiencePayload {
	age: number;
	income: string;
	riskTolerance: string;
	fitnessLevel: string;
	interests: string[];
	languages: string[];
	tripDuration: string;
	travelGroup: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const createTravelExperience = async (payload: TravelExperiencePayload) => {
	try {
		const { age, income, riskTolerance, fitnessLevel, interests, languages, tripDuration, travelGroup } = payload;

		if (!age || parseInt(age.toString()) < 1 || parseInt(age.toString()) > 150) {
			return { error: 'Age is required and must be between 1 and 150' };
		}

		const incomeList = ['basso', 'medio', 'alto', 'altissimo'];
		if (!income || !incomeList.includes(income.toLowerCase())) {
			return { error: 'Income is required and must be one of: basso, medio, alto, altissimo' };
		}

		const riskList = ['basso', 'medio', 'alto'];
		if (!riskTolerance || !riskList.includes(riskTolerance.toLowerCase())) {
			return { error: 'Risk Tolerance is required and must be one of: basso, medio, alto' };
		}

		const fitnessList = ['sedentario', 'moderato', 'attivo', 'atletico'];
		if (!fitnessLevel || !fitnessList.includes(fitnessLevel.toLowerCase())) {
			return { error: 'Fitness Level is required and must be one of: sedentario, moderato, attivo, atletico' };
		}

		if (!interests || interests.length === 0) {
			return { error: 'At least one interest is required' };
		}

		if (!languages || languages.length === 0) {
			return { error: 'At least one language is required' };
		}

		const durationList = ['weekend', 'settimana', 'due_settimane', 'mese_o_piu'];
		if (!tripDuration || !durationList.includes(tripDuration.toLowerCase())) {
			return { error: 'Trip Duration is required and must be one of: weekend, settimana, due_settimane, mese_o_piu' };
		}

		const groupList = ['solo', 'coppia', 'amici', 'famiglia_bambini', 'famiglia_adulti'];
		if (!travelGroup || !groupList.includes(travelGroup.toLowerCase())) {
			return { error: 'Travel Group is required and must be one of: solo, coppia, amici, famiglia_bambini, famiglia_adulti' };
		}

		const cookieStore = await cookies();
		const token = cookieStore.get('sessionId')?.value;

		if (!token) {
			return { error: 'You must be logged in to create a travel experience' };
		}

		const response = await axios.post(
			`${url}/travel-experience`,
			{
				age,
				income,
				riskTolerance,
				fitnessLevel,
				interests,
				languages,
				tripDuration,
				travelGroup
			},
			{
				headers: {
					Authorization: token
				}
			}
		);

		console.log('Travel Experience Response:', response.data);

		return { success: response.data.data, message: response.data.message };
	} catch (err: any) {
		const apiError = err?.response?.data?.message || err?.response?.data?.error;
		return { error: apiError ?? err.message ?? 'Something went wrong' };
	}
};

export { createTravelExperience };
