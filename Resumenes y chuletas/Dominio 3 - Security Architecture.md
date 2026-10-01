# Dominio 3 — Arquitectura de seguridad

Chuleta de repaso para preguntas de escenario. Idea central: diseña la arquitectura para reducir la superficie de ataque, separar lo que no debe confiar entre sí, proteger el dato durante todo su ciclo y mantener el servicio ante fallos.

## 3.1 Modelos de arquitectura

### Nube, local e híbrida

| Modelo | Idea / ventaja | Riesgo o foco de examen |
|---|---|---|
| **On-premises** | La organización controla infraestructura y datos en sus instalaciones. | Asume parches, capacidad, continuidad y seguridad física. |
| **Cloud** | Recursos bajo demanda del proveedor; elasticidad y pago por uso. | Responsabilidad compartida, IAM, configuración y dependencia del proveedor. |
| **Híbrido** | Integra local y nube. | Protege las interconexiones, identidades y datos en ambos entornos. |
| **Multicloud** | Usa más de un proveedor cloud. | Reduce dependencia, pero eleva complejidad, visibilidad y consistencia de controles. |

**Responsabilidad compartida:** el proveedor protege la infraestructura **de** la nube; el cliente protege lo que configura y deposita **en** ella.

| Servicio | Proveedor | Cliente |
|---|---|---|
| **IaaS** | Centro de datos, hardware, red física e hipervisor. | SO invitado, parches, aplicaciones, datos, identidades y configuración de red virtual. |
| **PaaS** | También SO, runtime y plataforma. | Código, datos, identidades y configuración del servicio. |
| **SaaS** | Aplicación y capas inferiores. | Usuarios, MFA, roles, datos y configuración segura del tenant. |

**Pistas:** cuanto más se parece a SaaS, menos administras infraestructura; nunca desaparecen la responsabilidad sobre identidad, permisos y datos. Considera SLA, portabilidad, residencia de datos, coste de salida y **vendor lock-in**.

### Virtualización, contenedores y serverless

| Tecnología | Qué aísla | Riesgos / controles clave |
|---|---|---|
| **VM** | Cada máquina virtual incluye su propio SO sobre un hipervisor. | Endurecer/parchear hipervisor y huéspedes; limitar administración, vigilar VM sprawl, borrar datos de almacenamiento reutilizado y proteger migraciones. |
| **Hipervisor tipo 1** | Se ejecuta directamente sobre hardware. | Menor capa intermedia; típico de centros de datos. |
| **Hipervisor tipo 2** | Se ejecuta sobre un SO host. | Más práctico para escritorio/lab; añade dependencia del host. |
| **Contenedor** | Procesos y dependencias; comparten kernel del host. | Imágenes confiables y escaneadas, mínimo privilegio, secretos fuera de la imagen, segmentación y protección del runtime/kernel. |
| **Serverless / FaaS** | El proveedor opera servidores y escalado; se ejecuta código por eventos. | Roles mínimos por función, secretos gestionados, validación de eventos, logs, límites/cuotas y control de costes. |

**VM escape**: una vulnerabilidad permite pasar de una VM al host/otras VM; es especialmente grave en multitenencia.  
**Sprawl**: recursos creados sin inventario, propietario, parches ni controles; automatiza inventario y retirada.

### Arquitecturas de aplicación

| Modelo | Característica | Seguridad |
|---|---|---|
| **Monolito** | Aplicación unificada. | Menos componentes, pero un fallo puede afectar a todo el servicio. |
| **Microservicios** | Servicios pequeños, independientes y comunicados por API. | Autenticación/autorización entre servicios, API gateway, mTLS cuando aplique, gestión de secretos, observabilidad y segmentación. |
| **Centralizada** | Procesamiento o control concentrado. | Facilita gobierno, pero puede crear un punto único de fallo. |
| **Descentralizada/distribuida** | Funciones repartidas. | Mejora resiliencia, pero exige coherencia de identidad, registro y configuración. |

### Separación y segmentación

- **Aislamiento físico / air gap:** separación física de redes o sistemas. Máxima separación, pero menos flexibilidad y mayor coste.
- **Segmentación lógica:** VLAN, subredes, ACL, firewalls y microsegmentación. Limita el movimiento lateral.
- **DMZ:** red intermedia para servicios expuestos (web, correo, DNS público); no sitúa sistemas internos sensibles directamente en Internet.
- **Zona de confianza:** el acceso se concede explícitamente; no se presupone confianza por ubicación.
- **Mínimo privilegio de red:** abre solo el flujo, puerto, protocolo y origen/destino indispensables.

