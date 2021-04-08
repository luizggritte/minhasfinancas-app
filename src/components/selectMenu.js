import React from "react";

export default function SelectMenu({ lista, ...resto }) {
    return (
        <select className="form-control" {...resto}>
            {
                lista.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}
