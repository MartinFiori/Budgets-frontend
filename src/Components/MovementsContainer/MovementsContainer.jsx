import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MovementContext } from "../../Context/MovementContext";
import UpdateMovementContainer from "../UpdateMovementContainer/UpdateMovementContainer.jsx";

const MovementsContainer = () => {
	const { movements, deleteMovement, activeFilter, handleSetActiveFilter } =
		useContext(MovementContext);
	const [isOpen, setIsOpen] = useState(false);
	const [activeMovement, setActiveMovement] = useState({});
	const filters = ["all", "income", "outgoing"];
	const handleSetIsOpen = movement_id => {
		const found = movements.find(el => el.id === movement_id);
		setActiveMovement(found);
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<select
				onChange={e => handleSetActiveFilter(e.target.value)}
				defaultValue={activeFilter}
			>
				{filters.map(el => (
					<option key={el} value={el}>
						{el}
					</option>
				))}
			</select>

			{movements.length ? (
				movements?.map(el => (
					<div key={el.id}>
						<p>
							{el.concept} ${el.amount} {el.type}{" "}
							{el.creation_date}{" "}
							<span
								onClick={() => handleSetIsOpen(el.id)}
								style={{
									background: "red",
									color: "white",
									cursor: "pointer",
								}}
							>
								update
							</span>
							<span onClick={() => deleteMovement(el.id)}>
								BORRAR
							</span>
						</p>
					</div>
				))
			) : (
				<>
					<h4>Add some movements!</h4>
					<Link to="/createMovement">Create</Link>
				</>
			)}

			{/* {movements?.length && activeFilter === "all" ? (
				movements?.map(el => (
					<div key={el.id}>
						<p>
							{el.concept} ${el.amount} {el.type}{" "}
							{el.creation_date}{" "}
							<span
								onClick={() => handleSetIsOpen(el.id)}
								style={{
									background: "red",
									color: "white",
									cursor: "pointer",
								}}
							>
								update
							</span>
							<span onClick={() => deleteMovement(el.id)}>
								BORRAR
							</span>
						</p>
					</div>
				))
			) : movements?.length ? (
				movements.map(el => (
					<div key={el.id}>
						<p>
							{el.concept} ${el.amount} {el.type}{" "}
							{el.creation_date}{" "}
							<span
								onClick={() => handleSetIsOpen(el.id)}
								style={{
									background: "red",
									color: "white",
									cursor: "pointer",
								}}
							>
								update
							</span>
							<span onClick={() => deleteMovement(el.id)}>
								BORRAR
							</span>
						</p>
					</div>
				))
			) : (
				<>
					<h4>Add some movements!</h4>
					<Link to="/createMovement">Create</Link>
				</>
			)} */}
			{isOpen && (
				<UpdateMovementContainer
					handleSetIsOpen={handleSetIsOpen}
					activeMovement={activeMovement}
				/>
			)}
		</div>
	);
};

export default MovementsContainer;
