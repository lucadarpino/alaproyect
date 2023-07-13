function obtenerDolar() {
    const URLDOLAR = 'https://api.bluelytics.com.ar/v2/latest';
    return fetch(URLDOLAR)
      .then(respuesta => respuesta.json())
      .then(datos => {
        const cotizacionesBlue = datos.blue;
        const dolarCompra = parseFloat(cotizacionesBlue.value_buy);
        const dolarVenta = parseFloat(cotizacionesBlue.value_sell);
  
        if (!isNaN(dolarCompra) && !isNaN(dolarVenta)) {
          document.getElementById('dolar-cotizacion').innerText = `Dólar compra: $${dolarCompra.toFixed(2)} - Dólar venta: $${dolarVenta.toFixed(2)}`;
        } else {
          document.getElementById('dolar-cotizacion').innerText = 'No se pudo obtener la cotización del dólar';
        }
  
        return { dolarCompra, dolarVenta };
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('dolar-cotizacion').innerText = 'Error al obtener la cotización del dólar';
      });
  }
  
  function cotizar() {
    const cotizacionInput = document.getElementById('cotizacion-input');
    const cantidadPesos = parseFloat(cotizacionInput.value);
  
    if (!isNaN(cantidadPesos) && cantidadPesos > 0) {
      obtenerDolar().then(cotizacion => {
        const { dolarCompra } = cotizacion;
        const cantidadDolares = cantidadPesos / dolarCompra;
  
        document.getElementById('cotizacion-resultado').innerText = `Pesos: $${cantidadPesos.toFixed(2)} - Dólares: $${cantidadDolares.toFixed(2)}`;
      });
    } else {
      document.getElementById('cotizacion-resultado').innerText = 'Ingrese una cantidad válida en pesos';
    }
  }
  function cotizarDolares(){
    const cotizacionInput = document.getElementById('cotizacion-input2');
    const cantidadPesos = parseFloat(cotizacionInput.value);
    if (!isNaN(cantidadPesos) && cantidadPesos > 0) {
      obtenerDolar().then(cotizacion => {
        const { dolarCompra } = cotizacion;
        const cantidadDolares = cantidadPesos * dolarCompra;
  
        document.getElementById('cotizacion-resultado').innerText = `Dólares: $${cantidadPesos.toFixed(2)} -  Pesos:$${cantidadDolares.toFixed(2)}`;
      });
    } else {
      document.getElementById('cotizacion-resultado').innerText = 'Ingrese una cantidad válida en dolares';
    }
  }
  obtenerDolar();
  