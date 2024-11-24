import {InventoryClass} from '../services/methods/inventory.class.js'

const addInventory = async (req,res)=>{
    try {
        const data = req.body
        const newInventory = await InventoryClass.addInventory(data)
        if(!newInventory){
            res.status(404).json({message:'Error al ingresar inventario'});
            return
        }
        res.status(201).json({message:'Inventario agregado con éxito: '+ newInventory});
    } catch (error) {
        res.status(500).json({message:'Error interno: ' + error})
    }
}

const updateInventory = async(req,res)=>{
    try {
        const data = req.body;
        const id = req.params.id;
        const updateInventory = await InventoryClass.updateInventory(id,data)
        if(!updateInventory){
            res.status(404).json({message:'Error al actualizar inventario'});
            return;
        }
        res.status(200).json({message:'Actualizado con éxito: ' + updateInventory});
    } catch (error) {
        res.status(500).json({message:'Error intertno: ' + error});
    }
}

const getInventories = async (req,res)=>{
    try {
        const inventories = await InventoryClass.allInventorys();
        if(!inventories){
            res.status(404).json({message:'Error al traer inventarios'});
            return
        }
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

const deleteInventory = async (req,res)=>{
    try {
        const id = req.params.id;
        const deleteInventory = await InventoryClass.deleteInventory(id);
        if(!deleteInventory){
            res.status(404).json({message:'Error al eliminar inventario'});
        }
        res.status(200).json({message:'Eliminado con éxito'});
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}


export{
    getInventories,
    addInventory,
    updateInventory,
    deleteInventory
}