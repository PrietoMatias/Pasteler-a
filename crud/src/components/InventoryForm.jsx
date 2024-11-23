import { useState, useEffect } from 'react';
import M from 'materialize-css';

const InventoryForm = ({ item, onSave, onCancel, suppliers1 }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        supplier: '', 
    });
    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        console.log("Select inicializado con Materialize");
    }, [suppliers]); 
    const fetchSuppliers = () => {
        try {
            const data = suppliers1;
            console.log("Proveedores obtenidos: ", data); 
            
            if (data && Array.isArray(data) && data.length > 0) {
                setSuppliers(data);
                console.log("Proveedores guardados en el estado:", data);
            } else {
                console.error("No se recibieron proveedores válidos.");
            }
        } catch (error) {
            console.error("Error al obtener proveedores: ", error);
        }
    }; 
       useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                supplier: item.suppliers ? item.suppliers._id : "",
            });
        }
    }, [item]);
    useEffect(() => {
        fetchSuppliers();
    }, []); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); 
    };

    console.log("Estado de proveedores: ", suppliers); 
    console.log("Form data: ", formData); 
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del ingrediente:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Proveedor:</label>
                {suppliers.length > 0 ? (
                    <select
                        name="suppliers"
                        value={formData.supplier || ""} // Asegurémonos de que siempre haya un valor para value
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un proveedor</option> 
                        {suppliers.map((supplier) => (
                            <option key={supplier._id} value={supplier._id}>
                                {supplier.name} 
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>Cargando proveedores...</p>
                )}
            </div>
            <br />
            <button type="submit" className="waves-effect waves-light btn #4caf50 green">
                Guardar
            </button>
            <button
                type="button"
                className="waves-effect waves-light btn #d50000 red accent-4"
                onClick={onCancel}
            >
                Cancelar
            </button>
        </form>
    );
};

export default InventoryForm;