import React from 'react';

interface InputFieldType {
	type?: 'text' | 'select' | 'number' | 'password' | 'email';
	value: string;
	setValue: (value: string) => void;
	label: string;
	options?: string[];
	required?: boolean;
	disabled?: boolean;
}

const InputField: React.FC<InputFieldType> = ({value, setValue, label, type, options, required, disabled}) => {
	const id = label.replaceAll(' ', '_');
	return (
		<div className="flex flex-col">
			<label title={label} id={id} className="text-black">{label}</label>
			{
				type === 'select' && options ?
					<select className="border border-b-blue-800 py-2 px-4" disabled={disabled} required={required} onChange={(value) => {
						setValue(value.target.value);
					}}>
						{ options.map(o => <option key={o}>{o}</option>)}
					</select>
					: <input value={value}
							 type={type}
							 className="border border-b-blue-800 py-2 px-4 text-black"
							 id={'age'}
							 required={required}
							 disabled={disabled}
							 onChange={(value) => {
								 setValue(value.target.value);
							 }}/>
			}

		</div>
	);
}

export default InputField;
