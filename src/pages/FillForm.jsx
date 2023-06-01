import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import post from "../post.js";

import Text from '../utils/Text';

function FillForm() {
	
	const [squares, setSquares] = useState([]); // state: 0=next, 1=loading, 2=done
	const { formId } = useParams();
	const [id, setId] = useState("");
	const [colors, setColors] = useState(["#000000", "#000000", "#000000"]); // background, box, button
	const [redirect, setRedirect] = useState("");
	const [logo, setLogo] = useState(0);

	useEffect(() => {
		if (squares.length === 3) {
			let newSquares = [...squares];
			newSquares.shift();
			setSquares(squares);
		}
	}, [squares]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let newSquares = [...squares];
		newSquares[squares.length - 1]["state"] = 1;
		setSquares(newSquares);
		post("/getNextQuestion", {"id":id,"response":event.target.response.value})
		.then((data) => {
			newSquares[squares.length - 1]["state"] = 2;
			setRedirect(data["redirect"]);
			setSquares(newSquare => [...newSquare, {"resp":data["q"],"redirect":data["redirect"],"state":0},]);
		});
	}

	useEffect(() => {
		if (id === "") {
			document.body.style.overflow = "hidden";
			post("/getConversationID", {"id":formId})
			.then((data) => {
				setId(data["id"]);
				setSquares(squares => [...squares, {"resp":data["startMessage"],"redirect":"","state":0},]);
				setColors([data["background"], data["box"], data["button"]]);
				setLogo(data["logo"]);
			});
		}
	}, []);

	return (
		<div className="container" style={{backgroundColor: colors[0], position: "relative"}}>
			{logo == "" ? "" : <img src={logo} className="absolute top-0 left-0 m-4 w-16 h-16" />}
			<Squares squares={squares} handleSubmit={handleSubmit} redirect={redirect} colors={colors} />
		</div>
	);
};

function Squares({ squares, handleSubmit, redirect, colors }) {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus({ preventScroll: true });
		}  
	}, [squares]);
	
	return (
	  <>
		{squares.map((square, i) => {
		  return square["redirect"] !== "" ? (
			<div key={i} className="square" style={{backgroundColor: colors[1]}}>
			  <h1 className="text-lg font-semibold mb-2">
				<Text bg={colors[1]}>#{i+1}:</Text>
			  </h1>
			  <p><Text bg={colors[1]}>{square["resp"]}</Text></p>
			  <a href={redirect} style={{backgroundColor: colors[2]}}>
				<p className="btn ml-3" >
					<Text bg={colors[2]}>Submit</Text>
				</p>
			  </a>
			</div>
		  ) : (
			<div key={i} className="square" style={{backgroundColor: colors[1]}}>
			  <h1 className="text-lg font-semibold mb-2">
				<Text bg={colors[1]}>#{i+1}:</Text>
			  </h1>
			  <p><Text bg={colors[1]}>{square["resp"]}</Text></p>
			  <form onSubmit={handleSubmit}>
				<input ref={i + 1 === squares.length ? inputRef : null} name="response" className="border-8 rounded-md w-5/6" disabled={square["state"] > 0} />
				{square["state"] > 0 ? (
				  <>{square["state"] == 1 ? (
					<button className="btn text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none ml-3" disabled>
					  <svg className="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
						<path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
					  </svg>
					  <span className="ml-2">Loading...</span>
					</button>
				  ) : (
					<button className="btn text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none ml-3" disabled>
					  Done!
					</button>
				  )}</>			  
				) : (
				  <><button
					type="submit"
					className="btn ml-3" style={{backgroundColor: colors[2]}} 
				  >
				  	<Text bg={colors[2]}>Next</Text>
				  </button></>
				)}
			  </form>
			</div>
		  );
		})}
	  </>
	);
}

export default FillForm;