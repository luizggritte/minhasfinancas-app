import React from "react";

export default function NavbarItem({ render, ...props }) {
	if (render) {
		return (
			<li className="nav-item">
				<a
					href={props.href}
					className="nav-link"
					onClick={props.onClick}
				>
					{props.label}
				</a>
			</li>
		);
	}
	else return false;
}
