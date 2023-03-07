import { useState } from "react"
import { useDispatch } from "react-redux"

import { DarkModeSwitch } from "react-toggle-dark-mode"

import useDarkSide from "../hooks/useDarkSide"
import { dark, light } from "../redux/slicer/ThemeSlicer"

export default function Switcher() {
	const [colorTheme, setTheme] = useDarkSide();
	const [darkSide, setDarkSide] = useState(
		colorTheme === "light" ? true : false
	);
	
	const dispatch = useDispatch();

	const toggleDarkMode = (checked: any) => {
		//@ts-ignore
		setTheme(colorTheme);
		if(colorTheme === 'dark') {
			dispatch(
				dark()
			)
		} else {
			dispatch(
				light()
			)
		}
		setDarkSide(checked);
	};

	return (
		<>
			<DarkModeSwitch
				className="mb-2"
				checked={darkSide}
				onChange={toggleDarkMode}
				size={30}
			/>
		</>
	);
}
