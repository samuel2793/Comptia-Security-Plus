# Dominio 5 — Gestión y supervisión del programa de seguridad

Chuleta de repaso para escenarios. Este dominio conecta la seguridad con el negocio: quién decide, qué riesgo se acepta, qué obligaciones aplican, cómo se controla a terceros, cómo se valida el programa y cómo se forma a las personas.

## 5.1 Gobernanza de seguridad

### GRC y dirección

| Elemento | Pregunta que responde | Función |
|---|---|---|
| **Gobernanza** | ¿Quién fija dirección, responsabilidad y supervisión? | Alinea seguridad con negocio, define roles, estrategia y rendición de cuentas. |
| **Gestión de riesgos** | ¿Qué puede salir mal y qué haremos? | Identifica, analiza, trata y monitoriza riesgos. |
| **Cumplimiento** | ¿Qué obligaciones debemos demostrar? | Verifica adhesión a leyes, contratos, normas y políticas. |

La dirección/apetito de riesgo procede de la alta dirección y el consejo; los equipos técnicos implementan controles y aportan evidencia. Un comité de seguridad, riesgo, auditoría, privacidad o cambios revisa asuntos especializados y escala decisiones relevantes.

**Centralizado** ofrece consistencia y visibilidad; **descentralizado** ofrece agilidad y adaptación local; en la práctica suele haber políticas mínimas centrales con ejecución local controlada.

### Documentación: de lo general a lo ejecutable

| Documento | Define |
|---|---|
| **Política** | Regla o intención obligatoria de alto nivel: qué se exige y por qué. |
| **Estándar** | Requisito técnico/medible uniforme para cumplir una política. |
| **Procedimiento** | Pasos concretos para ejecutar una tarea. |
| **Guía** | Recomendación flexible; ayuda, pero no suele ser obligatoria. |
| **Baseline** | Configuración mínima aprobada para un tipo de activo. |
| **Playbook/runbook** | Respuesta operativa a un caso o tarea recurrente. |

Una política eficaz tiene propietario, alcance, responsabilidades, excepciones, fecha de revisión, aprobación y comunicación. Las excepciones requieren justificación, riesgo residual, controles compensatorios, aprobador, caducidad y seguimiento: no son permisos permanentes.

### Roles y prácticas de gobierno

- Define RACI: **Responsible** ejecuta, **Accountable** responde en último término, **Consulted** aporta conocimiento, **Informed** debe conocer el resultado.
- Asigna propietarios de activos, datos, riesgos y controles; evita vacíos de responsabilidad.
- Integra seguridad en presupuesto, arquitectura, adquisición, cambios, proyectos, onboarding y offboarding.
- Mide cobertura de controles, cumplimiento, vulnerabilidades vencidas, incidentes, formación y riesgo residual; usa métricas para decisiones, no solo para decorar un informe.
- Revisa programa, políticas, amenazas, requisitos y eficacia de controles de forma periódica y tras cambios/incidentes.

## 5.2 Gestión de riesgos

### Conceptos y ciclo

**Riesgo**: posibilidad de que una amenaza explote una vulnerabilidad y afecte a un activo. No se elimina todo riesgo; se mantiene dentro de límites aprobados.

| Concepto | Significado |
|---|---|
| Activo | Recurso valioso: datos, personas, sistemas, procesos, reputación o instalaciones. |
| Amenaza | Causa potencial de un incidente. |
| Vulnerabilidad | Debilidad explotable. |
| Impacto | Consecuencia si el evento ocurre. |
| Riesgo inherente | Riesgo antes de controles. |
| Riesgo residual | Riesgo restante tras controles/tratamiento. |
| Propietario de riesgo | Responsable de vigilar y tratar un riesgo. |

1. Identifica activos, amenazas, vulnerabilidades, dependencias y escenarios.
2. Analiza probabilidad e impacto; registra y prioriza.
3. Trata el riesgo y asigna responsables/plazos.
4. Monitoriza cambios, eficacia de controles e indicadores.
5. Comunica y reevalúa de forma continua, ante incidentes, cambios, nuevos proveedores o nuevas obligaciones.

### Límites, análisis y métricas

