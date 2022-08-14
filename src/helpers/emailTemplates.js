export const recepcionPedido = (pedido) => {
    return (`
    <html lang="en">
    <body>
        <div>
            <center>
                <img src="cid:logo-foodtrack"
                    style="max-width: 95%; align-content: center; align-items: center; align-self: center; margin: auto;" />
            </center>
            <br>
            <br>
            <br>
        </div>
        <div style="background: #FFFFFF">
            <br>
            <br>
            <br>
            <center>
                <p>Gracias <b>${pedido.cliente.nombre}</b>. Tu pedido ha sido enviado al restaurante más cercano.</p>
            </center>
            <center>
                <p> 
                Pedido # ${pedido.pedidoId}
                </p>
                <p> 
                Entrega en:  ${pedido.direccion} 
                </p>
                <p> 
                Pedido Realizado
                </p>
                <hr />
                <p> 
                ${pedido.detalles.map(item => {
                    return `${item.cantidad} ${item.producto.nombre} Q ${parseFloat(item.subtotal).toFixed(2)}<br/>`
                })}
                </p>
                <hr />
                <b style:"font-size: 24;"> 
                Total: Q ${pedido.detalles.reduce((total, item) => parseFloat(item.subtotal) + total, 0).toFixed(2)}
                </b>
            </center>
            <br>
            <br>
            <center>
    
                <div>
                    <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.WEB_UI_URL}/status-pedido/${pedido.pedidoId}" style="height:60px;v-text-anchor:middle;width:200px;" arcsize="9%" stroke="f" fillcolor="#4908FA">
        <w:anchorlock/>
        <center>
      <![endif]-->
                    <a href="${process.env.WEB_UI_URL}/status-pedido/${pedido.pedidoId}"
                        style="background-color:#4908FA;border-radius:5px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:60px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">
                        Rastrear Pedido
                        </a>
                    <!--[if mso]>
        </center>
      </v:roundrect>
    <![endif]-->
                </div>
    
            </center>
            <br>
            <br>
            <br>
            <br>
            <center>
                <p>No responda este mensaje</p>
            </center>
        </div>
    
        <br>
        <small>Este correo electrónico fue enviado a ${pedido.email}. Si este correo le ha llegado por equivocación, por favor
            comunicarlo al remitente.</small>
        <br>
    </body>
    
    </html>
    `)
}


export const facturaPedido = (pedido) => {
    return (`
    <html lang="en">
    <body>
        <div>
            <center>
                <img src="cid:logo-foodtrack"
                    style="max-width: 95%; align-content: center; align-items: center; align-self: center; margin: auto;" />
            </center>
            <br>
            <br>
            <br>
        </div>
        <div style="background: #FFFFFF">
            <br>
            <br>
            <br>
            <center>
                <p>Gracias por tu pedido. Aca puedes visualizar la factura electrónica.</p>
            </center>
            <br>
            <br>
            <center>
    
                <div>
                    <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.WEB_UI_URL}/impresion-factura/${pedido.facturaId}" style="height:60px;v-text-anchor:middle;width:200px;" arcsize="9%" stroke="f" fillcolor="#4908FA">
        <w:anchorlock/>
        <center>
      <![endif]-->
                    <a href="${process.env.WEB_UI_URL}/impresion-factura/${pedido.facturaId}"
                        style="background-color:#4908FA;border-radius:5px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:60px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">
                        Ver Factura
                        </a>
                    <!--[if mso]>
        </center>
      </v:roundrect>
    <![endif]-->
                </div>
    
            </center>
            <br>
            <br>
            <br>
            <br>
            <center>
                <p>No responda este mensaje</p>
            </center>
        </div>
    
        <br>
        <small>Este correo electrónico fue enviado a ${pedido.email}. Si este correo le ha llegado por equivocación, por favor
            comunicarlo al remitente.</small>
        <br>
    </body>
    
    </html>
    `)
}
