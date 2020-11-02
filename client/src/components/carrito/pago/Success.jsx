import React from 'react'
import './Success.css';
import Bag from '../../../img/bag.png';
import Confetti from 'react-confetti';


export default function PaymentSucess() {

	const config = {
		angle: "161",
		spread: 360,
		startVelocity: "16",
		elementCount: "121",
		dragFriction: "0.03",
		duration: "5810",
		stagger: "19",
		width: "32px",
		height: "35px",
		perspective: "500px",
		colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
	};


	const handleRedirect = () => {
		window.location = 'http://localhost:3000/'
	}

return (
	<div className='container' style={{height: "65%", width: "100%"}}>
		<br/><br/>

			<div class="modal success" id="myModal" role="dialog" aria-hidden="false">
				<Confetti active={ true} config={ config }/>
					<div class="modal-dialog modal-full" role="document">
					<div class="modal-content">
					<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span onClick={handleRedirect} aria-hidden="false">×</span>
					</button>
					</div>
					<div class="modal-body p-4" id="result">
					<h1>Gracias por su compra</h1>
					<img src={Bag} width={150} alt='Bag'/>
					</div>
					<p>Le enviamos un mail con los detalles de su orden.</p>
					<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleRedirect}>OK</button>
					</div>
				</div>
			</div>
		</div>
		{/*<img src="https://i.ibb.co/b72stRL/bag-orange.png" alt="bag-orange" border="0"/>*/}
	</div>
	)
}