| Término | Uso |
|---|---|
| **Apetito de riesgo** | Tipo/cantidad de riesgo que la organización desea asumir para lograr objetivos. |
| **Tolerancia** | Variación aceptable alrededor de un límite concreto. |
| **Umbral** | Punto que obliga a actuar, escalar o aprobar excepción. |
| **Capacidad de riesgo** | Máximo riesgo soportable antes de comprometer viabilidad u obligaciones. |
| **KRI** | Indicador de riesgo que anticipa cambio o superación de umbral. |
| **BIA** | Identifica procesos críticos, dependencias e impacto de interrupción. |

**Cualitativo** usa categorías (bajo/medio/alto) y matriz de probabilidad × impacto.  
**Cuantitativo** usa importes y frecuencias:

- **SLE** = pérdida única esperada.
- **ARO** = frecuencia anual esperada.
- **ALE** = SLE × ARO; pérdida anual esperada.

| Continuidad | Pregunta |
|---|---|
| **RTO** | ¿Cuánto puede tardar la recuperación? |
| **RPO** | ¿Cuántos datos, medidos en tiempo, se pueden perder? |
| **MTTR** | Tiempo medio para reparar/recuperar. |
| **MTBF** | Tiempo medio entre fallos. |

### Tratamiento

| Opción | Ejemplo |
|---|---|
| **Evitar** | No ejecutar una actividad demasiado arriesgada. |
| **Mitigar** | Aplicar controles para reducir probabilidad o impacto. |
| **Transferir** | Seguro, contrato o proveedor asume parte de la consecuencia. |
| **Aceptar** | Decisión informada y autorizada de conservar riesgo residual. |

Un registro de riesgos debe incluir descripción, activo, amenaza/vulnerabilidad, propietario, nivel inherente/residual, controles, plan, fecha, estado, excepción y revisión. Transferir riesgo no elimina la responsabilidad de gestionarlo.

## 5.3 Riesgos de terceros

### Alcance y ciclo de vida

Tercero incluye proveedor cloud/SaaS, contratista, subprocesador, MSP, fabricante, socio, integrador y cadena de suministro. Su compromiso puede afectar confidencialidad, integridad, disponibilidad, cumplimiento y reputación de la organización.

| Fase | Verifica |
|---|---|
| Clasificación | Criticidad, datos, privilegios, conectividad, dependencia y subcontratación. |
| Due diligence | Postura de seguridad, privacidad, solvencia, continuidad, historial y evidencias. |
| Contrato | Requisitos, responsabilidades, notificación, auditoría, SLA, tratamiento de datos y salida. |
| Onboarding | Accesos mínimos, segmentación, cuentas nominativas, MFA y contactos de escalado. |
| Monitorización | Cambios, SLA, certificaciones, incidentes, vulnerabilidades y subprocesadores. |
| Offboarding | Revocar accesos, devolver/destruir datos, confirmar retención y transición segura. |

El nivel de revisión es proporcional al riesgo: un proveedor con PII, acceso privilegiado o servicio crítico requiere controles y vigilancia reforzados.

### Evidencias y contratos

| Elemento | Propósito |
|---|---|
| Cuestionario / evaluación | Obtener información sobre controles, datos, IAM, continuidad e incidentes. |
| Informe independiente (p. ej., SOC) | Evidencia de controles evaluados; revisa alcance, periodo y excepciones. |
| Derecho de auditoría | Permite verificar controles o recibir evidencia pactada. |
| SLA | Métricas de servicio: disponibilidad, soporte, RTO/RPO, créditos/penalizaciones. |
| NDA | Protege confidencialidad de información compartida. |
| DPA | Regula tratamiento de datos personales entre partes. |
| MSA/SOW | Marco general y alcance/entregables específicos del servicio. |

Incluye requisitos de cifrado, localización/residencia, gestión de vulnerabilidades, notificación de incidentes, subcontratación, propiedad de datos, borrado, continuidad, seguros y obligación de colaborar en investigaciones. Un SLA mide el servicio; no sustituye requisitos de seguridad.

### Cadena de suministro

- Evalúa hardware, firmware, software, bibliotecas, actualizaciones, repositorios, integridad y procedencia.
- Mantén inventario de dependencias/SBOM cuando aplique y valida firmas/origen de actualizaciones.
- Reduce privilegios e integración de terceros; segmenta y monitoriza conexiones.
- Define reglas de compromiso y autorización por escrito antes de cualquier prueba técnica sobre sistemas de terceros.

