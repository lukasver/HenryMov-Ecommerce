import React, { useEffect, useState } from 'react';
import './Mpago.css';


export default function Pago() {

    // const [cardNum, setCardNum] = useState(0);

    window.Mercadopago.setPublishableKey("TEST-883a2064-2595-42bf-ba5c-ce661de4a25c");
    window.Mercadopago.getIdentificationTypes();

    //Proceed with payment
    var doSubmit = false;
    function onSubmit(e) {
        e.preventDefault();
        if (!doSubmit) {
            let $form = document.getElementById('paymentForm');
            window.Mercadopago.createToken($form, setCardTokenAndPay);

            return false;
        }
    }

    function setCardTokenAndPay(status, response) {
        if (status == 200 || status == 201) {
            let form = document.getElementById('paymentForm');
            let card = document.createElement('input');
            card.setAttribute('name', 'token');
            card.setAttribute('type', 'hidden');
            card.setAttribute('value', response.id);
            form.appendChild(card);
            doSubmit = true;
            form.submit(); //Submit form data to your backend
        } else {
            alert("Error en los datos!\n" + JSON.stringify(response, null, 4));
        }
    };
    // document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);
    function guessPaymentMethod(e) {
        e.preventDefault();        
            cleanCardInfo();
            // setCardNum(e.target.value);
            let cardNum = e.target.value
            if (cardNum >= 6) {
                let bin = cardNum.substring(0, 6);
                window.Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethod);
                getIssuers();
            
        }


        // let cardnumber = document.getElementById("cardNumber").value;
        // if (cardnumber.length >= 6) {
        //     let bin = cardnumber.substring(0, 16);
        //     window.Mercadopago.getPaymentMethod({
        //         "bin": bin
        //     }, setPaymentMethod);
        // }
    };

    function setPaymentMethod(status, response) {
        if (status == 200) {
            let paymentMethod = response[0];
            console.log(paymentMethod);
            document.getElementById('paymentMethodId').value = paymentMethod.id;
            document.getElementById('cardNumber').style.backgroundImage = 'url(' + paymentMethod.thumbnail + ')';
            // getInstallments(
            //             paymentMethod.id,
            //             document.getElementById('amount').value
            //         );

            if (paymentMethod.additional_info_needed.includes("issuer_id")) {
                getIssuers(paymentMethod.id);

            }
            else {
                document.getElementById('issuerInput').classList.add("hidden");

                getInstallments(
                    paymentMethod.id,
                    document.getElementById('amount').value
                );
            }
        } else {
            alert(`payment method info error: ${response}`);
        }
    }



    function cleanCardInfo() {
        document.getElementById('cardNumber').style.backgroundImage = '';
        document.getElementById('issuerInput').classList.add("hidden");
        document.getElementById('issuer').options.length = 0;
        document.getElementById('installments').options.length = 0;
    };

    function getIssuers(paymentMethodId) {
        window.Mercadopago.getIssuers(
            paymentMethodId,
            setIssuers
        );
    }

    function setIssuers(status, response) {
        if (status == 200) {
            let issuerSelect = document.getElementById('issuer');

            response.forEach(issuer => {
                let opt = document.createElement('option');
                opt.text = issuer.name;
                opt.value = issuer.id;
                issuerSelect.appendChild(opt);
            });

            if (issuerSelect.options.length <= 1) {
                document.getElementById('issuerInput').classList.add("hidden");
            } else {
                document.getElementById('issuerInput').classList.remove("hidden");
            }

            getInstallments(
                document.getElementById('paymentMethodId').value,
                document.getElementById('amount').value,
                issuerSelect.value
            );

        } else {
            // alert(`issuers method info error: ${response}`);
        }
    }

    function getInstallments(paymentMethodId, amount, issuerId) {
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(amount),
            "issuer_id": issuerId ? parseInt(issuerId) : undefined
        }, setInstallments);
    }

    function setInstallments(status, response) {
        if (status == 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach(payerCost => {
                let opt = document.createElement('option');
                opt.text = payerCost.recommended_message;
                opt.value = payerCost.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    }

    return (
        <form action="http://localhost:3001/process_payment" method="post" id="paymentForm" onSubmit={onSubmit}>
            <h3>Detalles del comprador</h3>
            <div>
                <div>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="text" value="l.verdiell@gmail.com" />
                </div>
                <div>
                    <label for="docType">Tipo de documento</label>
                    <select id="docType" name="docType" data-checkout="docType" type="text">DNI</select>
                </div>
                <div>
                    <label for="docNumber">Número de documento</label>
                    <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" value="34772979" />
                </div>
            </div>
            <h3>Detalles de la tarjeta</h3>
            <div>
                <div>
                    <label for="cardholderName">Titular de la tarjeta</label>
                    <input id="cardholderName" data-checkout="cardholderName" type="text" />
                </div>
                <div>
                    <label for="">Fecha de vencimiento</label>
                    <div>
                        <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autoComplete="off" value="11" />
                        <span class="date-separator">/</span>
                        <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autoComplete="off" value="25" />
                    </div>
                </div>
                <div>
                    <label htmlFor="cardNumber">Número de la tarjeta</label>
                    <input type="text" id="cardNumber" data-checkout="cardNumber" className="input-background"
                        onselectstart="return false"
                        oncopy="return false" onCut="return false"
                        onDrag="return false" onDrop="return false" autoComplete="off" onBlur={guessPaymentMethod} />
                </div>
                <div>
                    <label for="securityCode">Código de seguridad</label>
                    <input id="securityCode" data-checkout="securityCode" type="text"
                        onselectstart="return false" onpaste="return false"
                        oncopy="return false" oncut="return false"
                        ondrag="return false" ondrop="return false" autoComplete="off" value="123" />
                </div>
                <div id="issuerInput">
                    <label for="issuer">Banco emisor</label>
                    <select id="issuer" name="issuer" data-checkout="issuer"></select>
                </div>
                <div>
                    <label for="installments">Cuotas</label>
                    <select type="text" id="installments" name="installments" value="1"></select>
                </div>
                <div>
                    <input type="hidden" name="transactionAmount" id="amount" value="10" />
                    <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                    <input type="hidden" name="description" id="description" />
                    <br />
                    <button type="submit">Pagar</button>
                    <br />
                </div>
            </div>
        </form>
    )
}