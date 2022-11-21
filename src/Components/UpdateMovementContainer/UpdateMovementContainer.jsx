import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MovementContext } from "../../Context/MovementContext";
import Loading from "../Loading/Loading";
import s from "./UpdateMovementContainer.module.css";

const UpdateMovementContainer = ({ handleSetIsOpen, activeMovement }) => {
	const { updateMovement } = useContext(MovementContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [inputs, setInputs] = useState({
		concept: activeMovement.concept,
		amount: activeMovement.amount,
		creation_date: activeMovement.creation_date,
		type: activeMovement.type,
	});
	const { concept, amount, creation_date, type } = inputs;
	const values = ["income", "outgoing"];

	useEffect(() => {
		setLoading(false);
	}, [activeMovement]);

	const handleSetInputs = e => {
		setInputs(prev => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (Object.values(inputs).every(Boolean)) {
			setError(null);
			updateMovement(inputs, activeMovement);
		} else {
			setError("Complete all inputs");
		}
	};
	return (
		<>
			<div className={s.overlay}></div>
			<div className={s.content}>
				{!loading ? (
					<>
						<p onClick={handleSetIsOpen}>&times;</p>
						<form onSubmit={handleSubmit}>
							<h2>Update Movement</h2>
							<label>Concept:</label>
							<input
								type="text"
								name="concept"
								value={concept}
								onChange={handleSetInputs}
							/>
							<br />
							<label>Amount:</label>
							<input
								type="number"
								name="amount"
								value={amount}
								onChange={handleSetInputs}
							/>
							<br />
							<label>Date:</label>
							<input
								type="date"
								name="creation_date"
								max={new Date()
									.toLocaleString()
									.split(",")[0]
									.split("/")
									.reverse()
									.join("-")}
								value={creation_date}
								onChange={handleSetInputs}
							/>
							<br />
							<label>Type:</label>
							<select
								name="type"
								defaultValue={type}
								onChange={handleSetInputs}
							>
								{values.map(el => (
									<option value={el} key={el}>
										{el}
									</option>
								))}
							</select>
							<br />
							{error && <p style={{ color: "red" }}>{error}</p>}
							<input type="submit" value="Update" />
						</form>
					</>
				) : (
					<Loading />
				)}
			</div>
		</>
	);
};

export default UpdateMovementContainer;
