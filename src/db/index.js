import Empleado from './../models/Catalogos/EmpleadoModel';
import CentroDistribucion from './../models/Catalogos/CentroDistribucionModel';
import Ruta from './../models/Catalogos/RutaModel';
import Almacen from './../models/Catalogos/AlmacenModel';
import Concepto from './../models/Catalogos/ConceptoModel';
import ListaPrecios from './../models/Catalogos/ListaPreciosModel';
import Rol from './../models/Catalogos/RolModel';
import Clasificador from './../models/Catalogos/ClasificadorModel';
import ValorClasificador from './../models/Catalogos/ValorClasificadorModel';
import Impuesto from './../models/Catalogos/ImpuestoModel';
import GrupoLineas from '../models/Catalogos/GrupoLineasModel';
import Linea from './../models/Catalogos/LineaModel';
import ClasificadorProducto from './../models/Listas/ClasificadorProducto';
import Clave from './../models/Listas/ClaveModel';
import Proveedor from './../models/Listas/ProveedorModel';
import Repartidor from './../models/Listas/RepartidorModel';
import PrecioVenta from './../models/Listas/PrecioVentaModel';
import Producto from './../models/Listas/ProductoModel';
import Caja from './../models/Listas/CajaModel';
import Cliente from './../models/Listas/ClienteModel';
import Activo from './../models/Listas/ActivoModel';
import Inventario from './../models/Ruta/InventarioModel';
import Credito from './../models/Ruta/CreditoModel';
import Visita from './../models/Ruta/VisitaModel';
import Suministro from './../models/Ruta/SuministroModel';
import DescripcionPedido from './../models/Ruta/DescripcionPedidoModel';
import Pedido from './../models/Ruta/PedidoModel';
import Venta from './../models/Ruta/VentaModel';

let Realm = require('realm');

export const realm = new Realm({
    path: 'db.realm',
    schema: [
        Empleado.schema,
        CentroDistribucion.schema,
        Ruta.schema,
        Almacen.schema,
        Concepto.schema,
        ListaPrecios.schema,
        Rol.schema,
        Clasificador.schema,
        ValorClasificador.schema,
        Impuesto.schema,
        GrupoLineas.schema,
        Linea.schema,
        ClasificadorProducto.schema,
        Clave.schema,
        Proveedor.schema,
        Repartidor.schema,
        PrecioVenta.schema,
        Producto.schema,
        Caja.schema,
        Cliente.schema,
        Activo.schema,
        Inventario.schema,
        Credito.schema,
        Visita.schema,
        Suministro.schema,
        DescripcionPedido.schema,
        Pedido.schema,
        Venta.schema,
    ],
    schemaVersion: 19
});