### SDN, IaC y automatización

**SDN (Software-Defined Networking)** separa:

- **Plano de datos:** reenvía tráfico.
- **Plano de control:** decide rutas y políticas.
- **Plano de aplicación/gestión:** expresa la intención y automatiza.

El controlador SDN es un objetivo crítico: aplica MFA, segmentación, control de acceso, parches, backups y registro.

**Infrastructure as Code (IaC):** infraestructura declarada en archivos versionados en lugar de cambios manuales. Beneficios: repetibilidad, revisión por pares, trazabilidad, pruebas y despliegues consistentes. Riesgos: un error se replica rápidamente; escanea configuraciones, secretos y permisos antes de desplegar, usa repositorios protegidos y aplica mínimo privilegio a las credenciales de automatización.

### IoT, OT e infraestructura especializada

- **IoT/embedded:** dispositivos con recursos limitados, firmware y ciclo de parcheo irregular. Inventaría, cambia credenciales por defecto, segmenta, actualiza firmware autorizado y deshabilita servicios innecesarios.
- **OT/ICS/SCADA:** priorizan disponibilidad y, sobre todo, seguridad física/proceso. Aísla redes industriales de IT, controla estrictamente el acceso remoto, usa bastiones, registra cambios y coordina parches con operaciones.
- **RTOS:** sistema operativo en tiempo real; la disponibilidad y el tiempo de respuesta son requisitos funcionales. No apliques cambios sin validar impacto operacional.

## 3.2 Infraestructura empresarial segura

### Firewalls, proxies y acceso a aplicaciones

| Control | Función | Distingue en examen |
|---|---|---|
| **Firewall stateless** | Filtra paquetes por reglas (IP, puerto, protocolo). | No conserva contexto de sesión. |
| **Firewall stateful** | Mantiene estado de conexiones. | Permite respuestas de sesiones válidas sin reglas independientes. |
| **NGFW** | Añade inspección de aplicación, identidad, IPS y/o inteligencia de amenazas. | Mayor visibilidad que filtrado clásico. |
| **Firewall host-based** | Protege un equipo concreto. | Útil contra movimiento lateral y para políticas por endpoint. |
| **Firewall de red** | Protege segmentos o perímetros. | Controla tráfico entre zonas. |
| **Proxy forward** | Intermedia tráfico saliente de usuarios. | Oculta/controla clientes; filtra y registra navegación. |
| **Reverse proxy** | Intermedia tráfico hacia servidores publicados. | Oculta/protege orígenes; puede terminar TLS y balancear. |
| **WAF** | Protege aplicaciones web y HTTP/S. | Mitiga ataques contra la aplicación, no sustituye un firewall general ni código seguro. |

**Ubicación importa:** un control en línea (**inline**) puede bloquear; uno fuera de banda (**out-of-band**) observa o recibe copia de tráfico.  
**Fail-open** prioriza disponibilidad si falla el control; **fail-closed** prioriza seguridad y bloquea ante el fallo.

### Detección, prevención y visibilidad

| Control | Propósito |
|---|---|
| **IDS** | Detecta y alerta sobre actividad sospechosa; normalmente no bloquea. |
| **IPS** | Está en línea y puede bloquear/prevenir tráfico malicioso. |
| **NIDS/NIPS** | Observa o controla tráfico de red. |
| **HIDS/HIPS/EDR** | Observa o protege un host: procesos, ficheros, registro y comportamiento. |
| **TAP** | Copia física pasiva de tráfico para monitorización; no altera el flujo. |
| **SPAN/port mirroring** | Copia tráfico desde un switch a un puerto de análisis. |

Métodos de detección: **firmas** (conocido, menos falsos positivos), **anomalías** (desviación de baseline) y **comportamiento** (contexto/técnicas). Ajusta umbrales para reducir falsos positivos sin crear puntos ciegos.

### Servicios y appliances de red

| Componente | Uso seguro |
|---|---|
| **Load balancer / ADC** | Distribuye carga y mejora disponibilidad; vigila health checks, TLS, persistencia y configuración. |
| **Jump server / bastion host** | Punto controlado para administración de sistemas sensibles; MFA, acceso temporal, registro y endurecimiento. |
| **NAC** | Decide si un dispositivo puede conectarse según identidad, postura o política. |
| **Port security** | Limita MAC/puertos de switch; útil, pero no sustituye autenticación sólida. |
| **802.1X** | Control de acceso por puerto basado en autenticación, normalmente con EAP/RADIUS. |

