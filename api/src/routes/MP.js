import mercadopago from 'mercadopago';

const configureMercadoPago = () => {
  try {
    mercadopago.configure({
      client_id: process.env.MERCADOPAGO_CLIENT_ID,
      client_secret: process.env.MERCADOPAGO_CLIENT_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
}
configureMercadoPago();


export default async (req, res) => {
  const { items, payer } = JSON.parse(req.body);
  mercadopago.preferences.create({ items, payer })
    .then(response => {
      res.send({preferenceId: response.body.init_point.split('pref_id=')[1]});
    })
    .catch(error => {
      console.log(error);
      res.status(403).send(error);
    });
};