# Dominio 4 — Operaciones de seguridad

Chuleta de repaso para escenarios. El Dominio 4 trata de ejecutar la seguridad: conocer los activos, mantenerlos endurecidos, vigilar evidencias, gestionar identidades, responder de forma controlada y mejorar continuamente.

## 4.1 Seguridad de recursos informáticos

### Hardening y línea base

**Hardening**: reducir la superficie de ataque de un activo según su función. Parte de una **línea base segura** aprobada y repetible.

| Control | Aplicación |
|---|---|
| Parches y firmware | Corrige vulnerabilidades; prueba, despliega por fases y verifica. |
| Configuración segura | Elimina valores por defecto, servicios, puertos, cuentas y software innecesarios. |
| Mínimo privilegio | Usuarios y servicios solo tienen permisos imprescindibles. |
| EDR/antimalware y firewall host | Previene/detecta actividad en el endpoint y movimiento lateral. |
| Cifrado | Protege datos en dispositivos, almacenamiento y comunicaciones. |
| Registro y sincronización de tiempo | Permite detectar, investigar y correlacionar eventos. |
| Control de aplicaciones | Permite solo software autorizado cuando el riesgo lo requiere. |

Una baseline debe estar versionada, documentada, probada, aplicada de forma consistente, monitorizada contra desviaciones y revisada tras cambios relevantes.

### Móviles, cloud, IoT y OT

| Entorno | Controles principales |
|---|---|
| **Móvil** | MDM/UEM, cifrado, PIN/biometría, actualizaciones, separación de datos corporativos, inventario, borrado remoto y control de apps. |
| **BYOD** | Política de propiedad/privacidad, requisitos de parcheado y cifrado, contenedor de trabajo y capacidad de retirar solo datos corporativos. |
| **Cloud** | IAM/MFA, mínimo privilegio, configuración revisada, logs, cifrado, gestión de claves y responsabilidad compartida. |
| **IoT/embedded** | Inventario, credenciales no predeterminadas, firmware autorizado, segmentación y servicios mínimos. |
| **ICS/SCADA/OT** | Segmentar de IT, bastión para acceso remoto, control de cambios, monitorización y coordinación con operaciones: disponibilidad y seguridad física son críticas. |

### Wi-Fi, Bluetooth y aplicaciones

- Wi-Fi empresarial: WPA2/WPA3-Enterprise, 802.1X/EAP, RADIUS, segmentación de invitados, ubicación segura de AP y detección de AP no autorizados.
- Bluetooth: desactiva descubrimiento cuando no se usa, limita emparejamientos, aplica actualizaciones y evita conexiones desconocidas.
- Aplicaciones: valida entradas en servidor, usa consultas parametrizadas, gestión de errores segura, dependencias actualizadas y revisiones SAST/DAST/SCA.
- Cookies de sesión: usa atributos **Secure**, **HttpOnly** y **SameSite**; protege contra exposición por HTTP, scripts y solicitudes cruzadas.
- Firma de código confirma origen e integridad; **sandboxing** limita el impacto de software no confiable.

## 4.2 Gestión de activos

### Inventario y ciclo de vida

No se puede proteger lo que se desconoce. El inventario debe incluir hardware, software, datos, cuentas, servicios cloud, dispositivos móviles y dependencias.

| Etapa | Resultado esperado |
|---|---|
| Adquisición | Requisitos de seguridad, proveedor evaluado y capacidad de soporte/actualización. |
| Alta/provisioning | Identificador, propietario, ubicación, clasificación, configuración segura y registro. |
| Uso/mantenimiento | Inventario actualizado, licencias, parches, monitorización y cambios trazables. |
| Reasignación | Revocar accesos y sanear datos antes de entregar a otro usuario. |
| Retirada | Backup/retención autorizados, eliminación de cuentas y datos, saneamiento y evidencia. |

Asigna propietario a cada activo; correlaciona CMDB/inventario con escáneres, EDR, MDM y cuentas cloud para descubrir activos no gestionados.

### Datos, retención y disposición

- Etiqueta y clasifica datos para definir acceso, cifrado, retención, backup y destrucción.
- La retención responde a necesidades de negocio, contrato, normativa y litigio; no conserves datos sin justificación.
- Al retirar soportes, aplica el método aprobado: **clear** (borrado lógico), **purge** (eliminación más profunda, p. ej. criptográfica) o **destroy** (destrucción física).
- Conserva certificados de destrucción y cadena de custodia cuando sea necesario.
- Un disco formateado o una cuenta desactivada de forma incompleta pueden seguir exponiendo información.

## 4.3 Gestión de vulnerabilidades

### Ciclo continuo

