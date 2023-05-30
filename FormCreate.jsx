import React, { useRef, useState, useEffect } from 'react';
import AutoResizeTextarea from '../utils/AutoResizeTextarea';
import Text from '../utils/Text';

function FormCreate({ handleSubmit, values, error }) {
	const [bg, setBg] = useState(values.length === 0 ? "#888888" : values["background"]);
	const [box, setBox] = useState(values.length === 0 ? "#ffffff" : values["box"]);
	const [btn, setBtn] = useState(values.length === 0 ? "#0000ff" : values["button"]);
	const [logo, setLogo] = useState(values.length === 0 ? "" : values["logo"]);
	
	const bgInput = useRef(null);
	const boxInput = useRef(null);
	const btnInput = useRef(null);
	const logoInput = useRef(null);
	
	const handleBackgroundChange = () => {
		setBg(bgInput.current.value);
	};
	
	const handleBoxChange = () => {
		setBox(boxInput.current.value);
	};
	
	const handleButtonChange = () => {
		setBtn(btnInput.current.value);
	};
	const handleLogoChange = () => {
		setLogo(logoInput.current.value);
	}
	
	return <form onSubmit={handleSubmit}>	
		
		<h1 className="text-xl font-bold mb-2 text-slate-800">Format</h1>
	
		<div className="relative max-w-sm mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 items-start md:max-w-2xl lg:max-w-none">
			<div className="border-8 rounded-md">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Form Name <span className="text-rose-500">*</span>
				</label>
				<input autoFocus className="form-input w-full" type="text" name="name" defaultValue={values.length === 0 ? "" : values["name"]} />
			</div>
		
			<div className="border-8 rounded-md col-span-2">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Goal <span className="text-rose-500">*</span>
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="goal" defaultValue={values.length === 0 ? "" : values["goal"]} />
				<div className="text-xs mt-1"><br />Examples: collecting feedback, running a survey, interviewing a person for a job</div>
			</div>

			<div className="border-8 rounded-md col-span-full">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Questions <span className="text-rose-500">*</span>
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="questions" defaultValue={values.length === 0 ? "" : values["questions"]} />
				<div className="text-xs mt-1">May or may not include the inital question. <br />Example	: 1. How was your experience at our restaurant? 2. What about our services did you like? 3. What about our services did you dislike? 4. Is there anything else you would like to share or any suggestions you have for us to improve our services?</div>
			</div>
			
			<div className="border-8 rounded-md col-span-2">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Questioning Prompting
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="initialPrompting" defaultValue={values.length === 0 ? "" : values["initialPrompting"]} />
				<div className="text-xs mt-1">Give additional instructions or information to FormGPT during the questioning phase. <br />Example	: Invite the customer to come back and tell them about our 10% off deal on Friday.</div>
			</div>
			
			<div className="border-8 rounded-md">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Summary Prompting
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="summaryPrompting" defaultValue={values.length === 0 ? "" : values["summaryPrompting"]} />
				<div className="text-xs mt-1">If you would like to, provide additional instructions for the conversation summarizing phase. <br />Example	: "Make sure to mention what the customer said about our milkshake.<br />Note that this will not ask the user about the milkshake, but only guarentee that it is mentioned in the summary if the customer did!</div>
			</div>
			
			{values.length === 0 ? <div className="border-8 rounded-md col-span-2">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Custom Table
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="table" defaultValue={values.length === 0 ? "" : values["tbl"]} />
				<div className="text-xs mt-1">Provide a list of columns in a table. They should be formatted as questions that will have been answered and separated newlines (pressing Enter). <br />Example:<br />How did the customer describe their experience?<br />What did the customer order?<br />Who served the customer?<br />Note that this will not guarentee this information is recorded, but instead create a table including exclusively this information!<br />A column will be added for NPS if enabled.</div>
			</div> : ""}

			{values.length === 0 ? <div className="flex items-center justify-between border-8 rounded-md">
				<label className="flex items-center">
					<input type="checkbox" className="form-checkbox" name="nps" defaultChecked={values.length === 0 ? "" : values["nps"] === 1} />
					<span className="text-sm ml-2 mr-8">Record NPS</span>
				</label>
				<div className="text-xs mt-1">This settings should be on for feedback forms and likely left off for others.<br /><a href="https://www.hotjar.com/net-promoter-score/" target="_blank" className="text-indigo-500 hover:text-indigo-600">Net Promoter Score</a> (NPS) measures customer advocacy on a 0-10 scale, and then colates those individual responses to a net promotion number from -100 to 100. It's a powerful tool for assessing satisfaction, identifying critical responses, and driving strategic decisions for business success. FormGPT automates NPS calculation and graphing, without specifically needing to ask for a number from 0-10.</div>
			</div> : ""}
		</div>			
		
		{values.length === 0 ? "" : <p className='mt-2'>Some features cannot be edited to prevent messy data. You should instead create a new form.</p>}

		<hr className="mt-4 mb-4" />

		<h1 className="text-xl font-bold mb-2 text-slate-800">Customization</h1>
		
		<div className="relative max-w-sm mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 items-start md:max-w-2xl lg:max-w-none">
			<div className="border-8 rounded-md">
			<label className="block text-sm font-medium mb-1" htmlFor="default">
				Background Color <span className="text-rose-500">*</span>
			</label>
			<input
				className="form-input w-full h-16"
				type="color"
				name="background"
				defaultValue={bg}
				ref={bgInput}
				onChange={handleBackgroundChange}
			/>
			</div>
		
			<div className="border-8 rounded-md">
			<label className="block text-sm font-medium mb-1" htmlFor="default">
				Box Color <span className="text-rose-500">*</span>
			</label>
			<input
				className="form-input w-full h-16"
				type="color"
				name="box"
				defaultValue={box}
				ref={boxInput}
				onChange={handleBoxChange}
			/>
			</div>
		
			<div className="border-8 rounded-md">
			<label className="block text-sm font-medium mb-1" htmlFor="default">
				Button Color <span className="text-rose-500">*</span>
			</label>
			<input
				className="form-input w-full h-16"
				type="color"
				name="button"
				defaultValue={btn}
				ref={btnInput}
				onChange={handleButtonChange}
			/>
			</div>
			
			<div className="border-8 rounded-md col-span-2">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Redirect
				</label>
				<AutoResizeTextarea className="form-input w-full" type="text" name="redirect" defaultValue={values.length === 0 ? "" : values["redirect"]} onChange={handleLogoChange} />
				<div className="text-xs mt-1">Choose a destination for the user to go after the form is complete. The default is google.com.</div>
			</div>
			
			<div className="border-8 rounded-md">
				<label className="block text-sm font-medium mb-1" htmlFor="default">
					Logo
				</label>
				<input className="form-input w-full" type="text" ref={logoInput} name="logo" onChange={handleLogoChange} defaultValue={values.length === 0 ? "" : values["logo"]} />
				<div className="text-xs mt-1">Write a link to a logo to be displayed in the top-left corner. It will be resized to a square.</div>
			</div>
		</div>
		
		<hr className="mt-4 mb-4" />

		<div className="container" style={{ backgroundColor: bg, height: "50vh", position: "relative" }}>
			{logo == "" ? "" : <img src={logo} className="absolute top-0 left-0 m-4 w-8 h-8" />}
			<div className="square" style={{ backgroundColor: box }}>
				<h1 className="text-lg font-semibold mb-2">
				<Text bg={box}>#1: Lorem ipsum</Text>
				</h1>
				<div>
				<input
					name="response"
					className="border-8 rounded-md w-5/6"
					value="This is a demo to show how your form will look. You can't fill out the form here!"
					disabled={true}
				/>
				<button
					disabled
					type="submit"
					className="btn ml-3"
					style={{ backgroundColor: btn }}
				>
					<Text bg={btn}>Next</Text>
				</button>
				</div>
			</div>
		</div>
		
		<hr className="mt-4 mb-4" />
	
		<p className="text-rose-600 mt-4">{error}</p>

		{values.length === 0 ? 
			<button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white">
				<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
					<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
				</svg>
				<span className="hidden xs:block ml-2">Create</span>
			</button>
		:
			<button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white">
				<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
					<path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
				</svg>
				<span className="hidden xs:block ml-2">Save</span>
			</button>
		}

	</form>
}

export default FormCreate;