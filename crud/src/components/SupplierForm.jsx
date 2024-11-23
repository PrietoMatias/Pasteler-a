import { useState, useEffect } from "react";

const SupplierForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: '',
      address: '',
      contacts: [{ phoneNumber: '', email: '', location: '', socialMedia: [] }]
    });
  
    useEffect(() => {
      if (item) {
        setFormData({
          name: item.name || '',
          address: item.address || '',
          contacts: item.contacts || [{ phoneNumber: '', email: '', location: '', socialMedia: [] }]
        });
      }
    }, [item]);
  
    const handleChange = (e, index) => {
      const { name, value } = e.target;
      const updatedContacts = [...formData.contacts]; 
      updatedContacts[index][name] = value; 
      setFormData({
        ...formData,
        contacts: updatedContacts, 
      });
    };
  
    const handleAddContact = () => {
      setFormData({
        ...formData,
        contacts: [...formData.contacts, { phoneNumber: '', email: '', location: '', socialMedia: [] }],
      });
    };
  
    const handleRemoveContact = (index) => {
      const updatedContacts = formData.contacts.filter((_, i) => i !== index); 
      setFormData({
        ...formData,
        contacts: updatedContacts,
      });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        const updatedItem = {
          ...formData,
          _id: item?._id,
        };
      
        
        onSave(updatedItem);
      };
      
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del proveedor:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
  
        {formData.contacts.map((contact, index) => (
          <div key={index}>
            <h5>Contacto #{index + 1}</h5>
            <div>
              <label>Teléfono:</label>
              <input
                type="text"
                name="phoneNumber"
                value={contact.phoneNumber}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Ubicación:</label>
              <input
                type="text"
                name="location"
                value={contact.location}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Redes Sociales:</label>
              <input
                type="text"
                name="socialMedia"
                value={contact.socialMedia.join(', ')}
                onChange={(e) => {
                  const socialArray = e.target.value.split(',').map(item => item.trim());
                  setFormData({
                    ...formData,
                    contacts: formData.contacts.map((c, i) =>
                      i === index ? { ...c, socialMedia: socialArray } : c
                    ),
                  });
                }}
              />
            </div>
            <button type="button" onClick={() => handleRemoveContact(index)}
                className="waves-effect waves-light btn-small #d50000 red accent-4"
                >
              Eliminar Contacto
            </button>
          </div>
        ))}
  
  <button
  type="button"
  className="waves-effect waves-light btn-small #4caf50 green"
  onClick={handleAddContact}
>
  Agregar Contacto
</button>

<button
  type="submit"
  className="waves-effect waves-light btn-small #4caf50 green"
>
  Guardar
</button>

<button
  type="button"
  className="waves-effect waves-light btn-small #d50000 red accent-4"
  onClick={onCancel}
>
  Cancelar
</button>
      </form>
    );
  };

export default SupplierForm;
