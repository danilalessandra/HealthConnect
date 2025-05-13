import React, { useState, useEffect } from 'react';
 import styles from '../styles/Recomendaciones.module.css';
 
 function Recomendaciones({ userId, textoUsuario, respuestasCuestionario }) {
     const [recomendaciones, setRecomendaciones] = useState([]);
     const [error, setError] = useState(null);
     const [cargando, setCargando] = useState(true);
 
     useEffect(() => {
         async function cargarRecomendaciones() {
             setCargando(true);
             setError(null);
             try {
                 const data = await obtenerRecomendaciones(userId, textoUsuario, respuestasCuestionario);
                 setRecomendaciones(data);
             } catch (err) {
                 setError(err.message || "Error al obtener recomendaciones");
             } finally {
                 setCargando(false);
             }
         }
 
         cargarRecomendaciones();
     }, [userId, textoUsuario, respuestasCuestionario]);
 
     async function obtenerRecomendaciones(userId, textoUsuario, respuestasCuestionario) {
         try {
             const response = await fetch(`/api/recomendaciones/${userId}/`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ texto: textoUsuario, respuestas: respuestasCuestionario })
             });
 
             if (!response.ok) {
                 throw new Error(`Error: ${response.status}`);
             }
 
             const data = await response.json();
             return data;
 
         } catch (error) {
             console.error("Error al obtener recomendaciones:", error);
             setError(error.message || "Error al obtener recomendaciones");
             return [];
         }
     }
 
     if (cargando) {
         return <div>Cargando recomendaciones...</div>;
     }
 
     if (error) {
         return <div>Error: {error}</div>;
     }
 
     if (recomendaciones.length === 0) {
         return <div>No hay recomendaciones disponibles.</div>;
     }
 
     return (
         <div className={styles.recommendationsContainer}>
             <h2 className={styles.sectionTitle}>Recomendaciones de salud mental impulsadas por IA</h2>
 
             {recomendaciones.length > 0 && recomendaciones.map((recomendacion, index) => (
                 <div key={index} className={styles.recommendationItem}>
                     <span className={styles.recommendationIcon}>
                         {/* Elige un icono basado en el tipo de recomendación */}
                         {recomendacion.tipo === 'ejercicio' && '🌬️'}
                         {recomendacion.tipo === 'afirmacion' && '✨'}
                         {recomendacion.tipo === 'recurso' && '📚'}
                         {recomendacion.tipo === 'general' && '💬'}
                         {/* ...  otros tipos */}
                     </span>
                     <p className={styles.recommendationText}>{recomendacion.texto}</p>
                     <span className={styles.recommendationArrow}>➡️</span>
                 </div>
             ))}
 
             {/* Ejemplos estáticos (¡Reemplazar con datos dinámicos!) */}
             <h3 className={styles.sectionTitle}>Prácticas diarias de salud mental</h3>
             <div className={styles.dailyPractices}>
                 <div className={styles.practiceCard} id="meditation-practice">
                     <span className={styles.practiceIcon}>⬇️</span>
                     <h4 className={styles.practiceTitle}>Meditación de atención plena</h4>
                     <p className={styles.practiceDescription}>
                         Sesión guiada de 10 minutos para reducir la ansiedad y mejorar la conciencia del momento presente.
                     </p>
                     <button className={styles.practiceButton}>Iniciar sesión</button>
                 </div>
                 <div className={styles.practiceCard} id="gratitude-diary">
                     <span className={styles.practiceIcon}>📝</span>
                     <h4 className={styles.practiceTitle}>Diario de gratitud</h4>
                     <p className={styles.practiceDescription}>
                         Registra tres cosas por las que estás agradecido para aumentar las emociones positivas y la resiliencia.
                     </p>
                     <button className={styles.practiceButton}>Revista abierta</button>
                 </div>
                 <div className={styles.practiceCard} id="nature-therapy">
                     <span className={styles.practiceIcon}>🧘‍♀️</span>
                     <h4 className={styles.practiceTitle}>Terapia de la naturaleza</h4>
                     <p className={styles.practiceDescription}>
                         Pase 20 minutos al aire libre para reducir los niveles de cortisol y mejorar el estado de ánimo.
                     </p>
                     <button className={styles.practiceButton}>Ver guía</button>
                 </div>
             </div>
 
             <h3 className={styles.sectionTitle}>Análisis de patrones de estado de ánimo</h3>
             <div className={styles.moodAnalysis}>
                 <h4 className={styles.moodAnalysisTitle}>Análisis de patrones de estado de ánimo</h4>
                 <div className={styles.moodChartContainer}>
                     {/* Aquí se renderizaría el gráfico de barras (requiere una librería de gráficos) */}
                     <img src="/images/mood_chart.png" alt="Gráfico de patrones de estado de ánimo" style={{ width: '100%' }} />
                 </div>
             </div>
 
             <h3 className={styles.sectionTitle}>Recursos generados por IA</h3>
             <div className={styles.aiResources}>
                 <div className={styles.resourceCard} id="affirmations-resource">
                     <span className={styles.resourceIcon}>✨</span>
                     <h4 className={styles.resourceTitle}>Afirmaciones personalizadas</h4>
                     <p className={styles.resourceDescription}>
                         Declaraciones positivas diarias adaptadas a tus desafíos y objetivos específicos.
                     </p>
                     <button className={styles.resourceButton}>Generar afirmaciones</button>
                 </div>
                 <div className={styles.resourceCard} id="suggestions-resource">
                     <span className={styles.resourceIcon}>📚</span>
                     <h4 className={styles.resourceTitle}>Sugerencias de lectura</h4>
                     <p className={styles.resourceDescription}>
                         Artículos y libros basados en evidencia adaptados a tus necesidades de salud mental.
                     </p>
                     <button className={styles.resourceButton}>Ver biblioteca</button>
                 </div>
                 <div className={styles.resourceCard} id="lists-resource">
                     <span className={styles.resourceIcon}>🎧</span>
                     <h4 className={styles.resourceTitle}>Listas de reproducción personalizadas</h4>
                     <p className={styles.resourceDescription}>
                         Música y meditaciones guiadas seleccionadas para mejorar tu estado de ánimo actual.
                     </p>
                     <button className={styles.resourceButton}>Escucha ahora</button>
                 </div>
             </div>
 
             <div className={styles.bottomActions}>
                 <a href="#" className={styles.bottomButton} id="download-pdf">Descargar recomendaciones en PDF</a>
                 <a href="#" className={styles.bottomButton} id="contact-provider">Compartir con el proveedor de atención médica</a>
             </div>
         </div>
     );
 }
 
 export default Recomendaciones;





























































































































































































































































