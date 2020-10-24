import React, { useEffect, useState } from 'react';
import { orderDetail } from '../../../redux/Action';
import { useDispatch, useSelector, useHistory } from 'react-redux';
import { Link } from 'react-router-dom';
import './Pago.css';

export default function Pago(){
    window.Mercadopago.setPublishableKey("TEST-1b125a8b-e682-4821-976c-4c0f325298d9");
    window.Mercadopago.getIdentificationTypes();
    var archivo = document.getElementById("cardNumber");
    let product = JSON.parse(localStorage.getItem('prod'))

    let total = 0;
    let subtotal =0

  
if(archivo)
{
   archivo.addEventListener('change', guessPaymentMethod);
}
   
   let doSubmit = false;
   var archivo2 = document.getElementById("paymentForm");
   if(archivo2)
   {
      archivo2.addEventListener('submit', getCardToken);
   }

function getCardToken(event){
   event.preventDefault();
   if(!doSubmit){
       let $form = document.getElementById('paymentForm');
       window.Mercadopago.createToken($form, setCardTokenAndPay);
       return false;
   }
};

function setCardTokenAndPay(status, response) {
   if (status == 200 || status == 201) {
       let form = document.getElementById('paymentForm');
       let card = document.createElement('input');
       card.setAttribute('name', 'token');
       card.setAttribute('type', 'hidden');
       card.setAttribute('value', response.id);
       form.appendChild(card);
       doSubmit=true;
       form.submit();
   } else {
       alert("Verify filled data!\n"+JSON.stringify(response, null, 4));
   }
};


    function getInstallments(paymentMethodId, transactionAmount, issuerId){
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(transactionAmount),
            "issuer_id": issuerId ? parseInt(issuerId) : undefined
        }, setInstallments);
     }
     
     function setInstallments(status, response){
        if (status == 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach( payerCost => {
                let opt = document.createElement('option');
                opt.text = payerCost.recommended_message;
                opt.value = payerCost.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
     }


function guessPaymentMethod(event) {
   let cardnumber = document.getElementById("cardNumber").value;
   if (cardnumber.length >= 6) {
       let bin = cardnumber.substring(0,6);
       window.Mercadopago.getPaymentMethod({
           "bin": bin
       }, setPaymentMethod);
   }
};

function setPaymentMethod(status, response) {
   if (status == 200) {
       let paymentMethod = response[0];
       document.getElementById('paymentMethodId').value = paymentMethod.id;
       function getIssuers(paymentMethodId) {
        window.Mercadopago.getIssuers(
            paymentMethodId,
            setIssuers
        );
     }
     
     function setIssuers(status, response) {
        if (status == 200) {
            let issuerSelect = document.getElementById('issuer');
            response.forEach( issuer => {
                let opt = document.createElement('option');
                opt.text = issuer.name;
                opt.value = issuer.id;
                issuerSelect.appendChild(opt);
            });
     
            getInstallments(
                document.getElementById('paymentMethodId').value,
                document.getElementById('transactionAmount').value,
                issuerSelect.value
            );
        } else {
            alert(`issuers method info error: ${response}`);
        }
     }

       if(paymentMethod.additional_info_needed.includes("issuer_id")){
           getIssuers(paymentMethod.id);
       } else {
           getInstallments(
               paymentMethod.id,
               document.getElementById('transactionAmount').value
           );
       }
   } else {
       alert(`payment method info error: ${response}`);
   }
}
console.log('Product', product)
    return(
        <div className='container'>
          <h1> Confirmacion de pago</h1>
           <table class="table table-hover mt-4">
                    <thead>
                        <tr className="list-order-top">
                            <th scope="col"></th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product !== undefined && product.map(dato => {
                              subtotal = subtotal + (dato.price * dato.count)
                                return (
                                    <tr className="hover-list">
                                        <th scope="col"><img src={dato.image} width={50}/></th>
                                        <td style={{ textAlign: 'center' }}><Link className="link-producto" to={`/products/${dato.id}`} >{dato.name}</Link></td>
                                        <td>{dato.count} unid</td>
                                        <td>$ {dato.price }</td>
                                        <td style={{ textAlign: 'right' }}>$ {dato.price * dato.count}</td>
                                        
                                    </tr>
                                )
                            })
                        }
                         <tr>
                                      
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="total-order">Sub-Total</td>
                                        <td className="text-right">$ {subtotal} </td>
                                    </tr>
                                    <tr>
                                     
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="total-order">Envio</td>
                                        <td className="text-right">$ {subtotal * 0.1} </td>
                                    </tr>
                                    <tr>
                                      
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="total-order"><strong>Total</strong></td>
                                        <td className="text-right"><strong>$ {subtotal + (subtotal * 0.1)} </strong></td>
                                    </tr>
                    </tbody>
                </table>
        <form action="/process_payment" method="post" id="paymentForm">
   <h3>Detalles del comprador</h3>
     <div>
       <div>
         <label for="email">E-mail</label>
         <input id="email" name="email" type="text" value="test@test.com"/>
       </div>
       <div>
         <label for="docType">Tipo de documento</label>
         <select id="docType" name="docType" data-checkout="docType" type="text"></select>
       </div>
       <div>
         <label for="docNumber">Número de documento</label>
         <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text"/>
       </div>
     </div>
   <h3>Detalles de la tarjeta</h3>
     <div>
       <div>
         <label for="cardholderName">Titular de la tarjeta</label>
         <input id="cardholderName" data-checkout="cardholderName" type="text"/>
       </div>
       <div>
         <label for="">Fecha de vencimiento</label>
         <div>
           <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
             onselectstart="return false" onpaste="return false"
             oncopy="return false" oncut="return false"
             ondrag="return false" ondrop="return false" autocomplete='off'/>
           <span class="date-separator">/</span>
           <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
             onselectstart="return false" onpaste="return false"
             oncopy="return false" oncut="return false"
             ondrag="return false" ondrop="return false" autocomplete='off' />
         </div>
       </div>
       <div>
         <label for="cardNumber">Número de la tarjeta</label>
         <input type="text" id="cardNumber" data-checkout="cardNumber"
           onselectstart="return false" onpaste="return false"
           oncopy="return false" oncut="return false"
           ondrag="return false" ondrop="return false" autocomplete='off'/>
       </div>
       <div>
         <label for="securityCode">Código de seguridad</label>
         <input id="securityCode" data-checkout="securityCode" type="text"
           onselectstart="return false" onpaste="return false"
           oncopy="return false" oncut="return false"
           ondrag="return false" ondrop="return false" autocomplete='off'/>
       </div>
       <div id="issuerInput">
         <label for="issuer">Banco emisor</label>
         <select id="issuer" name="issuer" data-checkout="issuer"></select>
       </div>
       <div>
         <label for="installments">Cuotas</label>
         <select type="text" id="installments" name="installments"></select>
       </div>
       <div>
         <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
         <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
         <input type="hidden" name="description" id="description" />
         <br/>
         <button type="submit">Pagar</button>
         <br/>
       </div>
   </div>
 </form>
</div>
    )
}