### Comunicaciones seguras

- **TLS/HTTPS:** protege datos de aplicación en tránsito; valida certificados y versiones/cifrados permitidos.
- **IPsec:** protege tráfico a nivel de red; común en VPN site-to-site o acceso remoto.
- **VPN:** crea un túnel seguro sobre una red no confiable.
  - **Full tunnel:** todo el tráfico remoto pasa por la organización; más visibilidad/control, más consumo.
  - **Split tunnel:** solo tráfico corporativo pasa por VPN; mejor rendimiento, mayor exposición/menos inspección del tráfico restante.
- **SD-WAN:** optimiza y gestiona enlaces WAN por software.
- **SASE:** entrega funciones de red y seguridad desde cloud (p. ej., acceso seguro, inspección y políticas) cerca del usuario.

**Pregunta típica:** acceso administrativo remoto a OT o servidores críticos → VPN + MFA + bastion/jump server + segmentación + registro; nunca acceso directo y amplio desde Internet.

### Diseño defensivo de red

1. Inventaría activos, flujos y dependencias.
2. Define zonas (usuarios, servidores, administración, invitados, OT, DMZ).
3. Aplica denegación por defecto y abre flujos mínimos con ACL/firewall.
4. Separa el plano de administración del tráfico de usuarios.
5. Centraliza logs y sincroniza tiempo.
6. Prueba alta disponibilidad y el comportamiento fail-open/fail-closed.

## 3.3 Protección de datos

### Clasificación y ciclo de vida

La clasificación determina controles de acceso, cifrado, retención, compartición y destrucción. Los nombres varían, pero una escala habitual es:

| Nivel | Ejemplo de tratamiento |
|---|---|
| **Público** | Puede divulgarse. |
| **Interno** | Uso organizativo; no difusión externa no autorizada. |
| **Privado/confidencial** | Acceso restringido; controles reforzados. |
| **Crítico/restringido** | Máximo impacto; mínima exposición, controles y supervisión más estrictos. |

Gestiona el dato desde creación/recogida hasta uso, compartición, archivo, retención y destrucción verificable. Conserva solo lo necesario; no retener datos reduce exposición y obligaciones.

### Roles sobre el dato

| Rol | Responsabilidad |
|---|---|
| **Data owner** | Clasifica, determina uso permitido, requisitos y quién debe acceder. |
| **Data custodian** | Implementa controles técnicos: almacenamiento, backups, permisos, recuperación. |
| **Data steward** | Calidad, definición, metadatos y gobierno cotidiano del dato. |
| **Data controller** | Decide finalidad y medios del tratamiento de datos personales. |
| **Data processor** | Trata datos por cuenta e instrucciones del controller. |
| **Usuario** | Usa los datos únicamente dentro de la autorización recibida. |

### Datos y estados

- **En reposo:** discos, bases de datos, backups, archivos y snapshots.
- **En tránsito:** redes internas, Internet, APIs, correo y enlaces entre sedes.
- **En uso:** memoria, procesamiento y pantallas.

La protección debe adecuarse al estado: cifrado de disco/volumen para pérdida de dispositivo; cifrado de archivo/campo/columna cuando se precisa separar datos dentro de un mismo repositorio; TLS/IPsec para tránsito; permisos, aislamiento y controles de endpoint para uso.

Datos especialmente sensibles: PII, PHI, datos financieros, credenciales, secretos comerciales, propiedad intelectual, información legal/regulada y datos de autenticación.

### Geografía y cumplimiento

| Concepto | Significado |
|---|---|
| **Residencia de datos** | Lugar físico/lógico donde se almacenan. |
| **Soberanía de datos** | Leyes y jurisdicción que aplican a los datos. |
| **Localización de datos** | Requisito de mantener/procesar datos en una ubicación concreta. |

Evalúa no solo producción: backups, réplicas, logs, soporte, analítica y recuperación ante desastres también pueden mover o procesar datos.

### Controles de protección

