import { forEach } from 'lodash';

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

import { createRegistry, getAllRegistries, getRegistryById, updateRegistry, deleteRegistry } from './../api';

//https://gitmemory.com/issue/realm/realm-js/1475/492319054
export const createRegistros = () => {
    //createEmpleado();
    //createAlmacen();
    //createConcepto();
    //createImpuesto();
    //createRol();
    //createListaPrecios();
    //createProveedor();
    //createCaja();
    //createRuta();
    //createRepartidor();
    //let list = getAllRegistries('Empleado');
    //let list = getAllRegistries('Almacen');
    //createGrupoLinea();
    //updateGrupoLineas();
    //deleteLinea();
    //createLinea();
    //updateLinea();
    //deleteProducto();
    //deleteClave();
    //deletePrecioVenta();
    const payload = { model: 'Producto' };
    let list = getAllRegistries(payload);
    const datos = list.result;
    //console.log(datos[0].linkingObjects('CentroDistribucion', 'almacenes'));
    //console.log(datos[0].linkingObjects('Credito', 'cliente'));
    datos.map((item) => {
        console.log(item);
        forEach(item.precios_venta, function (precio_venta) {
            console.log(precio_venta);
            //if (precio_venta.lista_precios.id === 1) valido = true;
        });
        return item;
    });
}

