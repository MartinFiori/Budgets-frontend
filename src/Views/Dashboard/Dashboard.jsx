import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MovementsContainer from "../../Components/MovementsContainer/MovementsContainer";
import { MovementContext } from "../../Context/MovementContext";
import s from "./Dashboard.module.css";

const Dashboard = () => {
	const {
		movements,
		total,
		getMovements,
		handleSetActiveFilter,
		activeFilter,
	} = useContext(MovementContext);
	const filters = ["all", "income", "outgoing"];

	useEffect(() => {
		!movements.length && getMovements();
	}, [getMovements, movements]);

	return (
		<div className={s.container}>
			<h1 className={s.title}>Dashboard</h1>
			<div className={s.content}>
				<p className={s.balance}>
					Balance: <span className={s.total}>$ {total}</span>
				</p>
				<select
					onChange={e => handleSetActiveFilter(e.target.value)}
					defaultValue={activeFilter}
					className={s.filter}
				>
					{filters.map(el => (
						<option key={el} value={el}>
							{el}
						</option>
					))}
				</select>
				<Link to="/createMovement" className={s.link}>
					Add movement
				</Link>
			</div>
			<MovementsContainer movements={movements} />
		</div>
	);
};

export default Dashboard;
