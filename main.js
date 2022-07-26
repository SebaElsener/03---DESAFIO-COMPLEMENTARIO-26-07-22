

const precioUnitario=32000
const precioLista=35000
const stockMedidaCubiertas=['225/65/17', '225/70/15','265/10/16','195/70/15', '205/65/16']

let cantidadCubiertas=0
let nombreApellido=''
let dni=0
let medidaCubiertas=''
let formaPago=0
let descuentoUnPago=0

// function constructora pedido
function pedido(nombreApellido, dni, cantidadCubiertas, medidaCubiertas, formaPago) {
    this.nombreApellido=nombreApellido
    this.dni=dni
    this.cantidadCubiertas=cantidadCubiertas
    this.medidaCubiertas=medidaCubiertas
    this.formaPago=formaPago
    this.resultadoCompra=function () {
        document.write(`<br><strong>Datos de su compra:</strong><br><br>Nombre y apellido: ${this.nombreApellido}<br>DNI: ${this.dni}<br>Cantidad de cubiertas: ${this.cantidadCubiertas}<br>Medida de cubiertas: ${this.medidaCubiertas}<br>Forma de pago: ${this.formaPago}<br>`)
        document.write(`<strong>Total a pagar: </strong>${this.formaPago} pago(s) de $${pago(parseInt(formaPago))} (Descuento incluído de $${descuentoUnPago})`)
    }
}

// Function para pago
function pago(cantCuotas) {
    if(cantCuotas>12){  // Control por si se ingresa más de 12 pagos
        alert('El plan de cuotas es válido sólo hasta 12 pagos.')
        precioTotal='No válido - Intente nuevamente'
    } else if(cantCuotas>1){  // Si es mayor a 1 cuota, automáticamente calcula pago de 2 a 12 cuotas sin interés a precio lista, según ingrese el user
        precioTotal=(precioLista*cantidadCubiertas)/cantCuotas
    } else if (cantidadCubiertas<=0){
        alert('Por favor, ingrese un número valido de cantidad de cubiertas') // Control por si se ingresa una cantidad = o < a cero
    } else{  //  Una cuota o pago efectivo con 5% de descuento
        descuentoUnPago=(precioUnitario*cantidadCubiertas*0.05)
        precioTotal=(precioUnitario*cantidadCubiertas)-descuentoUnPago
    }

    return precioTotal
}

do{
    // Pedido de datos al user
    nombreApellido=prompt('Nombre y apellido: ')
    dni=prompt('DNI: ')
    cantidadCubiertas=parseInt(prompt('Cantidad cubiertas: '))
    if (cantidadCubiertas >= 10) {  // Si quiero comprar 10 o más, pide preguntar por stock
        alert('Por favor, consulte stock antes de continuar')
        break
    }
    medidaCubiertas=prompt('Medida (ingresar con este formato: 225/65/17): ')
    if (stockMedidaCubiertas.includes(medidaCubiertas)==false){
        alert('Disculpe, actualmente no contamos con stock de la medida solicitada')  //  Verifica en el array de stock de medidas de cubiertas si existe la medida solicitada
        break
    }
    formaPago=prompt('Formas de pago: \n * Efectivo o 1 pago, ingrese "1" (5% descuento) \n * Precio lista hasta 12 cuotas sin interés (ingrese de 2 a 12 cuotas): ')

    // Nueva compra
    const compra=new pedido(nombreApellido, dni, cantidadCubiertas, medidaCubiertas, formaPago)

    // Resultado de la compra en pantalla
    compra.resultadoCompra()

    pedidoCompleto=prompt('¿Realizar nueva compra? (SI/NO): ')
    descuentoUnPago=0  // Reset a cero del descuento para que no aparezca el valor que quedó en memoria si hubo descuento por un pago

} while (pedidoCompleto.toUpperCase() != "NO" && pedidoCompleto.length != 0 )  //  Uso toUpperCase para salir del bucle si el user emplea "NO" o "no".  También sale dejando el campo vacío (length = 0)

