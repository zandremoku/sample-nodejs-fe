'use server';
import axios from 'axios';
import {cookies} from 'next/headers';

interface TravelExperiencePayload {
	age: number;
	income: number;
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
		console.log(income)
		if (!income) {
			return { error: 'Income must be greater than zero' };
		}

		const riskList = ['low', 'medium', 'high'];
		if (!riskTolerance || !riskList.includes(riskTolerance.toLowerCase())) {
			return { error: 'Risk Tolerance is required and must be one of: low, medium, high' };
		}

		const fitnessList = ['sedentary', 'moderately_active', 'vigorously_active', 'extremely_active'];
		if (!fitnessLevel || !fitnessList.includes(fitnessLevel.toLowerCase())) {
			return { error: 'Fitness Level is required and must be one of: sedentary, moderately_active, vigorously_active, extremely_active' };
		}

		if (!interests || interests.length === 0) {
			return { error: 'At least one interest is required' };
		}

		if (!languages || languages.length === 0) {
			return { error: 'At least one language is required' };
		}

		const durationList = ['weekend', 'one_week', 'two_weeks', 'three_weeks_plus'];
		if (!tripDuration || !durationList.includes(tripDuration.toLowerCase())) {
			return { error: 'Trip Duration is required and must be one of: weekend, one_week, two_weeks, three_weeks_plus' };
		}

		const groupList = ['solo', 'couple', 'friends', 'family_children', 'family_adults'];
		if (!travelGroup || !groupList.includes(travelGroup.toLowerCase())) {
			return { error: 'Travel Group is required and must be one of: solo, couple, friends, family_children, family_adults' };
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