1. Define alcance e inventario.
2. Identifica mediante escáneres, avisos de fabricante, auditorías, pruebas autorizadas e inteligencia.
3. **Valida**: un hallazgo puede ser falso positivo o no aplicar.
4. Analiza activo, exposición, explotación activa, impacto de negocio y controles existentes.
5. Prioriza, asigna propietario y plazo.
6. Trata el riesgo: remediar, mitigar, aceptar o transferir con aprobación.
7. Verifica la corrección y vigila recurrencias.
8. Informa con métricas, excepciones y riesgo residual.

| Fuente / técnica | Aporta | No implica |
|---|---|---|
| Escáner de vulnerabilidades | Cobertura repetible de software, puertos y configuraciones. | Que la debilidad sea explotable o crítica para el negocio. |
| Pentest autorizado | Demuestra rutas e impacto dentro de alcance. | Cobertura perpetua de todo el entorno. |
| Auditoría | Compara controles y procesos con requisitos/baselines. | Explotación técnica demostrada. |
| SAST | Analiza código sin ejecutar. | Comportamiento real de la aplicación desplegada. |
| DAST | Prueba aplicación en ejecución. | Visibilidad completa del código y dependencias. |
| SCA | Identifica dependencias/componentes vulnerables. | Que estén expuestos o sean explotables. |

### Priorización y cambio seguro

- **CVE** identifica una vulnerabilidad conocida; **CVSS** estima severidad técnica. Ninguno sustituye el contexto.
- Sube prioridad si el activo es crítico o expuesto a Internet, existen exploits/actividad real, afecta datos sensibles o no hay control compensatorio.
- Antes de parchear: backup, prueba, ventana, plan de reversión, aprobación y comunicación.
- Después: reescanea, confirma versión/configuración y comprueba que el servicio funciona.
- Una excepción necesita propietario, motivo, controles compensatorios, fecha de vencimiento y aceptación explícita del riesgo.

## 4.4 Alertas y monitorización

### Resultados y línea base

| Resultado | Significado |
|---|---|
| **True positive** | Detecta correctamente una actividad maliciosa. |
| **False positive** | Alerta de algo benigno; genera ruido. |
| **True negative** | No alerta ante actividad benigna. |
| **False negative** | No detecta actividad maliciosa; es el riesgo más peligroso. |

Una **línea base** describe comportamiento normal: volumen, horarios, destinos, procesos, autenticaciones y uso de recursos. Una anomalía inicia investigación, no prueba por sí sola un incidente.

### Herramientas y fuentes

| Tecnología | Función |
|---|---|
| **SIEM** | Centraliza, normaliza, correlaciona y alerta sobre logs de múltiples fuentes. |
| **SOAR** | Orquesta playbooks, enriquecimiento, tickets y respuestas repetibles. |
| **EDR/XDR** | Telemetría y respuesta en endpoint; XDR correlaciona varias capas. |
| **DLP** | Detecta/controla salida y uso de datos sensibles. |
| **SNMP** | Supervisa estado/rendimiento de dispositivos; usa versiones y credenciales seguras. |
| **SCAP** | Automatiza evaluación de configuraciones y vulnerabilidades frente a estándares. |
| **NetFlow/sFlow/IPFIX** | Resume quién habla con quién, volumen, puertos y duración; normalmente no carga útil. |
| **PCAP** | Conserva paquetes para análisis profundo; costoso y de retención limitada. |

Buenas alertas tienen activo, usuario, hora, severidad, contexto, evidencia, propietario y acción de escalado. Ajusta reglas con cambios aprobados y casos reales para reducir fatiga de alertas; no silencies una alerta sin entenderla.

## 4.5 Capacidades de seguridad empresarial

### Selección de controles

| Necesidad | Control más directo |
|---|---|
| Impedir software no autorizado | Allowlisting/control de aplicaciones; GPO, SELinux o AppArmor según plataforma. |
| Restringir flujos entre zonas | Firewall/ACL y segmentación; denegación por defecto. |
| Admitir solo dispositivos conformes a red | NAC, 802.1X/EAP y evaluación de postura. |
| Evitar fuga de PII/datos regulados | DLP, clasificación, permisos y cifrado. |
| Bloquear dominios o navegación maliciosa | Filtrado DNS/web/proxy. |
| Reducir correo malicioso | SPF, DKIM, DMARC, filtrado, sandbox y formación. |
| Detectar cambios críticos de archivos | FIM. |
| Investigar/contener endpoint | EDR. |
| Correlacionar red, endpoint, correo e identidad | XDR/SIEM. |
| Detectar conducta anómala de usuario/entidad | UBA/UEBA. |

**FIM** alerta de cambios en archivos/configuraciones sensibles; **UEBA** compara comportamiento contra baselines; ninguno sustituye control de acceso o parches.

### Red y contenido