function createEmpleado() {
    const empleado = new Empleado();
    empleado.nombre = 'Francisco';
    empleado.apellido_paterno = 'Tapia';
    empleado.apellido_materno = 'Hernández';
    empleado.clave = '12345';
    let payload = {
        registry: empleado,
        model: 'Empleado'
    };
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createAlmacen() {
    //(id = 1, nombre = '', nombre_abreviado = '', almacenista = new Empleado(), centro_distribucion = new CentroDistribucion(), inventario = [])
    const almacen = new Almacen();
    almacen.nombre = 'Mercado Tariacuri';
    almacen.nombre_abreviado = 'Tariacuri';
    let empleado = getRegistryById(1, 'Empleado').result;
    almacen.almacenista = empleado;
    let centroD = getRegistryById(1, 'CentroDistribucion').result;
    almacen.centro_distribucion = centroD;
    let payload = {
        registry: almacen,
        model: 'Almacen'
    };
    console.log("Payload: ", payload.registry.centro_distribucion);
    //let msg = createRegistry(payload);
    //console.log("MSG: ", msg);
}

function createConcepto() {
    //constructor(id = 1, nombre = '', nombre_abreviado = '', naturaleza = '', tipo = '') {
    const concepto = new Concepto();
    concepto.nombre = 'Devolución de recepción';
    concepto.nombre_abreviado = 'Devolución de recepción';
    concepto.naturaleza = 'Salida';
    concepto.tipo = 'Devolución';
    let payload = {
        registry: concepto,
        model: 'Concepto'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createImpuesto() {
    //constructor(id = 1, nombre = '', porcentaje = 0.16) {
    const impuesto = new Impuesto();
    impuesto.nombre = 'IVA';
    let payload = {
        registry: impuesto,
        model: 'Impuesto'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createRol() {
    //constructor(id = 1, nombre = '') {
    const rol = new Rol();
    rol.nombre = 'Clave alterna';
    let payload = {
        registry: rol,
        model: 'Rol'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createListaPrecios() {
    //constructor(id = 1, nombre = '', activo = true) {
    const lista_precios = new ListaPrecios();
    lista_precios.nombre = 'Precio minimo';
    let payload = {
        registry: lista_precios,
        model: 'ListaPrecios'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createProveedor() {
    //constructor(id = 1, nombre = '', nombre_corto = '', activo = true, productos = [], cajas = []) {
    const proveedor = new Proveedor();
    proveedor.nombre = 'NutryPollo';
    proveedor.nombre_corto = 'NutryPollo';
    let payload = {
        registry: proveedor,
        model: 'Proveedor'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createCaja() {
    //constructor(id = 1, proveedor = new Proveedor(), color_caja = '', extension_clave = 1, indice_clave_producto = 1, indice_peso = 1, extension_clave_producto = 1, extension_peso = 1) {
    const caja = new Caja();
    let proveedor = getRegistryById(1, 'Proveedor').result;
    caja.proveedor = proveedor;
    caja.color_caja = 'Roja';
    caja.extension_clave = 27;
    caja.indice_clave_producto = 1;
    caja.indice_peso = 9;
    caja.extension_clave_producto = 3;
    caja.extension_peso = 5;
    let payload = {
        registry: caja,
        model: 'Caja'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createRuta() {
    //constructor(id = 1, nombre = '', centro_distribucion = new CentroDistribucion(), repartidores = [], pedidos = [], clientes = []) {
    const ruta = new Ruta();
    let ceDist = getRegistryById(1, 'CentroDistribucion').result;
    ruta.nombre = 'Apatzingan';
    ruta.centro_distribucion = ceDist;
    let payload = {
        registry: ruta,
        model: 'Ruta'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createRepartidor() {
    //constructor(id = 1, nombre = '', apellido_paterno = '', apellido_materno = '', password = '', activo = true, ruta = new Ruta()) {
    const repartidor = new Repartidor();
    let ruta = getRegistryById(5, 'Ruta').result;
    repartidor.nombre = 'Hugo';
    repartidor.apellido_paterno = 'Gonzaléz';
    repartidor.apellido_materno = 'Sandovál';
    repartidor.password = '12345';
    repartidor.activo = true;
    repartidor.ruta = ruta;
    let payload = {
        registry: repartidor,
        model: 'Repartidor'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createProducto() {
    //constructor(id = 1,nombre = '',imagen = '',linea = new Linea(),unidad_medida = 1,unidad_compra = 1,contenido = 1,precios_venta = [],claves = [],clasificadores = new ClasificadorProducto(),proveedor = new Proveedor(),impuestos = [],notas = '',activo = true,) {
    const repartidor = new Repartidor();
    let ruta = getRegistryById(5, 'Linea').result;
    repartidor.nombre = 'Hugo';
    repartidor.apellido_paterno = 'Gonzaléz';
    repartidor.apellido_materno = 'Sandovál';
    repartidor.password = '12345';
    repartidor.activo = true;
    repartidor.ruta = ruta;
    let payload = {
        registry: repartidor,
        model: 'Repartidor'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}


function createGrupoLinea() {
    //constructor(id = 1, nombre = '', activo = true, lineas = []) {
    const grupo_lineas = new GrupoLineas();
    grupo_lineas.nombre = 'BEBIDAS';
    let payload = {
        registry: grupo_lineas,
        model: 'GrupoLineas'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function createLinea() {
    //constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
    const linea = new Linea();
    linea.nombre = 'ROS-R13';
    let payload = {
        registry: linea,
        model: 'Linea'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}

function updateGrupoLineas() {
    //constructor(id = 1, nombre = '', activo = true, lineas = []) {
    const gl = new GrupoLineas();
    let linea = getRegistryById(1, 'Linea').result;
    gl.id = 1;
    gl.nombre = 'CONGELADOS';
    gl.lineas.push(linea);
    let payload = {
        registry: gl,
        model: 'GrupoLineas'
    };
    console.log("Payload: ", payload);
    let msg = updateRegistry(payload);
    console.log("MSG: ", msg);
}

function updateLinea() {
    //constructor(id = 1, nombre = '', activo = true, lineas = []) {
    const l = new Linea();
    let gl = getRegistryById(4, 'GrupoLineas').result;
    l.id = 7;
    l.nombre = 'ROS-R1';
    l.grupo_lineas = gl;
    let payload = {
        registry: l,
        model: 'Linea'
    };
    console.log("Payload: ", payload);
    let msg = updateRegistry(payload);
    console.log("MSG: ", msg);
}

function deleteLinea() {
    //constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
    const linea = new Linea();
    linea.id = 7;
    let payload = {
        registry: linea,
        model: 'Linea'
    };
    console.log("Payload: ", payload);
    let msg = deleteRegistry(payload);
    console.log("MSG: ", msg);
}

function deleteProducto() {
    //constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
    const producto = new Producto();
    producto.id = 5;
    let payload = {
        registry: producto,
        model: 'Producto'
    };
    console.log("Payload: ", payload);
    let msg = deleteRegistry(payload);
    console.log("MSG: ", msg);
}

function deleteClave() {
    //constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
    const clave = new Clave();
    clave.id = 5;
    let payload = {
        registry: clave,
        model: 'Clave'
    };
    console.log("Payload: ", payload);
    let msg = deleteRegistry(payload);
    console.log("MSG: ", msg);
}


function deletePrecioVenta() {
    //constructor(id = 1, nombre = '', activo = true, grupo_lineas = new GrupoLineas()) {
    const precioVenta = new PrecioVenta();
    precioVenta.id = 5;
    let payload = {
        registry: precioVenta,
        model: 'PrecioVenta'
    };
    console.log("Payload: ", payload);
    let msg = deleteRegistry(payload);
    console.log("MSG: ", msg);
}