| Control | Protege principalmente | Recuerda |
|---|---|---|
| **Cifrado** | Confidencialidad; recuperable con clave correcta. | Gestiona claves, rotación, custodia y recuperación. |
| **Hash** | Integridad. | Es unidireccional; no cifra ni permite recuperar el original. |
| **Tokenización** | Reduce exposición sustituyendo el valor por un token. | El mapeo se protege por separado; útil para datos regulados. |
| **Enmascaramiento** | Oculta parte de un valor mostrado. | Ej.: solo últimos dígitos; no siempre protege el dato fuente. |
| **Ofuscación** | Hace el contenido menos legible. | No equivale necesariamente a criptografía. |
| **DLP** | Detecta y puede bloquear/exigir control sobre datos sensibles. | Puede actuar en endpoint, red, correo, cloud o almacenamiento. |

**DLP** se apoya en reglas de contenido, etiquetas, expresiones, huellas/EDM y contexto. Las acciones incluyen alertar, bloquear, poner en cuarentena, cifrar o justificar. Ajusta reglas para no bloquear trabajo legítimo.

### Acceso y compartición

- Usa RBAC/ABAC y mínimo privilegio; revisa permisos periódicamente.
- Segmenta datos y aplicaciones para limitar el radio de impacto.
- Protege claves y secretos fuera del código; restringe quién puede descifrar.
- Clasifica y etiqueta antes de compartir; evita enlaces públicos por defecto.
- Establece retención y borrado seguro también para copias y medios retirados.

## 3.4 Resiliencia y recuperación

### Conceptos que no se deben confundir

| Término | Significado |
|---|---|
| **Resiliencia** | Capacidad de seguir operando o recuperarse de una interrupción. |
| **Alta disponibilidad (HA)** | Diseña para minimizar indisponibilidad mediante redundancia/conmutación. |
| **Tolerancia a fallos** | Continúa sin interrupción perceptible ante un fallo concreto; suele costar más que HA. |
| **Redundancia** | Duplicar componentes, rutas, energía, datos o ubicaciones. |
| **SPOF** | Punto único de fallo: un componente cuya caída interrumpe el servicio. |
| **Diverse redundancy** | Redundancia que no comparte fabricante, ruta, ubicación o dependencia crítica. |

Dos servidores en la misma sala, con el mismo proveedor eléctrico o la misma credencial administrativa, pueden seguir compartiendo un punto de fallo.

### Métricas de continuidad

| Métrica | Pregunta que responde |
|---|---|
| **RTO** (Recovery Time Objective) | ¿Cuánto tiempo puede estar caído el servicio? |
| **RPO** (Recovery Point Objective) | ¿Cuánta pérdida de datos, medida en tiempo, se admite? |
| **MTTR** | Tiempo medio para reparar/recuperar. |
| **MTBF** | Tiempo medio entre fallos; mayor suele indicar mayor fiabilidad. |

**Atajo:** RTO habla de *tiempo para volver*; RPO de *datos que se pueden perder*. Si el RPO es una hora, necesitas copias/replicación que permitan perder como máximo una hora de cambios.

### Redundancia y almacenamiento

- **Balanceo de carga:** distribuye solicitudes y puede retirar nodos no saludables; no sustituye backups.
- **Clustering/failover:** nodos coordinados asumen servicio si uno falla.
- **RAID 0:** rendimiento, sin tolerancia.
- **RAID 1:** espejo; tolera fallo de una copia.
- **RAID 5:** paridad distribuida; tolera un disco.
- **RAID 6:** doble paridad; tolera dos discos.
- **RAID 10:** espejos distribuidos; rendimiento y tolerancia, con más discos.

**RAID no es backup:** no protege de borrado, corrupción, ransomware, error humano o desastre del sitio.

### Backups, snapshots y replicación

| Mecanismo | Uso / limitación |
|---|---|
| **Backup completo** | Copia total; recuperación simple, más tiempo/espacio. |
| **Incremental** | Cambios desde el último backup de cualquier tipo; rápido de crear, recuperación puede requerir varias copias. |
| **Diferencial** | Cambios desde el último completo; crece con el tiempo, recuperación más simple que incremental. |
| **Snapshot** | Estado puntual, normalmente dependiente del almacenamiento/plataforma; no asumir que es independiente ni inmutable. |
| **Replicación** | Copia datos a otro sistema/sitio, a menudo con baja latencia; puede replicar corrupción, borrado o ransomware. |
| **Journaling** | Registra cambios para volver a un punto temporal; complementa, no reemplaza una estrategia de backup. |

Principio **3-2-1**: al menos tres copias, en dos tipos de medio, con una copia fuera de sitio. Para amenazas modernas, añade copia inmutable/offline y prueba restauraciones reales.

### Sitios alternativos

