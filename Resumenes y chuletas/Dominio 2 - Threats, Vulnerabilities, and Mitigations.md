# Dominio 2 — Amenazas, vulnerabilidades y mitigaciones

> Chuleta de repaso para el examen. Identifica primero qué actor, vector, vulnerabilidad, indicador o control describe el escenario; después elige la respuesta más específica.

## 2.1 Actores de amenazas y motivaciones

Un actor se valora por su **motivación**, intención, recursos, acceso, capacidad y oportunidad. La misma técnica no identifica de forma fiable al actor: se necesita contexto.

| Motivación | Objetivo habitual |
|---|---|
| Beneficio económico | Fraude, robo, ransomware, extorsión, venta de accesos o datos |
| Exfiltración | Obtener PII, propiedad intelectual, secretos o credenciales |
| Espionaje | Obtener inteligencia comercial, estratégica, militar o política |
| Interrupción | Dañar disponibilidad o la continuidad operativa |
| Ideología / política | Protesta, propaganda, presión o notoriedad |
| Venganza | Perjudicar a organización o personas |
| Caos / desafío | Demostrar capacidad, divertir o causar perturbación |
| Guerra / geopolítica | Influir o debilitar a un rival estatal |
| Ética / prueba autorizada | Hallar y comunicar debilidades dentro de un alcance permitido |

| Actor | Rasgos más característicos |
|---|---|
| Script kiddie | Poca habilidad propia; usa herramientas o código existente; puede causar daño relevante |
| Hacktivista | Motivación ideológica o política; busca protesta, atención o interrupción |
| Delincuencia organizada | Recursos, división de tareas y finalidad económica sostenida |
| Patrocinado por Estado | Recursos altos, persistencia, espionaje o fines geopolíticos |
| Amenaza interna | Persona con acceso o conocimiento legítimo; puede ser maliciosa, negligente, coaccionada o accidental |

Una APT implica persistencia, capacidad y objetivos sostenidos; no demuestra automáticamente que sea estatal.

### Atributos que cambian el riesgo

- Interno: suele tener credenciales, acceso físico o conocimiento de procesos.
- Externo: necesita atravesar controles desde fuera, pero puede usar terceros, credenciales filtradas o ingeniería social.
- Recursos y financiación: determinan duración, infraestructura y capacidad de recuperación.
- Sofisticación: afecta sigilo, personalización, evasión y alcance, no necesariamente la peligrosidad.

### Shadow IT

TI en la sombra es el uso de software, nube, dispositivos o servicios no aprobados. Puede surgir por necesidades reales de productividad; se gestiona con alternativas aprobadas, inventario, evaluación de riesgo y procesos ágiles, no solo con sanciones.

Riesgos: datos fuera de control, falta de MFA/logs/backups, incumplimiento, cuentas huérfanas y exposición de integraciones.

## 2.2 Vectores y superficie de ataque

| Término | Definición |
|---|---|
| Superficie de ataque | Conjunto de puntos expuestos que podrían ser atacados: personas, interfaces, servicios, APIs, dispositivos, redes, proveedores y espacios físicos |
| Vector de amenaza | Camino o método concreto usado para llegar a un objetivo |

Reducir superficie: eliminar servicios y cuentas innecesarias, cerrar puertos, deshabilitar funciones no usadas, aplicar mínimo privilegio, segmentar y controlar terceros.

### Vectores de ingeniería social

| Técnica | Señal o definición |
|---|---|
| Phishing | Mensaje engañoso que busca credenciales, datos, pago o ejecución de una acción |
| Spear phishing | Phishing dirigido y personalizado |
| Whaling | Phishing dirigido a altos cargos o objetivos de alto valor |
| Smishing | Phishing por SMS/mensajería |
| Vishing | Phishing mediante llamada de voz |
| BEC | Compromiso/suplantación de correo empresarial; frecuente en pagos, facturas o cambios bancarios |
| Pretexting | Escenario fabricado para obtener información o acciones |
| Suplantación | Fingir ser persona, entidad, soporte o proveedor fiable |
| Suplantación de marca | Imitar marca, web, correo o identidad corporativa |
| Typosquatting | Dominio visualmente parecido con error o carácter sustituido |
| Watering hole | Comprometer un sitio que la víctima o grupo objetivo visita habitualmente |
| Baiting | Cebo, como dispositivo, archivo, enlace u oferta, que explota curiosidad o utilidad |

Disparadores humanos frecuentes: autoridad, urgencia, miedo, escasez, afinidad y prueba social. La respuesta defensiva es pausar, verificar por un canal independiente y reportar.

### Fraude e influencia

- Misinformación: información falsa difundida sin intención demostrada de engañar.
- Desinformación: información falsa difundida deliberadamente para manipular.
- Fraude/estafa: engaño para obtener dinero, datos o beneficio.

