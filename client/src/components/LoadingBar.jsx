import React, {useState} from 'react';
import './LoadingBar.css';

const LoadingBar = (props) => {

const [style, setStyle] = useState({})

const { done } = props

setTimeout(() => {
	const newStyle = {opacity: 10, width: `${done}%`};
	setStyle(newStyle);
},200)

return (
<div className="container centradoLB">
	<i className="fas fa-spinner"></i>
	<h2>Loading...</h2>
	<div className="progress" style={{height: "2rem"}}>
	  	<div className="progress-bar progress-bar-striped bg-warning progress-bar-animated d-flex justify-content-center" 
	  		 role="progressbar" 
	  		 style={style} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
	  	</div>
	</div>
</div>
)

}



export default LoadingBar;