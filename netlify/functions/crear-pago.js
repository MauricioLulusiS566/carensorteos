const MP_TOKEN = 'APP_USR-5948561016629947-042709-8234f9d46d2db8b086f7211c567be26c-567015851';

exports.handler = async (event) => {
  const p = event.queryStringParameters || {};
  const montoNum = parseInt((p.monto || '').replace('$', '').replace(/\./g, '')) || 0;

  try {
    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MP_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{
          title: (p.opcion || 'Ticket') + ' — Gran Sorteo Moto 0km',
          quantity: 1,
          unit_price: montoNum,
          currency_id: 'ARS'
        }],
        payer: { email: p.email },
        external_reference: p.id,
        back_urls: {
          success: 'https://carensorteos.com?pagado=1&id=' + p.id,
          failure: 'https://carensorteos.com',
          pending: 'https://carensorteos.com'
        },
        auto_return: 'approved'
      })
    });

    const pref = await resp.json();

    if (!pref.init_point) {
      return { statusCode: 500, body: JSON.stringify({ error: 'MP error', detail: pref }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: pref.init_point })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
