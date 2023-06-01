import { React } from 'react';

function Text({ children, bg }) {
	const text = Array.isArray(children) ? children.join("") : children;
	function white(hex) {
	const r = parseInt(hex.substr(1, 2), 16);
	const g = parseInt(hex.substr(3, 2), 16);
	const b = parseInt(hex.substr(5, 2), 16);

	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

	if (luminance > 0.5) { 
		return true;
	} else {
		return false;
	}
	}

	return <span className={white(bg) ? "" : "text-white"}>{text}</span>;
}

export default Text;