## 5.4 Cumplimiento

### Qué exige

| Fuente | Ejemplo de obligación |
|---|---|
| Ley/regulación | Protección de datos, privacidad, notificación de brechas, conservación o requisitos sectoriales. |
| Contrato | Controles, informes, residencia, SLA, auditorías y tratamiento de datos. |
| Estándar/marco | Buenas prácticas o controles para estructurar el programa: NIST, ISO/IEC 27001, CIS, etc. |
| Política interna | Regla organizativa aprobada para cumplir objetivos y obligaciones. |

No confundas: una ley puede obligar; un estándar puede ser voluntario salvo que contrato/regulación lo exija; una certificación demuestra evaluación frente a un esquema concreto, no seguridad absoluta.

### Programa de cumplimiento eficaz

1. Identifica requisitos por jurisdicción, sector, datos, clientes y contratos.
2. Traduce requisitos a controles, propietarios y evidencias.
3. Implementa políticas, procedimientos, formación y controles técnicos/físicos.
4. Evalúa periódicamente, registra desviaciones y corrige.
5. Conserva evidencia, informa a las partes adecuadas y actualiza ante cambios.

Usa un conjunto armonizado de controles para mapear varios requisitos sin implementar controles inconexos. Considera datos en producción, backups, logs, réplicas, soporte y proveedores; también pueden estar sujetos a obligaciones.

**Privacidad:** limita recogida y uso a una finalidad, aplica minimización, retención, seguridad, derechos de interesados y notificación conforme al requisito aplicable.  
**Legal hold:** suspende la destrucción ordinaria cuando existe deber de preservar información para litigio/investigación.

## 5.5 Auditorías y evaluaciones

### Propósito y diferencias

| Actividad | Pregunta principal | Resultado |
|---|---|---|
| **Auditoría** | ¿Los controles/procesos cumplen el criterio y funcionan según evidencia? | Conclusiones, hallazgos y recomendaciones de cumplimiento/eficacia. |
| **Evaluación** | ¿Qué riesgos, amenazas o vulnerabilidades existen? | Análisis y priorización de debilidades/riesgos. |
| **Examen** | ¿Se cumplen requisitos detallados, a veces también de personal? | Inspección formal frente a regulación/autoridad. |
| **Vulnerability assessment** | ¿Qué debilidades conocidas se detectan? | Lista validada y priorizada; no demuestra explotación. |
| **Pentest** | ¿Se puede explotar una debilidad y qué impacto tiene? | Evidencia de rutas/impacto dentro del alcance autorizado. |

**Interna:** la realiza la organización; es útil para mejora, autoevaluación y preparación.  
**Externa:** la realiza un tercero independiente; aporta objetividad, validación contractual/regulatoria o confianza de clientes.  
El comité de auditoría supervisa alcance, independencia, resultados, remediación y cumplimiento.

### Pentest y atestación

Todo pentest exige autorización, alcance, activos excluidos, horarios, contacto de emergencia, reglas de compromiso y protección de evidencia. El reconocimiento puede ser **pasivo** (información disponible sin interactuar directamente) o **activo** (interacción autorizada); no excedas nunca el alcance.

| Conocimiento previo | Equivalencia |
|---|---|
| **White box** | Amplio conocimiento del entorno. |
| **Gray box** | Conocimiento parcial. |
| **Black box** | Poco o ningún conocimiento inicial. |

El informe explica hallazgos, riesgo y remediación. La **atestación de hallazgos** es una declaración formal que confirma actividad/resultados y aporta la evidencia apropiada para terceros o cumplimiento. La atestación no implica necesariamente entregar código, credenciales o material sensible usado durante una prueba.

Remedia, verifica, documenta riesgo residual y cierra solo cuando la corrección sea comprobada.

## 5.6 Concienciación de seguridad

### Ingeniería social y phishing

Los atacantes explotan a personas mediante **autoridad, urgencia, prueba social, escasez, simpatía/familiaridad y miedo**. Ante presión para saltarse un proceso, el usuario debe detenerse, verificar por canal independiente y reportar.

