import React, { useState, useContext } from "react";
import { MovementContext } from "../../Context/MovementContext";
import s from "./CreateForm.module.css";

const CreateForm = () => {
	const { createMovement } = useContext(MovementContext);
	const [error, setError] = useState(null);
	const [formData, setForm] = useState({
		concept: "",
		amount: "",
		creation_date: "",
		type: "",
	});
	const values = ["income", "outgoing"];
	const { concept, amount, creation_date } = formData;

	const handleSetForm = e => {
		setForm({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (Object.values(formData).every(Boolean)) {
			setError(null);
			createMovement(formData);
		} else {
			setError("Complete all inputs");
		}
	};

	return (
		<form onSubmit={handleSubmit} className={s.formContainer}>
			<h2>Create Movement</h2>
			<label>Concept:</label>
			<input
				type="text"
				name="concept"
				value={concept}
				onChange={handleSetForm}
			/>
			<label>Amount:</label>
			<input
				type="number"
				name="amount"
				value={amount}
				onChange={handleSetForm}
			/>
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
				onChange={handleSetForm}
			/>
			<label>Type:</label>
			<select
				name="type"
				defaultValue={"default"}
				onChange={handleSetForm}
			>
				<option value="default" disabled>
					Select a type
				</option>

				{values.map(el => (
					<option value={el} key={el}>
						{el}
					</option>
				))}
			</select>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input type="submit" value="Create" />
		</form>
	);
};

export default CreateForm;
