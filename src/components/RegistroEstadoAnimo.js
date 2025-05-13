import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RegistroEstadoAnimo.module.css'; // Import CSS Module
import HistorialAnimo from './HistorialAnimo'; // Asegúrate de tener estos componentes
import Recomendaciones from './Recomendaciones';
import PerfilUsuario from './PerfilUsuario';

function RegistroEstadoAnimo() {
  const navigate = useNavigate();
  const [estadoAnimoSeleccionado, setEstadoAnimoSeleccionado] = useState(null);
  const [factoresInfluencia, setFactoresInfluencia] = useState({
    sueno: false,
    estres: false,
    alimentacion: false,
    ejercicio: false,
    relacionesSociales: false,
  });
  const [notasAdicionales, setNotasAdicionales] = useState('');
  const [estadoAnimoPersonalizado, setEstadoAnimoPersonalizado] = useState('');

  const handleSeleccionarEstadoAnimo = (estado) => {
    setEstadoAnimoSeleccionado(estado);
  };

  const handleToggleFactor = (factor) => {
    setFactoresInfluencia({
      ...factoresInfluencia,
      [factor]: !factoresInfluencia[factor],
    });
  };

  const handleGuardarRegistro = () => {
    console.log('Estado de ánimo seleccionado:', estadoAnimoSeleccionado);
    console.log('Factores de influencia:', factoresInfluencia);
    console.log('Notas adicionales:', notasAdicionales);
    console.log('Estado de ánimo personalizado:', estadoAnimoPersonalizado);
    // Aquí iría la lógica para guardar el registro (API call, etc.)
    alert('Registro guardado!');
  };

  const handleVerHistorial = () => {
    navigate('/historial-animo');
  };

  const handleVerRecomendaciones = () => {
    navigate('/recomendaciones');
  };

  const handleIrPerfil = () => {
    navigate('/perfil-usuario');
  };

  const handleEstadoAnimoPersonalizadoChange = (e) => {
    setEstadoAnimoPersonalizado(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleIrPerfil} className={styles.perfilButton}>
          Mi Perfil {/* Aquí podrías mostrar un icono de perfil */}
        </button>
        <h1>Registro de Estado de Ánimo</h1>
        <p>¿Cómo te sientes hoy?</p>
      </div>

      <div className={styles.seleccionEstado}>
        <h2>Selecciona tu estado de ánimo</h2>
        <div className={styles.estados}>
          <button
            className={`${styles.estado} ${estadoAnimoSeleccionado === 5 ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionarEstadoAnimo(5)}
          >
            <span className={styles.numero}>5</span>
            <span className={styles.emoji}>😊</span>
            <span>Muy bien</span>
          </button>
          <button
            className={`${styles.estado} ${estadoAnimoSeleccionado === 4 ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionarEstadoAnimo(4)}
          >
            <span className={styles.numero}>4</span>
            <span className={styles.emoji}>🙂</span>
            <span>Bien</span>
          </button>
          <button
            className={`${styles.estado} ${estadoAnimoSeleccionado === 3 ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionarEstadoAnimo(3)}
          >
            <span className={styles.numero}>3</span>
            <span className={styles.emoji}>😐</span>
            <span>Neutral</span>
          </button>
          <button
            className={`${styles.estado} ${estadoAnimoSeleccionado === 2 ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionarEstadoAnimo(2)}
          >
            <span className={styles.numero}>2</span>
            <span className={styles.emoji}>🙁</span>
            <span>Mal</span>
          </button>
          <button
            className={`${styles.estado} ${estadoAnimoSeleccionado === 1 ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionarEstadoAnimo(1)}
          >
            <span className={styles.numero}>1</span>
            <span className={styles.emoji}>😞</span>
            <span>Muy mal</span>
          </button>
          <div className={`${styles.estado} ${styles.personalizado}`}>
            <span className={styles.emoji}>✍️</span>
            <input
              type="text"
              placeholder="Personalizado"
              value={estadoAnimoPersonalizado}
              onChange={handleEstadoAnimoPersonalizadoChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.factores}>
        <h2>¿Qué factores influyeron en tu estado de ánimo?</h2>
        <div className={styles.listaFactores}>
          <div className={styles.factor}>
            <span className={styles.icono}>🛌</span>
            <span>Sueño</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={factoresInfluencia.sueno}
                onChange={() => handleToggleFactor('sueno')}
              />
              <span className={`${styles.slider} ${factoresInfluencia.sueno ? styles.activo : ''}`}></span>
            </label>
          </div>
          <div className={styles.factor}>
            <span className={styles.icono}>🤯</span>
            <span>Estrés</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={factoresInfluencia.estres}
                onChange={() => handleToggleFactor('estres')}
              />
              <span className={`${styles.slider} ${factoresInfluencia.estres ? styles.activo : ''}`}></span>
            </label>
          </div>
          <div className={styles.factor}>
            <span className={styles.icono}>🍽️</span>
            <span>Alimentación</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={factoresInfluencia.alimentacion}
                onChange={() => handleToggleFactor('alimentacion')}
              />
              <span className={`${styles.slider} ${factoresInfluencia.alimentacion ? styles.activo : ''}`}></span>
            </label>
          </div>
          <div className={styles.factor}>
            <span className={styles.icono}>🏃‍♂️</span>
            <span>Ejercicio</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={factoresInfluencia.ejercicio}
                onChange={() => handleToggleFactor('ejercicio')}
              />
              <span className={`${styles.slider} ${factoresInfluencia.ejercicio ? styles.activo : ''}`}></span>
            </label>
          </div>
          <div className={styles.factor}>
            <span className={styles.icono}>🫂</span>
            <span>Relaciones sociales</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={factoresInfluencia.relacionesSociales}
                onChange={() => handleToggleFactor('relacionesSociales')}
              />
              <span className={`${styles.slider} ${factoresInfluencia.relacionesSociales ? styles.activo : ''}`}></span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.notas}>
        <h2>Notas adicionales</h2>
        <label htmlFor="notas" className={styles.labelNotas}>
          ¿Algo más que quieras registrar?
        </label>
        <textarea
          id="notas"
          className={styles.textareaNotas}
          value={notasAdicionales}
          onChange={(e) => setNotasAdicionales(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.botones}>
        <button className={styles.guardar} onClick={handleGuardarRegistro}>
          Guardar registro
        </button>
      </div>

      <div className={styles.navegacionInferior}>
        <button className={styles.verHistorial} onClick={handleVerHistorial}>
          Ver historial
        </button>
        <button className={styles.verRecomendaciones} onClick={handleVerRecomendaciones}>
          Ver recomendaciones
        </button>
      </div>
    </div>
  );
}

export default RegistroEstadoAnimo;