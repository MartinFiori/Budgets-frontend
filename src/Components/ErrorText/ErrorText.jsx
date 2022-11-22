import React from "react";
import s from "./ErrorText.module.css";

export default function ErrorText({ children }) {
	return <p className={s.text}>{children}</p>;
}
