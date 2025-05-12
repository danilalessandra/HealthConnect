import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/PerfilUsuario.module.css';

function PerfilUsuario() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        nombreCompleto: '',
        email: '',
        numeroTelefono: '',
        fechaNacimiento: '',
        altura: '',
        peso: '',
        condicionesMedicas: '',
        medicamentosActuales: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Asumiendo que tienes alguna forma de obtener el ID del usuario (ej: localStorage, params de la URL)
                const userId = localStorage.getItem('userId'); // Reemplaza con tu lógica

                if (userId) {
                    const response = await fetch(`/api/users/${userId}`); // Ajusta la ruta de tu API
                    if (!response.ok) {
                        throw new Error(`Error al cargar datos del usuario: ${response.status}`);
                    }
                    const data = await response.json();
                    setUserData(data);
                    setEditedData(data);
                } else {
                    setError('ID de usuario no encontrado.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error al cargar los datos del usuario.');
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Ya no hay dependencia de currentUser

    const handleLogout = () => {
        // Aquí deberías implementar la lógica para cerrar sesión
        // dependiendo de cómo esté gestionada tu autenticación.
        localStorage.removeItem('userId'); // Ejemplo: eliminar ID del almacenamiento local
        navigate('/login');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedData(userData);
    };

    const handleSaveClick = async () => {
        try {
            // Asumiendo que tienes alguna forma de obtener el ID del usuario
            const userId = localStorage.getItem('userId'); // Reemplaza con tu lógica

            if (userId) {
                const response = await fetch(`/api/users/${userId}`, { // Ajusta la ruta de tu API
                    method: 'PUT', // O POST, dependiendo de tu API para actualizar
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedData),
                });
                if (!response.ok) {
                    throw new Error(`Error al guardar cambios: ${response.status}`);
                }
                const updatedData = await response.json();
                setUserData(updatedData);
                setIsEditing(false);
            } else {
                setError('ID de usuario no encontrado.');
            }
        } catch (err) {
            setError('Error al guardar los cambios.');
            console.error("Error updating user data:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className={styles.perfilContainer}>
            {loading && <div>Cargando datos del usuario...</div>}
            {error && <div className={styles.error}>{error}</div>}

            {!loading && !error && userData && (
                <>
                    <section className={styles.informacionPersonal}>
                        <h2 className={styles.seccionTitulo}>Información personal</h2>
                        {isEditing ? (
                            <div className={styles.editForm}>
                                <label>Nombre completo:</label>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    value={editedData.nombreCompleto || ''}
                                    onChange={handleInputChange}
                                />

                                <label>Correo electrónico:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email || ''}
                                    onChange={handleInputChange}
                                    readOnly
                                />

                                <label>Número de teléfono:</label>
                                <input
                                    type="text"
                                    name="numeroTelefono"
                                    value={editedData.numeroTelefono || ''}
                                    onChange={handleInputChange}
                                />

                                <label>Fecha de nacimiento:</label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    value={formatDateForInput(editedData.fechaNacimiento)}
                                    onChange={handleInputChange}
                                />

                                <div className={styles.formButtons}>
                                    <button onClick={handleSaveClick}>Guardar</button>
                                    <button onClick={handleCancelEdit}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoDisplay}>
                                <p><strong>Nombre completo:</strong> {userData.nombreCompleto}</p>
                                <p><strong>Correo electrónico:</strong> {userData.email}</p>
                                <p><strong>Número de teléfono:</strong> {userData.numeroTelefono}</p>
                                <p><strong>Fecha de nacimiento:</strong> {userData.fechaNacimiento}</p>
                                <button onClick={handleEditClick}>Editar</button>
                            </div>
                        )}
                    </section>

                    <section className={styles.informacionSalud}>
                        <h2 className={styles.seccionTitulo}>Información de salud</h2>
                        {isEditing ? (
                            <div className={styles.editForm}>
                                <label>Altura:</label>
                                <input
                                    type="text"
                                    name="altura"
                                    value={editedData.altura || ''}
                                    onChange={handleInputChange}
                                />

                                <label>Peso:</label>
                                <input
                                    type="text"
                                    name="peso"
                                    value={editedData.peso || ''}
                                    onChange={handleInputChange}
                                />

                                <label>Condiciones médicas:</label>
                                <textarea
                                    name="condicionesMedicas"
                                    value={editedData.condicionesMedicas || ''}
                                    onChange={handleInputChange}
                                />

                                <label>Medicamentos actuales:</label>
                                <textarea
                                    name="medicamentosActuales"
                                    value={editedData.medicamentosActuales || ''}
                                    onChange={handleInputChange}
                                />

                                <div className={styles.formButtons}>
                                    <button onClick={handleSaveClick}>Guardar</button>
                                    <button onClick={handleCancelEdit}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoDisplay}>
                                <p><strong>Altura:</strong> {userData.altura}</p>
                                <p><strong>Peso:</strong> {userData.peso}</p>
                                <p><strong>Condiciones médicas:</strong> {userData.condicionesMedicas}</p>
                                <p><strong>Medicamentos actuales:</strong> {userData.medicamentosActuales}</p>
                                <button onClick={handleEditClick}>Editar</button>
                            </div>
                        )}
                    </section>

                    <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
                </>
            )}
        </div>
    );
}

export default PerfilUsuario;

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