| Sitio | Preparación | Recuperación |
|---|---|---|
| **Hot site** | Equipamiento, sistemas y datos listos o casi listos. | Más rápida; más costosa. |
| **Warm site** | Infraestructura disponible, pero requiere cargar/configurar sistemas o datos. | Intermedia. |
| **Cold site** | Espacio e instalaciones básicas, sin sistemas operativos listos. | Más lenta; más barata. |

Elige el sitio según RTO/RPO, criticidad, presupuesto, requisitos regulatorios y riesgos geográficos. La dispersión geográfica solo ayuda si evita amenazas comunes (misma región, inundación, proveedor, red o dependencia).

### Continuidad operativa

- **BIA (Business Impact Analysis):** identifica procesos críticos, dependencias, impacto y prioridades de recuperación.
- **BCP (Business Continuity Plan):** mantiene procesos esenciales durante la interrupción.
- **DRP (Disaster Recovery Plan):** recupera sistemas, datos e infraestructura TI tras un desastre.
- **IRP (Incident Response Plan):** responde, contiene, erradica y aprende de incidentes.

No basta con redactarlos: asigna propietarios, contactos, orden de recuperación, comunicaciones, proveedores, requisitos de acceso y procedimientos alternativos.

### Energía, entorno y capacidad

| Situación / control | Asociación |
|---|---|
| **UPS** | Energía temporal y protección ante cortes breves; permite apagado ordenado o arranque de generador. |
| **Generador** | Suministro prolongado tras un corte, sujeto a combustible y pruebas. |
| **PDU** | Distribuye energía en rack; puede ofrecer medición/control. |
| **Supresor de sobretensión** | Protege frente a picos transitorios. |
| **Acondicionador de línea** | Estabiliza/filtra calidad eléctrica (variaciones, ruido). |
| **Capacidad y rendimiento** | Planifica crecimiento, picos, ancho de banda, CPU, memoria, almacenamiento y licencias. |

### Pruebas y mejora continua

| Prueba | Qué valida |
|---|---|
| **Tabletop** | Discusión guiada de roles y decisiones; bajo riesgo. |
| **Walkthrough** | Revisión paso a paso de procedimientos. |
| **Simulación** | Escenario realista sin interrumpir completamente producción. |
| **Parallel** | Se ejecuta recuperación en paralelo con producción. |
| **Full interruption** | Se interrumpe producción para comprobar recuperación completa; máximo realismo/riesgo. |

Prueba restauración de datos, failover, accesos, comunicaciones, dependencias y tiempos reales. Documenta fallos, actualiza planes y repite: un backup o DRP sin prueba es una suposición, no una garantía.

## Decisiones rápidas de examen

| Si el escenario pide… | Piensa primero en… |
|---|---|
| Exponer un sitio web sin abrir la red interna | DMZ + reverse proxy/WAF + segmentación. |
| Acceso remoto seguro de personal | VPN/ZTNA, MFA, mínimo privilegio y registro. |
| Evitar que un dispositivo no autorizado conecte a la LAN | NAC / 802.1X. |
| Detectar, pero no bloquear, tráfico sospechoso | IDS. |
| Bloquear tráfico sospechoso en tránsito | IPS inline. |
| Proteger una aplicación web de ataques HTTP | WAF. |
| Reducir impacto de pérdida de portátil | Cifrado de disco + MDM/remote wipe + MFA. |
| Evitar fuga de PII por correo/cloud/USB | Clasificación + DLP + permisos/cifrado. |
| Mantener servicio si cae un servidor | HA, cluster o balanceador con nodos redundantes. |
| Recuperar tras caída regional | DR en sitio alternativo con RTO/RPO adecuados y copias fuera de sitio. |
| Garantizar continuidad ante borrado/ransomware | Backups probados, aislados/inmutables; no solo RAID o replicación. |

## Errores frecuentes

- Confundir **alta disponibilidad** con **backup** o **tolerancia a fallos**.
- Tratar la nube como si el proveedor fuese responsable de todos los permisos, datos y configuraciones.
- Suponer que VLAN por sí sola impide todo movimiento lateral: aplica ACL/firewall y control de identidades.
- Usar una copia de datos en la misma ubicación como recuperación ante desastres.
- Replicar datos sin protección contra propagación de corrupción/ransomware.
- Cifrar sin plan de gestión, custodia y recuperación de claves.
- Instalar controles de detección fuera de banda y esperar bloqueo.
- Aplicar una política única a IT y OT sin valorar disponibilidad, seguridad física y restricciones operativas.
