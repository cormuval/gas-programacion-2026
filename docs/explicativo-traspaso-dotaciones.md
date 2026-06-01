# Automatización del Traspaso de Dotaciones HNC 2026

Este documento explica de forma sencilla cómo funciona la herramienta de sincronización automática que traspasa los datos del personal de salud de la campaña de **Horas No Clínicas (HNC) 2026** a las planillas de **Programación APS 2026** individuales de cada centro.

---

### ¿En qué consiste esta actualización?

Anteriormente, cada centro de salud gestionaba sus dotaciones en una planilla HNC individual. Con esta actualización:
1. **Un solo origen**: Toda la información de horas clínicas y cargos de todos los centros ahora se administra en una **única planilla maestra consolidada** (`CONSO_HNC_HC`).
2. **Distribución automática**: El sistema lee esta planilla centralizada, detecta a qué establecimiento pertenece cada funcionario y distribuye de forma automática los registros correspondientes al archivo de destino de cada centro.

---

### ¿Qué información se traspasa automáticamente?

El sistema actualiza de forma automática las siguientes columnas en la pestaña `DOTACION` de cada establecimiento:

* **Estamento y Cargo**: Copia el cargo oficial del funcionario (por ejemplo: "Cirujano Dentista" se traduce automáticamente al estamento "Odontólogo/a").
* **Categoría**: La clasificación contractual del funcionario (ej. CAT_A).
* **Calidad**: Se registra de manera estándar como `"DOTACION"`.
* **Nombre**: El nombre completo del funcionario.
* **Horas Semanales (Jornada)**: La carga horaria de su contrato (ej. 44, 33 o 22 horas).
* **Días de Programación**: Establecido de forma fija en `248` días anuales.
* **Total de Horas Clínicas al Año**: El volumen total de horas asistenciales asignadas que el profesional debe cumplir durante el año.

*Nota: Las demás columnas intermedias se mantienen limpias o se calculan directamente en la planilla de destino.*

---

### Beneficios clave para el equipo

* **Cero Trabajo Manual**: El equipo ya no necesita copiar y pegar datos de funcionarios entre planillas, lo que elimina por completo el riesgo de errores de digitación.
* **Limpieza Automática**: Cada vez que el sistema se ejecuta, borra los datos antiguos del centro y pega la dotación vigente actualizada. Si un funcionario es trasladado o retirado de la planilla maestra, su registro antiguo desaparecerá automáticamente del centro correspondiente, evitando registros fantasma.
* **Datos Sincronizados**: Garantiza que los directores de centros y los equipos de programación trabajen exactamente con la misma información oficial y centralizada de la campaña HNC 2026.
