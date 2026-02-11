'use client';

import {useState}          from 'react';
import InputField          from '@/components/input';
import {toast}             from '@/lib/toast';
import {addRecommendation} from '@/dbActions/recommendations';

const Home = () => {
	const riskList = ['low', 'medium', 'high'];
	const [age, setAge] = useState('');
	const [income, setIncome] = useState('');
	const [risk, setRisk] = useState(riskList[0]);
	const [formResult, setFormResult] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!age || !parseInt(age)) {
			toast.error('Age is required');
			return;
		}
		if (!income || !parseInt(income)) {
			toast.error('Income is required');
			return;
		}
		if (!risk || !riskList.includes(risk)) {
			toast.error('Risk Tolerance is required');
			return;
		}
		const payload = {
			risk,
			age: parseInt(age),
			income: parseInt(income)
		};
		const response = await addRecommendation(payload);

		console.log('addRecommendation', response);
		if (response.error) {
			toast.error(response.error);
			return;
		}

		setFormResult(response.success);
		setAge('');
		setRisk(riskList[0]);
		setIncome('');
	};

	return (
		<div className="flex flex-col gap-10 w-full max-w-3xl items-center py-32 px-16">
			{formResult ? <>
					<h1>Here is your result:</h1>
					<p>{formResult}</p>
					<button onClick={()=>{
						setFormResult('');
					}}
							className="py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200">New enquiry
					</button>
				</>

				: <>
					<h1>Welcome! Please fill the form in order to get your result!</h1>
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<InputField value={age} setValue={setAge} label={'Age'} type="number"></InputField>
							<InputField value={income} setValue={setIncome} label={'Income'}></InputField>
							<InputField value={risk} setValue={setRisk} label={'Risk'} type="select"
										options={['low', 'medium', 'high']}></InputField>
						</div>
						<div className="mt-4 flex justify-center sm:justify-end">
							<button type="submit"
									className="py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200">Submit
							</button>
						</div>
					</form>
				</>
			}
		</div>
	);
};

export default Home;