### Vectores físicos y de proximidad

| Vector | Respuesta/idea |
|---|---|
| Tailgating | Intruso sigue a autorizado sin que este lo advierta |
| Piggybacking | Autorizado permite entrar a no autorizado con conocimiento o consentimiento |
| Shoulder surfing | Observación de pantallas, teclado o documentos |
| Eavesdropping | Escucha de conversaciones o comunicaciones |
| Dumpster diving | Obtención de información en residuos |
| Medio extraíble o cable desconocido | No conectarlo; entregarlo según procedimiento |
| Red no segura | Riesgo de intercepción, AP malicioso o acceso no confiable |

### Terceros y cadena de suministro

Un proveedor, MSP, dependencia, actualización, hardware o firmware forma parte de la superficie de ataque. Una actualización aparentemente legítima que distribuye contenido alterado indica riesgo de **cadena de suministro**.

Evaluar: procedencia, firma/autenticidad, prácticas de seguridad, acceso a datos, subproveedores, soporte, monitorización y cláusulas contractuales.

## 2.3 Vulnerabilidades: mapa rápido

### Criptografía y ciclo de vida

| Escenario | Vulnerabilidad |
|---|---|
| Se fuerza protocolo, versión o conjunto criptográfico antiguo | Ataque de degradación / downgrade |
| Dos entradas distintas producen el mismo hash | Colisión; ataque de cumpleaños busca explotar probabilidad de colisiones |
| Datos cifrados hoy se almacenan para descifrarse con capacidad futura | Riesgo cuántico; preparar transición poscuántica |
| Firmware modificado, sin actualizar o no verificado | Vulnerabilidad de firmware |
| Activo sin soporte, EOL o sin parches | Riesgo de legado/sin soporte |
| Credenciales de fábrica, permisos abiertos, puertos innecesarios | Configuración errónea |

### Cadena de suministro, virtualización y móviles

| Riesgo | Descripción breve |
|---|---|
| Componente/hardware falsificado o manipulado | Puede introducir fallo, backdoor o firmware no fiable |
| Dependencia o actualización comprometida | Código malicioso llega mediante proveedor legítimo |
| VM escape | Una VM comprometida alcanza hipervisor u otra VM |
| Compromiso del hipervisor | Puede afectar a todos los invitados del host |
| Migración en vivo insegura | Datos de una VM se trasladan expuestos entre hosts |
| Datos remanentes | Un recurso reutilizado conserva datos del inquilino anterior |
| VM/container sprawl | Instancias sin propietario, inventario, parcheado o configuración coherente |
| Bluetooth/móvil | Emparejamiento débil, exposición inalámbrica, apps no aprobadas, pérdida de dispositivo o permisos excesivos |

Contenedor: comparte el núcleo del host; VM: incluye sistema invitado y se aísla mediante hipervisor. Ambos requieren parcheado, mínimo privilegio y configuración segura.

### Aplicaciones web, memoria y concurrencia

| Vulnerabilidad | Pista de escenario |
|---|---|
| SQL injection | Entrada de usuario altera una consulta a base de datos |
| XML injection / XXE | XML manipulado, entidades externas o agotamiento por entidades |
| XSS | Script no confiable se ejecuta en navegador de víctima desde sitio confiado |
| CSRF/XSRF | Usuario ya autenticado realiza sin saberlo una acción en sitio legítimo |
| Gestión de sesión deficiente | Token predecible, robado, modificado o reutilizado |
| Buffer overflow | Escritura fuera del límite de memoria reservado |
| Race condition / TOCTOU | Recurso cambia entre comprobarlo y usarlo |

XSS almacenado: contenido malicioso queda guardado y afecta a visitantes posteriores.  
XSS reflejado: la carga vuelve en la respuesta inmediata.  
CSRF no necesita robar la sesión: abusa de que el navegador de la víctima ya envía credenciales válidas.

### Otras vulnerabilidades de endpoint

- Zero-day: se explota antes de que exista parche del proveedor.
- Sideloading: instalación de app desde fuente no autorizada.
- Exfiltración: extracción no autorizada de datos.
- Actualización maliciosa: instalación que parece legítima pero contiene cambio hostil.
- Escalada de privilegios: cuenta/proceso obtiene permisos superiores a los autorizados.

## 2.4 Indicadores de actividad maliciosa

Un IoC es una señal que requiere validación y correlación; rara vez prueba aislada de compromiso.

### Malware: reconocer el comportamiento