| Señal de phishing | Conducta correcta |
|---|---|
| Urgencia, amenaza o premio improbable | No actuar bajo presión; verificar independientemente. |
| Solicitud inusual de contraseña, MFA, pago o datos | No facilitar secretos; confirmar con contacto conocido. |
| URL o remitente que no coincide | Revisar dominio real; abrir sitio desde marcador/dirección conocida. |
| Enlace/adjunto inesperado | No abrir; reportar según proceso. |
| Gramática pobre o identidad suplantada | Tratar como señal, no como único criterio: un mensaje puede estar muy bien escrito. |

Tras reportar, el equipo analiza, busca mensajes similares, comunica a usuarios, investiga clics/credenciales y ajusta filtros/controles. Reportar pronto es preferible a ocultar un error.

### Campañas y formación

Una campaña anti-phishing legítima requiere autorización, objetivos de aprendizaje, alcance, privacidad, soporte y plan de comunicación. Combina formación práctica, simulaciones proporcionadas, métricas y refuerzo sin enfoque punitivo.

Mide tasas de reporte, clic, entrega, finalización, reincidencia y mejora por áreas; interpreta las métricas con contexto. Proporciona formación remedial cuando haga falta y repite con amenazas relevantes.

### Prácticas diarias

- Usa gestor de contraseñas y contraseñas únicas/largas; activa MFA y no apruebes solicitudes inesperadas.
- Mantén conciencia situacional: evita shoulder surfing y conversaciones sensibles en público; protege pantalla/dispositivo.
- No conectes USB, cables o cargadores desconocidos; entrega soportes encontrados al canal indicado.
- Impide tailgating/piggybacking: cada persona debe autenticarse; informa de accesos no autorizados.
- Evita divulgar horarios, proyectos, estructura interna o detalles útiles para pretexting; esto es **OPSEC**.
- Lee y sigue políticas/manuales; consulta si el caso no está cubierto.

### Amenazas internas, remoto y cultura

Una amenaza interna puede ser maliciosa o no intencionada. Señales de comportamiento o acceso anómalo deben investigarse con necesidad, proporcionalidad, confidencialidad, respeto a privacidad y apoyo de RR. HH./legal: una señal no prueba culpabilidad.

Para trabajo remoto/híbrido: dispositivo corporativo o gestionado, VPN/acceso seguro, MFA, cifrado, actualizaciones, bloqueo de pantalla, protección física, red doméstica segura, backups y reporte inmediato de pérdida/incidente.

Una cultura sana empieza en liderazgo y se mantiene con políticas claras, formación continua, ejemplos prácticos, canales sencillos de reporte, ausencia de represalias por errores honestos, métricas y ciclos de mejora. Seguridad es responsabilidad compartida, no solo del SOC.

## Decisiones rápidas de examen

| Si el escenario pide… | Piensa primero en… |
|---|---|
| Dirección, responsabilidades y reglas de seguridad | Gobernanza, comité/propietario, política/estándar/procedimiento. |
| Decidir qué hacer con riesgo residual | Apetito/tolerancia, propietario y evitar/mitigar/transferir/aceptar. |
| Estimar pérdida anual esperada | ALE = SLE × ARO. |
| Evaluar proveedor que maneja datos críticos | Due diligence proporcional, evidencias, DPA/SLA, derecho de auditoría y monitorización. |
| Cumplir varias normas sin duplicar controles | Marco/control común y mapeo de requisitos-evidencias. |
| Verificar cumplimiento independiente | Auditoría externa. |
| Buscar debilidades conocidas antes de producción | Evaluación de vulnerabilidades. |
| Demostrar impacto explotable con autorización | Pentest con reglas de compromiso. |
| Probar a un tercero que la prueba se realizó | Atestación de hallazgos con evidencia apropiada. |
| Reducir éxito de phishing | Formación continua + simulaciones + reporte rápido + controles técnicos. |

## Errores frecuentes

- Confundir gobernanza (dirección/supervisión), riesgo (priorización/tratamiento) y cumplimiento (obligaciones/evidencia).
- Aceptar un riesgo sin responsable, aprobación, fecha de revisión ni registro.
- Confiar en certificación o SLA de un proveedor sin revisar alcance, excepciones y riesgos propios.
- Considerar un escaneo como prueba de explotación o una auditoría como evaluación de vulnerabilidades.
- Ejecutar pruebas contra terceros sin autorización y reglas de compromiso.
- Tratar la formación como una sesión anual aislada o usar simulaciones para castigar.
- Ignorar señales internas o investigarlas sin proporcionalidad, privacidad y proceso.
