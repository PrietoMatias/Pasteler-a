import {User} from '../services/methods/users.class.js';

const register = async (req,res)=>{
    try {
        const data = req.body;
        const user = await User.register(data);
        if(!user){
            res.status(403).json({message:'Error en la consulta'});
            return;
        }
        res.status(201).json({message:'Usuario creado con éxito, ' + user})
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error})
    }
}
const Login = async(req,res)=>{
    try {
        const token = await User.login(req.body);
        if (!token) {
            res.status(401).json('Usuario o contraseñas incorrectos');
            return;
        }
        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production', 
        });
        console.log(token)
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
}

const updateUser = async(req,res)=>{
    try {
        const data = req.body;
        const id = res.locals.user.id;
        const user = await User.updateUser(id, data);
        if(!user){
            res.status(403).json({message:'Error al actualizar usuario'});
            return;
        }
        res.status(200).json({message:'Usuario actualizado con éxito: ' + user});
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}
const deleteUser = async(req,res)=>{
    try {
        const id = res.locals.user.id;
        const user = await User.deleteUser(id);
        if(!user){
            res.status(403).json({message:'Error al eliminar cuenta'});
            return;
        }
        res.status(200).json({message:'Cuenta eliminada con éxito.'});
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor: ' + error});
    }
}

export {
    register, Login, updateUser, deleteUser
}