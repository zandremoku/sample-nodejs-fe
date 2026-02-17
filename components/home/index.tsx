'use client';

import {useState}                  from 'react';
import InputField                  from '@/components/input';
import {toast}                     from '@/lib/toast';
import {createTravelExperience}    from '@/dbActions/travelExperiences';

const Home = () => {
	const incomeList = ['basso', 'medio', 'alto', 'altissimo'];
	const riskList = ['basso', 'medio', 'alto'];
	const fitnessList = ['sedentario', 'moderato', 'attivo', 'atletico'];
	const interestsList = ['natura', 'storia', 'arte', 'gastronomia', 'avventura', 'relax', 'nightlife', 'sport', 'fotografia', 'architettura'];
	const languagesList = ['italiano', 'inglese', 'spagnolo', 'francese', 'tedesco', 'portoghese', 'arabo', 'giapponese', 'mandarino', 'russo'];
	const durationList = ['weekend', 'settimana', 'due_settimane', 'mese_o_piu'];
	const groupList = ['solo', 'coppia', 'amici', 'famiglia_bambini', 'famiglia_adulti'];

	const [age, setAge] = useState('');
	const [income, setIncome] = useState(incomeList[0]);
	const [riskTolerance, setRiskTolerance] = useState(riskList[0]);
	const [fitnessLevel, setFitnessLevel] = useState(fitnessList[0]);
	const [interests, setInterests] = useState<string[]>([]);
	const [languages, setLanguages] = useState<string[]>(['italiano']);
	const [tripDuration, setTripDuration] = useState(durationList[0]);
	const [travelGroup, setTravelGroup] = useState(groupList[0]);
	const [formResult, setFormResult] = useState<any>(null);

	const handleInterestsChange = (interest: string) => {
		setInterests(prev => 
			prev.includes(interest) 
				? prev.filter(i => i !== interest)
				: [...prev, interest]
		);
	};

	const handleLanguagesChange = (language: string) => {
		setLanguages(prev => 
			prev.includes(language) 
				? prev.filter(l => l !== language)
				: [...prev, language]
		);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!age || !parseInt(age)) {
			toast.error('Age is required');
			return;
		}
		if (interests.length === 0) {
			toast.error('At least one interest is required');
			return;
		}
		if (languages.length === 0) {
			toast.error('At least one language is required');
			return;
		}

		const payload = {
			age: parseInt(age),
			income,
			riskTolerance,
			fitnessLevel,
			interests,
			languages,
			tripDuration,
			travelGroup
		};

		const response = await createTravelExperience(payload);

		console.log('createTravelExperience', response);
		if (response.error) {
			toast.error(response.error);
			return;
		}

		toast.success('Travel experience profile created successfully!');
		setFormResult(response.success);
		setAge('');
		setIncome(incomeList[0]);
		setRiskTolerance(riskList[0]);
		setFitnessLevel(fitnessList[0]);
		setInterests([]);
		setLanguages(['italiano']);
		setTripDuration(durationList[0]);
		setTravelGroup(groupList[0]);
	};

	return (
		<div className="flex flex-col gap-10 w-full max-w-4xl items-center py-32 px-4 sm:px-16">
			{formResult ? <>
					<h1 className="text-3xl font-bold">🎉 Your Travel Experience Profile</h1>
					
					<div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
						<h2 className="text-xl font-semibold mb-4">📋 Profile Summary</h2>
						<p className="text-gray-700 mb-6 italic">{formResult.profileSummary}</p>

						<h2 className="text-xl font-semibold mt-6 mb-4">🏆 Top 5 Recommended Experiences</h2>
						<div className="space-y-4">
							{formResult.topMatches?.map((match: any, index: number) => (
								<div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
									<div className="flex justify-between items-start mb-2">
										<h3 className="font-semibold text-lg">{match.category}</h3>
										<span className="text-2xl font-bold text-blue-600">{match.score}/100</span>
									</div>
									
									{/* Progress bar */}
									<div className="w-full bg-gray-200 rounded-full h-2 mb-3">
										<div 
											className="bg-blue-500 h-2 rounded-full" 
											style={{width: `${match.score}%`}}
										></div>
									</div>

									{match.reasons && match.reasons.length > 0 && (
										<div className="mb-2">
											<p className="text-sm font-medium text-green-700">✅ Why it suits you:</p>
											<ul className="text-sm text-gray-700 ml-4 mt-1">
												{match.reasons.map((reason: string, i: number) => (
													<li key={i}>• {reason}</li>
												))}
											</ul>
										</div>
									)}

									{match.warnings && match.warnings.length > 0 && (
										<div className="mb-2">
											<p className="text-sm font-medium text-amber-700">⚠️ Things to consider:</p>
											<ul className="text-sm text-gray-700 ml-4 mt-1">
												{match.warnings.map((warning: string, i: number) => (
													<li key={i}>• {warning}</li>
												))}
											</ul>
										</div>
									)}

									{match.exampleDestinations && match.exampleDestinations.length > 0 && (
										<div>
											<p className="text-sm font-medium text-blue-700">📍 Example destinations:</p>
											<p className="text-sm text-gray-600 ml-4 mt-1">{match.exampleDestinations.join(' · ')}</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					<button onClick={()=>{
						setFormResult(null);
					}}
							className="py-3 px-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200">
						Create New Profile
					</button>
				</>

				: <>
					<h1 className="text-3xl font-bold text-center">✈️ Travel Experience Profiling</h1>
					<p className="text-gray-600 text-center">Tell us about yourself to discover your perfect travel experiences!</p>
					
					<form onSubmit={handleSubmit} className="w-full space-y-6">
						{/* Basic Info Section */}
						<div className="border-t pt-6">
							<h2 className="text-xl font-semibold mb-4">👤 Basic Information</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<InputField value={age} setValue={setAge} label="Age" type="number" />
								<InputField value={income} setValue={setIncome} label="Income Level" type="select" options={incomeList} />
								<InputField value={riskTolerance} setValue={setRiskTolerance} label="Risk Tolerance" type="select" options={riskList} />
								<InputField value={fitnessLevel} setValue={setFitnessLevel} label="Fitness Level" type="select" options={fitnessList} />
							</div>
						</div>

						{/* Interests Section */}
						<div className="border-t pt-6">
							<h2 className="text-xl font-semibold mb-4">❤️ Your Interests (select at least one)</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
								{interestsList.map(interest => (
									<label key={interest} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded">
										<input 
											type="checkbox" 
											checked={interests.includes(interest)}
											onChange={() => handleInterestsChange(interest)}
											className="w-4 h-4 rounded"
										/>
										<span className="text-sm capitalize">{interest}</span>
									</label>
								))}
							</div>
						</div>

						{/* Languages Section */}
						<div className="border-t pt-6">
							<h2 className="text-xl font-semibold mb-4">🗣️ Languages You Speak (select at least one)</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
								{languagesList.map(language => (
									<label key={language} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded">
										<input 
											type="checkbox" 
											checked={languages.includes(language)}
											onChange={() => handleLanguagesChange(language)}
											className="w-4 h-4 rounded"
										/>
										<span className="text-sm capitalize">{language}</span>
									</label>
								))}
							</div>
						</div>

						{/* Trip Details Section */}
						<div className="border-t pt-6">
							<h2 className="text-xl font-semibold mb-4">🧳 Trip Details</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<InputField value={tripDuration} setValue={setTripDuration} label="Trip Duration" type="select" options={durationList} />
								<InputField value={travelGroup} setValue={setTravelGroup} label="Who are you traveling with?" type="select" options={groupList} />
							</div>
						</div>

						<div className="border-t pt-6 flex justify-center sm:justify-end">
							<button type="submit" className="py-3 px-8 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200">
								Discover Your Travel Matches
							</button>
						</div>
					</form>
				</>
			}
		</div>
	);
};

export default Home;
