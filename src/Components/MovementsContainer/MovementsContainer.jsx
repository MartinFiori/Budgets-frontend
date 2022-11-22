import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MovementContext } from "../../Context/MovementContext";
import UpdateMovementContainer from "../UpdateMovementContainer/UpdateMovementContainer.jsx";
import s from "./MovementsContainer.module.css";

const MovementsContainer = () => {
	const { movements, deleteMovement } = useContext(MovementContext);
	const [isOpen, setIsOpen] = useState(false);
	const [activeMovement, setActiveMovement] = useState({});
	const handleSetIsOpen = movement_id => {
		const found = movements.find(el => el.id === movement_id);
		setActiveMovement(found);
		setIsOpen(!isOpen);
	};

	return (
		<div>
			{movements.length ? (
				<table className={s.table}>
					<thead>
						<tr className={s.row}>
							<th>concept:</th>
							<th>amount:</th>
							<th>type:</th>
							<th>date:</th>
							<th>Edit movement:</th>
							<th>Delete movement:</th>
						</tr>
					</thead>
					<tbody>
						{movements.map(el => (
							<tr key={el.id} className={s.row}>
								<td>{el.concept}</td>
								<td>${el.amount}</td>
								<td>{el.type}</td>
								<td>{el.creation_date}</td>
								<td className={`${s.btn} ${s.editBtn}`}>
									<AiOutlineEdit /> edit
								</td>
								<td className={`${s.btn} ${s.deleteBtn}`}>
									<BiTrashAlt /> delete
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				// <div key={el.id}>
				// 	<p>
				// 		{el.concept} ${el.amount} {el.type}{" "}
				// 		{el.creation_date}{" "}
				// 		<span
				// 			onClick={() => handleSetIsOpen(el.id)}
				// 			style={{
				// 				background: "red",
				// 				color: "white",
				// 				cursor: "pointer",
				// 			}}
				// 		>
				// 			update
				// 		</span>
				// 		<span onClick={() => deleteMovement(el.id)}>
				// 			BORRAR
				// 		</span>
				// 	</p>
				// </div>
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