- ACL/firewall: define origen, destino, puerto, protocolo, dirección y acción; orden y regla por defecto importan.
- Inline puede bloquear; pasivo/out-of-band observa. Elige fail-open o fail-closed según si priorizas disponibilidad o seguridad.
- DLP puede alertar, bloquear, cuarentenar, cifrar o requerir justificación; pruébalo con datos representativos.
- SASE combina capacidades de red y seguridad entregadas desde cloud; SD-WAN optimiza/conduce conectividad WAN. No son sinónimos.

## 4.6 Gestión de identidades y accesos (IAM)

### Ciclo de identidad y mínimo privilegio

| Fase | Control |
|---|---|
| **Identity proofing** | Verifica que la persona es quien dice ser antes de crear identidad. |
| **Provisioning** | Crea cuenta, grupos, licencias, MFA y accesos mínimos aprobados. |
| **Movimiento/cambio de puesto** | Ajusta permisos al nuevo rol; evita acumulación de privilegios. |
| **Deprovisioning** | Revoca cuentas, tokens, sesiones, claves, accesos físicos y SaaS al salir. |
| **Recertificación/attestation** | Responsable revisa periódicamente que los accesos siguen siendo necesarios. |

No uses cuentas compartidas para administración; separa cuenta diaria y privilegiada. Aplica separación de funciones y acceso **just-in-time** cuando proceda.

### Autenticación, autorización y federación

- **Autenticación:** prueba identidad. **Autorización:** determina qué puede hacer. **Accounting:** registra actividad.
- MFA combina factores distintos: algo que sabes, tienes, eres, haces o dónde estás. Dos contraseñas no son MFA.
- Prefiere métodos resistentes al phishing cuando el riesgo lo requiera: passkeys/FIDO2 o llaves de seguridad; protege también recuperación de cuenta.
- **SSO:** una autenticación permite acceso a varias aplicaciones.
- **Federación:** organizaciones/dominios de identidad distintos confían en afirmaciones de identidad.
- **SAML:** intercambio de afirmaciones, común en SSO empresarial. **OAuth 2.0:** autorización delegada por tokens. **OpenID Connect:** capa de identidad sobre OAuth 2.0.
- Protege tokens/sesiones, limita duración/alcance y revócalos cuando cambie el riesgo.

### Modelos de acceso y PAM

| Modelo | Decisión basada en |
|---|---|
| **MAC** | Etiquetas/clasificaciones definidas centralmente. |
| **DAC** | Propietario del recurso concede permisos. |
| **RBAC** | Rol laboral. |
| **ABAC** | Atributos de usuario, recurso, acción y contexto. |

**PAM** protege accesos privilegiados con vault de credenciales, aprobación, sesiones registradas, elevación temporal y rotación. Es la respuesta cuando el escenario pide controlar cuentas de administrador o terceros con alto privilegio.

## 4.7 Automatización y orquestación

| Concepto | Alcance |
|---|---|
| **Automatización** | Ejecuta una tarea repetible: backup, parche, alta de ticket o rotación de secreto. |
| **Orquestación** | Coordina varias automatizaciones, condiciones, dependencias, errores y aprobaciones para un resultado completo. |
| **Runbook** | Instrucciones operativas detalladas para una tarea. |
| **Playbook** | Flujo de decisión/respuesta para un caso, a menudo ejecutable por SOAR. |

Automatiza procesos frecuentes, estables, bien definidos, reversibles y medibles. Primero estandariza el proceso manual: automatizar una regla incorrecta solo amplifica el fallo.

Casos útiles: aprovisionamiento/deprovisioning, inventario, backups y comprobación de restauración, enriquecimiento de alertas, tickets, evaluación de baseline, parcheado por anillos, rotación de claves/certificados y controles CI/CD/DevSecOps.

Controles: revisión de código y cambios, mínimo privilegio para cuentas de servicio, secretos en vault, pruebas no productivas, logging, límites, reintentos seguros, aprobaciones humanas para acciones de alto impacto, rollback, propietario y procedimiento manual alternativo. Vigila APIs, webhooks, colas y orquestadores como posibles SPOF.

## 4.8 Respuesta a incidentes y forense

### Ciclo de respuesta

| Fase | Objetivo |
|---|---|
| **Preparación** | Planes, roles, contactos, herramientas, logs, backups, formación y playbooks. |
| **Detección** | Identificar y registrar señales/alertas. |
| **Análisis** | Validar, clasificar severidad, alcance, activos, cuentas, datos y cronología. |
| **Contención** | Limitar propagación/daño: aislar host, bloquear indicador, revocar sesión o segmentar. |
| **Erradicación** | Eliminar causa: malware, persistencia, cuentas, vulnerabilidad o configuración insegura. |
| **Recuperación** | Restaurar y vigilar hasta retornar a operación normal. |
| **Post-incidente** | Lecciones aprendidas, AAR, métricas y mejoras de controles/procesos. |