| Tipo | Comportamiento distintivo |
|---|---|
| Virus | Se adjunta a archivo/host y suele requerir ejecución o interacción para propagarse |
| Gusano | Se propaga autónomamente, a menudo por red |
| Troyano | Parece legítimo, pero ejecuta función oculta maliciosa |
| RAT | Troyano con control remoto, inventario, pantalla, archivos o cámara/micrófono |
| Ransomware | Cifra o bloquea datos; puede exfiltrar antes y extorsionar con publicación |
| Botnet | Conjunto de equipos comprometidos controlados; cada equipo es un zombie |
| C2 / beaconing | Comunicación periódica del equipo comprometido con infraestructura de mando |
| Criptominería | Uso anómalo de CPU/GPU/energía/red para minado |
| Rootkit | Oculta procesos, archivos o conexiones, a veces a nivel kernel |
| Backdoor | Vía de acceso que evita los mecanismos normales |
| Bomba lógica | Código que se activa por fecha, evento, umbral o condición |
| Spyware / keylogger | Recopila datos o pulsaciones |
| Bloatware | Software preinstalado/no necesario; no es automáticamente malware |
| Fileless / living off the land | Abusa de memoria, scripts o herramientas legítimas, dejando pocos archivos |

### Credenciales y sesiones

| Patrón | Ataque más probable |
|---|---|
| Muchas contraseñas contra una cuenta | Fuerza bruta |
| Palabras frecuentes contra una cuenta | Diccionario |
| Diccionario + variaciones, números o símbolos | Híbrido |
| Pocas contraseñas comunes contra muchas cuentas | Password spraying |
| Pares usuario-contraseña de filtraciones probados en otro servicio | Credential stuffing |
| Mensaje/token válido capturado y repetido | Replay |
| Token/cookie de sesión robado o abusado | Session hijacking |
| Identificadores de sesión previsibles | Session prediction |
| Cookie modificada y aceptada indebidamente | Cookie poisoning |

| IoC | Validar antes de concluir |
|---|---|
| Impossible travel | VPN, proxy, geolocalización IP, viajes, dispositivo y MFA |
| Sesiones concurrentes | Puede ser móvil + portátil legítimos; revisar IP, app, horas y acciones |
| Bloqueos de cuenta | Usuario olvidó clave o servicio con credenciales antiguas; revisar origen y patrón |

### Red, DNS y disponibilidad

| Señal | Qué puede indicar |
|---|---|
| Muchas conexiones TCP a medio abrir | SYN flood |
| Tráfico masivo desde múltiples orígenes | DDoS |
| Respuestas DNS grandes no solicitadas | Reflexión/amplificación DNS |
| Consultas DNS con subdominios largos, aleatorios o alta entropía | DNS tunneling o C2/exfiltración |
| Resolución inesperada de dominio / cambios no autorizados | DNS spoofing, cache poisoning o hijacking |
| Cambios de ARP/DNS, certificado inesperado o AP no aprobado | Posible ataque on-path |
| Sitio pierde HTTPS o negocia protección antigua | SSL stripping, degradación o mala configuración |

DNSSEC ayuda a autenticar e integrar respuestas DNS, pero no sustituye la detección de tunneling o comportamiento anómalo.

### Telemetría que se debe correlacionar

- EDR: procesos, memoria, persistencia, árbol padre-hijo.
- Logs de identidad: MFA, IP, dispositivo, privilegios y hora.
- Red/DNS/proxy: destinos, volumen, dominios, periodicidad y cifrado.
- Correo: remitente, adjuntos, URLs, reglas y patrones de destinatarios.
- Física: cámaras, accesos por tarjeta, alarmas y presencia.

## 2.5 Técnicas de mitigación

### Hardening y funcionalidad mínima

Hardening reduce superficie de ataque mediante configuración segura, mínimo privilegio, denegación por defecto y mantenimiento continuo.

| Riesgo | Mitigación principal | Propósito |
|---|---|---|
| Credenciales de fabricante | Cambiarlas antes de producción | Evitar acceso con secretos conocidos |
| Servicio, puerto o función no requerida | Deshabilitar/cerrar | Eliminar un punto de entrada innecesario |
| Administración expuesta | Restringir origen, cuentas y MFA | Limitar acceso de alto privilegio |
| Software no aprobado | Allowlisting | Permitir solo ejecución autorizada |
| Software conocido no permitido | Blocklisting | Bloquear elementos identificados como no aceptables |
| Configuraciones distintas entre equipos | Línea base y gestión de configuración | Evitar deriva y mantener estado aprobado |

Allowlisting es más fuerte frente a software desconocido: por defecto bloquea lo que no está aprobado. Blocklisting es útil, pero elementos nuevos pueden no estar listados.

### Parches, firmware y legado

Ciclo de parches: inventariar → identificar → priorizar por exposición/impacto/explotación → probar → aprobar/programar → desplegar por anillos → verificar → documentar.

