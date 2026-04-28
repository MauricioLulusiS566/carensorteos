const MP_TOKEN = 'APP_USR-5948561016629947-042709-8234f9d46d2db8b086f7211c567be26c-567015851';
const GAS_URL  = 'https://script.google.com/macros/s/AKfycbzb-6PLBkNBFWFKH6QLtS2fmrvTJhdC_a1Orp-st0yA63xsR51Tv01VlQEAmaNQGa4hpQ/exec';

module.exports = async (req, res) => {
  try {
    const body      = req.body || {};
    const paymentId = body.data ? body.data.id : null;

    if (!paymentId) return res.status(200).send('OK');

    const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${MP_TOKEN}` }
    });
    const pago = await resp.json();

    if (pago.status === 'approved' && pago.external_reference) {
      await fetch(GAS_URL + '?' + new URLSearchParams({
        action: 'confirmar',
        id: pago.external_reference
      }).toString());
    }
  } catch(err) {
    console.error('IPN:', err);
  }
  res.status(200).send('OK');
};