La contención no es erradicación: aislar un endpoint corta el impacto, pero no elimina la causa. Conserva evidencia y sigue el plan antes de apagar o reiniciar un sistema potencialmente comprometido.

### Equipo, comunicaciones y caza

- Define responsables técnicos, dirección, legal, RR. HH., privacidad, comunicación y proveedores; comunica por canales aprobados y según obligación.
- **Threat hunting** es búsqueda proactiva basada en hipótesis, TTP, IoC y análisis de comportamiento; no espera solo alertas.
- El análisis de causa raíz busca cómo y por qué ocurrió para prevenir repetición, no solo quién cometió un error.

### Forense y evidencia

1. Identifica y protege el activo/evidencia.
2. Adquiere copias forenses y documenta método, fecha, persona y hashes.
3. Recoge según **orden de volatilidad**: memoria y conexiones activas antes que disco/archivos persistentes.
4. Analiza copias, no el original; correlaciona cronología, artefactos y logs.
5. Informa hechos, alcance, evidencias, limitaciones y conclusiones.

**Cadena de custodia** registra quién tuvo cada evidencia, cuándo, dónde, por qué y bajo qué condiciones. Los hashes demuestran integridad de la copia, no sustituyen la documentación. Una **legal hold** suspende borrado normal cuando hay obligación de preservar información; e-discovery busca, preserva y entrega información relevante legalmente.

## 4.9 Investigación mediante fuentes de datos

### Método para analizar un escenario

1. Identifica la fuente y los campos: hora, host, usuario, origen/destino, puerto, acción, severidad y resultado.
2. Normaliza la hora; relojes desincronizados crean cronologías falsas.
3. Compara con baseline y cambios aprobados.
4. Distingue intento bloqueado, detección, éxito confirmado y actividad benigna.
5. Correlaciona fuentes independientes.
6. Estima impacto y aplica contención proporcionada, preservando evidencia.

### Selección de la fuente correcta

| Pregunta | Fuente más útil |
|---|---|
| ¿Qué procesos, archivos o conexiones tuvo un equipo? | EDR/antivirus y logs de endpoint. |
| ¿Quién inició sesión, falló o elevó privilegios? | Logs de autenticación/SO/directorio. |
| ¿Qué IP habló con cuál, cuándo y cuánto transfirió? | NetFlow/sFlow/IPFIX; PCAP si se necesita detalle de paquete. |
| ¿Qué permitió o bloqueó la red? | Firewall, proxy y logs DNS. |
| ¿Qué petición HTTP atacó una aplicación? | WAF y logs de aplicación/web. |
| ¿Qué vulnerabilidades/configuraciones afectan un activo? | Escáner, CMDB/inventario y baseline. |
| ¿Hay tendencias o relación entre capas? | SIEM, dashboard e informes correlacionados. |
| ¿Qué contiene/describe un archivo o correo? | Metadatos y análisis del artefacto. |

**Patrones frecuentes:** muchos fallos de login seguidos de éxito pueden indicar password spraying/fuerza bruta; gran volumen saliente a destino inusual puede indicar exfiltración; consultas DNS anómalas y proceso desconocido refuerzan sospecha; ARP inconsistente puede indicar suplantación en LAN. Una sola señal no basta: correlaciona usuario, host, proceso, red y tiempo.

## Decisiones rápidas de examen

| Si pide… | Respuesta inicial |
|---|---|
| Configuración segura repetible de servidores | Baseline + hardening + gestión de cambios. |
| Controlar portátil o móvil corporativo perdido | MDM/UEM, cifrado y borrado remoto. |
| Conocer activos no gestionados | Inventario/CMDB correlacionado con descubrimiento y telemetría. |
| Reducir riesgo de un CVE | Validar, priorizar por contexto, parchear/mitigar y verificar. |
| Menos ruido y mejor investigación | Baselines, tuning y correlación SIEM. |
| Permitir acceso según cargo | RBAC y recertificación. |
| Privilegios de administrador temporales y auditables | PAM/JIT con sesión registrada. |
| Ejecutar respuesta repetible a una alerta | Playbook/SOAR con aprobación si es destructiva. |
| Frenar propagación de malware | Contener: aislar endpoint, preservar evidencia y analizar. |
| Probar integridad de evidencia | Hashes + cadena de custodia. |

## Errores frecuentes

- Tratar un hallazgo de escáner como explotación confirmada.
- Priorizar solo por CVSS e ignorar criticidad, exposición y explotación activa.
- Confundir IDS/alerta con bloqueo o contención.
- Borrar/reiniciar evidencia volátil antes de adquirirla.
- Confundir autenticación con autorización, o SSO con federación.
- Automatizar acciones destructivas sin límites, pruebas, registro ni aprobación.
- Considerar RAID, snapshots o replicación como sustitutos de backups probados.
- Creer que un dashboard reemplaza los logs y la correlación de evidencias.