- Despliegue por anillos: laboratorio → piloto → escalonado → completo; limita impacto de incompatibilidades.
- Firmware también requiere inventario, autenticidad, prueba, ventana y plan de recuperación.
- Zero-day sin parche: reducir exposición, segmentar/aislar, endurecer, filtrar, monitorizar y aplicar controles compensatorios.
- Sistema sin soporte: retirar si es posible; si no, aislar, segmentar, restringir accesos, vigilar y planificar sustitución.

### Segmentación, movilidad y control de acceso

| Situación | Mitigación |
|---|---|
| Red plana y movimiento lateral | Segmentación o microsegmentación |
| Activo vulnerable que debe seguir operativo | Aislamiento y controles compensatorios |
| Bluetooth no necesario | Desactivar |
| Emparejamiento Bluetooth | Activar visibilidad solo cuando sea necesario y autenticar |
| Dispositivos móviles diversos | MDM/UEM para políticas, inventario, parcheado, cifrado, borrado remoto y cumplimiento |
| Acceso excesivo a procesos/sistema | Mínimo privilegio, DAC/MAC y confinamiento |

DAC: el propietario del recurso suele definir permisos.  
MAC: política central impone etiquetas/reglas; SELinux y AppArmor son ejemplos de control obligatorio y confinamiento.

### Cifrado y configuración

| Necesidad | Mitigación |
|---|---|
| Portátil o medio perdido con datos almacenados | Cifrado de datos en reposo / disco completo |
| Solo una columna o campo muy sensible de BD | Cifrado a nivel de columna/campo |
| Grandes volúmenes con distintos requisitos | Elegir nivel adecuado: disco, volumen, archivo, BD o campo |
| Cambios no autorizados de configuración | Línea base, gestión centralizada, control de versiones y detección de deriva |

Una línea base segura define versión, servicios, puertos, firewall, cifrado, logs, permisos y ajustes aprobados. La detección de deriva identifica cuándo el estado real se aleja de ella.

## Selección rápida en escenarios

| Si el escenario destaca... | Respuesta que suele encajar |
|---|---|
| Protesta política y visibilidad | Hacktivista |
| Espionaje prolongado y recursos altos | Actor estatal / APT, según evidencia |
| Ganancia mediante fraude/ransomware | Delincuencia organizada |
| Servicio cloud no aprobado por TI | Shadow IT |
| Sitio frecuentado por objetivo comprometido | Watering hole |
| Dominio con letra cambiada | Typosquatting |
| Pago urgente solicitado por supuesto directivo | BEC + verificación fuera de banda |
| Software legítimo actualizado con código alterado | Cadena de suministro |
| Datos antiguos visibles al reasignar recurso cloud | Datos remanentes |
| Consulta de BD alterada desde formulario | SQL injection |
| Acción involuntaria con sesión válida | CSRF |
| Muchos orígenes saturan servicio | DDoS |
| Comunicación saliente periódica rara | C2 / beaconing |
| Archivos inaccesibles y nota de rescate | Ransomware |
| Herramientas legítimas en uso anómalo sin archivo nuevo | Fileless / living off the land |
| Activo sin parche ni soporte | Aislar/segmentar y planificar retirada |
| Solo software aprobado debe ejecutarse | Allowlisting |
| Equipos se alejan de configuración aprobada | Gestión de configuración / deriva |

## Errores frecuentes

- Confundir superficie de ataque con vector: superficie = todos los puntos expuestos; vector = camino concreto.
- Suponer que un IoC aislado confirma compromiso.
- Llamar virus a un gusano: el gusano se propaga sin requerir archivo huésped o acción equivalente.
- Confundir CSRF con robo de sesión.
- Considerar bloatware como sinónimo de spyware o malware.
- Tratar todos los sistemas heredados como irremediables: primero evaluar retirada, parche, aislamiento y controles compensatorios.
- Aplicar parches críticos sin validar impacto, reversión ni evidencia de instalación.
- Creer que segmentar sustituye definitivamente a corregir o retirar un activo vulnerable.
- Usar blocklisting cuando el escenario exige impedir por defecto software desconocido: la mejor respuesta es allowlisting.

## Repaso final

- Relaciona actor con motivación, recursos, acceso y persistencia, no con una sola técnica.
- Los humanos, terceros, dispositivos, interfaces y espacios físicos forman parte de la superficie de ataque.
- Identifica vulnerabilidad por su efecto: inyección, sesión, memoria, concurrencia, firmware, cadena de suministro o virtualización.
- Correlaciona IoC entre endpoint, identidad, red, DNS, correo y seguridad física.
- Hardening, parcheado, allowlisting, segmentación, MDM/UEM, MAC, cifrado y líneas base reducen riesgo desde ángulos diferentes.
