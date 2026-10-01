# Dominio 1 — Conceptos generales de seguridad

> Chuleta de repaso para el examen. Úsala después de estudiar el temario: prioriza distinguir conceptos que se confunden en preguntas de escenario.

## 1.1 Controles de seguridad

Un control, salvaguarda o contramedida reduce el riesgo. La defensa eficaz combina capas: técnica, de gestión, operativa y física.

| Categoría | Pregunta para reconocerla | Ejemplos |
|---|---|---|
| Técnica | ¿Es hardware, software o tecnología aplicada al sistema? | Firewall, ACL, IDS, EDR, cifrado, MFA |
| De gestión / administrativa | ¿Gobierna, planifica o define decisiones de seguridad? | Políticas, estrategia, evaluación de riesgos, programa de seguridad |
| Operativa | ¿Es una actividad o proceso cotidiano realizado por personas? | Copias, revisión de cuentas, gestión de cambios, formación |
| Física | ¿Es una barrera o medida material? | Cerraduras, cámaras, guardias, vallas, bolardos |

La categoría indica **dónde o cómo actúa** el control; el tipo indica **qué función realiza**.

| Tipo | Acción que debes buscar en el escenario | Ejemplo |
|---|---|---|
| Preventivo | Bloquea o evita un evento antes de que ocurra | Firewall que deniega tráfico, cerradura |
| Disuasorio | Desalienta una conducta | Cartel de videovigilancia, aviso de sanciones |
| Detective | Descubre, registra o alerta | IDS, cámara que graba, revisión de logs |
| Correctivo | Contiene, elimina, restaura o recupera | EDR que aísla, cuarentena, restauración de copia |
| Compensatorio | Mitiga porque el control ideal no es viable o suficiente | VPN para un sistema heredado que no admite una protección moderna |
| Directivo | Establece la conducta o el requisito | Política, estándar, procedimiento, AUP |

Un mismo producto puede cumplir varias funciones. Clasifica la **acción descrita**: antivirus que detecta = detective; si después pone en cuarentena = correctivo.

## 1.2 Fundamentos: CIA, AAA y no repudio

| Concepto | Pregunta de examen | Asociación principal |
|---|---|---|
| Confidencialidad | ¿Quién puede ver el dato? | Cifrado, permisos, enmascaramiento |
| Integridad | ¿El dato sigue exacto y sin cambios no autorizados? | Hash, firma, checksum, controles de escritura |
| Disponibilidad | ¿El servicio o dato está accesible cuando se necesita? | Redundancia, recuperación, energía y conectividad alternativas |
| Autenticación | ¿Eres quien dices ser? | Contraseña, token, biometría |
| Autorización | ¿Qué puedes hacer tras autenticarte? | Roles, permisos, lectura/escritura |
| Contabilidad / trazabilidad | ¿Qué hiciste, cuándo y desde dónde? | Logs y pista de auditoría |
| No repudio | ¿Puedes negar que realizaste esta acción? | Firma digital y gestión fiable de identidad/clave |

### CIA: asociaciones rápidas

- Confidencialidad: impedir divulgación no autorizada; no es lo mismo que ocultar solo parte de un dato.
- Integridad: un archivo puede estar disponible y ser legible, pero perder integridad si se alteró.
- Disponibilidad: no es solo backup; requiere resistir y recuperar fallos. Redundancia reduce puntos únicos de fallo.

| Disponibilidad anual | Caída máxima aproximada |
|---|---|
| 99 % | 3,65 días |
| 99,9 % | 8,76 horas |
| 99,99 % | 52,56 minutos |
| 99,999 % | 5,26 minutos |

### Factores de autenticación

| Factor | Ejemplos |
|---|---|
| Algo que sabes | Contraseña, PIN |
| Algo que tienes | Tarjeta, token, aplicación autenticadora |
| Algo que eres | Huella, rostro, iris |
| Algo que haces | Patrón de tecleo, firma, forma de caminar |
| Algún lugar donde estás | Geovallado, red o ubicación permitida |

MFA exige factores de **categorías distintas**. Contraseña + PIN no es MFA; tarjeta + PIN sí lo es.

## Confianza cero y análisis de brechas

### Zero Trust

Principio: **no confiar por defecto; verificar explícitamente y de forma continua**. También se aplica dentro de la red corporativa.

- Verificar identidad, dispositivo, ubicación, comportamiento y contexto.
- Aplicar mínimo privilegio y segmentación para reducir el radio de impacto.
- Reevaluar el acceso cuando cambie el riesgo.
- Plano de control: define y decide políticas.
- Plano de datos: aplica la decisión a la solicitud real.

| Componente | Función |
|---|---|
| Motor de políticas | Evalúa petición, reglas y contexto |
| Administrador de políticas | Gestiona y establece las políticas |
| PEP | Punto de aplicación: permite o deniega |
| Sujeto | Usuario, dispositivo o aplicación que solicita el recurso |

### Análisis de brechas

Compara **estado actual** frente a **estado deseado**. Identifica diferencias, las prioriza y define acciones para cerrarlas.

Secuencia: alcance/objetivo → recopilar estado actual → comparar → priorizar → planificar → ejecutar y verificar.

El POA&M convierte las brechas en tareas: deficiencia, responsable, recursos, prioridad, hitos y fecha.

## Engaño y seguridad física

### Tecnologías de engaño

| Término | Qué es | Qué indica su interacción |
|---|---|---|
| Honeypot | Sistema o servicio señuelo | Intento de intrusión |
| Honeynet | Red de honeypots | Actividad de ataque más compleja |
| Honeyfile | Archivo señuelo | Acceso, copia o apertura sospechosa |
| Honeytoken | Dato falso sin uso legítimo, como credencial o URL | Cualquier uso es sospechoso |

Son controles complementarios. Deben aislarse y monitorizarse; no sustituyen segmentación, autenticación ni detección real.

### Controles físicos

| Control | Propósito principal |
|---|---|
| Valla | Delimita y retrasa la intrusión de personas |
| Bolardo | Protege frente a vehículos e impactos contra instalaciones |
| CCTV | Observa y aporta evidencia; principalmente detective |
| Guardias | Disuaden, verifican y responden |
| Iluminación | Reduce zonas ocultas y mejora vigilancia |
| Sensor infrarrojo | Detecta presencia o calor |
| Sensor de presión | Detecta peso sobre una superficie |
| Sensor de microondas / ultrasónico | Detecta movimiento |
| Vestíbulo de control / mantrap | Verifica a una persona entre dos puertas, una abierta cada vez |

Piggybacking: la persona autorizada deja entrar a otra con conocimiento o consentimiento.  
Tailgating: el intruso sigue a una persona autorizada sin que esta lo advierta.

| Métrica biométrica | Significado |
|---|---|
| FAR | Acepta a alguien no autorizado |
| FRR | Rechaza a alguien autorizado |
| CER/EER | Punto donde FAR y FRR se igualan; cuanto menor, mejor equilibrio |

## 1.3 Gestión de cambios

La gestión de cambios permite pasar de un estado actual a uno deseado de forma planificada, aprobada, probada, reversible y documentada. No impide cambiar: evita que un cambio introduzca indisponibilidad, configuraciones inseguras o dependencias rotas.

### Gobierno del cambio

| Elemento | Función |
|---|---|
| Propietario del cambio | Justifica, define alcance, coordina y responde por el cambio |
| CAB | Evalúa viabilidad, riesgo, impacto, recursos, aprobación y calendario |
| Interesados | Técnicos, negocio, seguridad, soporte, usuarios y cumplimiento afectados |
| Análisis de impacto | Identifica activos, dependencias, riesgos CIA, caída prevista y consecuencias |

### Ciclo de vida

1. Solicitar y justificar el cambio.
2. Definir objetivo, alcance, riesgos, criterios de éxito y propietario.
3. Analizar impacto y dependencias; obtener aprobación.
4. Planificar recursos, comunicaciones, ventana, pruebas y reversión.
5. Implementar de forma controlada.
6. Validar que funciona técnica, operativa y seguramente.
7. Revertir si no cumple los criterios.
8. Documentar resultado, lecciones aprendidas y estado final.

### Conceptos que suelen aparecer

| Concepto | Pista de examen |
|---|---|
| Ventana de mantenimiento | Momento planificado que reduce el impacto de un cambio no urgente |
| Cambio de emergencia | Se acelera por riesgo o urgencia; no elimina registro, control ni revisión posterior |
| Plan de reversión / backout | Devuelve el sistema a un estado conocido si falla el cambio |
| Pruebas posteriores | Confirman que sigue funcionando y que conserva los controles de seguridad |
| Control de versiones | Conserva historial y permite recuperar una configuración estable |
| Lista de permitidos | Autoriza explícitamente lo permitido; lo demás se deniega |
| Lista de denegados | Bloquea elementos conocidos; lo no listado puede permitirse |

Revisar siempre: reinicios, indisponibilidad, acumulación de trabajo, actividades restringidas, aplicaciones heredadas, integraciones y dependencias. Tras el cambio, actualizar ticket, diagramas, inventario, configuración y procedimientos.

## 1.4 Criptografía

### Qué elegir según la necesidad

| Necesidad | Mecanismo principal |
|---|---|
| Ocultar contenido | Cifrado |
| Detectar cambios | Hash criptográfico |
| Integridad + autenticidad + no repudio | Firma digital |
| Integridad + autenticidad entre partes que comparten secreto | HMAC |
| Gestionar claves públicas y certificados | PKI |
| Custodiar claves de alto valor | TPM, HSM, KMS o enclave seguro |
| Reducir exposición del valor real | Tokenización o enmascaramiento |

Los datos requieren protección:

- En reposo: disco, base de datos, backup.
- En tránsito: red, API, navegador.
- En uso: memoria y procesamiento activo.

### Cifrado simétrico, asimétrico e híbrido

| Característica | Simétrico | Asimétrico |
|---|---|---|
| Claves | Una clave secreta compartida | Par pública/privada |
| Rendimiento | Alto; adecuado para mucho volumen | Más costoso |
| Uso típico | Datos, discos, archivos, sesión | Intercambio de claves, firmas, autenticación |
| Problema principal | Distribuir el secreto | Gestionar identidad y confianza de claves públicas |

- Para confidencialidad asimétrica: cifrar con la **clave pública del receptor**; descifra con su privada.
- Para firma digital: firmar con la **clave privada del firmante**; verificar con su pública.
- Enfoque híbrido: asimétrica para autenticar/establecer claves, simétrica para el tráfico principal.

| Algoritmo | Asociación |
|---|---|
| AES | Simétrico, de bloque, elección moderna habitual; claves 128/192/256 bits |
| DES / 3DES | Históricos, no adecuados para diseños nuevos |
| RC4 | Cifrado de flujo histórico e inseguro |
| RSA | Cifrado, intercambio de claves y firmas en entornos existentes |
| Diffie-Hellman | Intercambio de claves; necesita autenticación adicional |
| ECC | Seguridad con claves más pequeñas; útil en recursos limitados |
| ECDH / ECDHE | Intercambio de claves de curva elíptica; ECDHE usa claves efímeras y favorece secreto perfecto hacia adelante |
| ECDSA | Firma digital de curva elíptica |

No confundas clasificación: bloque/flujo es distinta de simétrico/asimétrico.

### Hash, HMAC y firma

| Mecanismo | Aporta | Claves |
|---|---|---|
| Hash | Integridad, si el valor esperado es fiable | No |
| HMAC | Integridad y autenticidad basada en secreto compartido | Clave simétrica |
| Firma digital | Integridad, autenticidad y no repudio | Privada para firmar, pública para verificar |

Un hash es unidireccional; no cifra ni permite recuperar el contenido.  
Checksum suele asociarse a detección de errores accidentales; hash criptográfico, a detección robusta de manipulación.

| Hash | Estado de examen |
|---|---|
| MD5 | Obsoleto; colisiones |
| SHA-1 | Obsoleto para usos de seguridad modernos |
| SHA-2 / SHA-256 | Uso actual habitual para integridad |
| SHA-3 | Familia moderna complementaria |
| RIPEMD | Familia que puede aparecer en identificación |

Protección de contraseñas:

- Sal: valor aleatorio único que evita que la misma contraseña produzca el mismo resultado.
- Estiramiento de claves: aumenta el coste de probar contraseñas.
- Nonce: valor usado una sola vez; evita repetición de mensajes.
- Pass-the-hash: reutilización de un hash robado para autenticarse.

### PKI y certificados

PKI es el ecosistema de personas, políticas, procedimientos, software y hardware que administra claves y certificados. No es solo criptografía asimétrica.

| Componente | Papel |
|---|---|
| CA | Emite y firma certificados |
| RA | Valida o registra al solicitante para la CA |
| CSR | Solicitud con identidad y clave pública; nunca incluye la privada |
| Certificado X.509 | Vincula identidad y clave pública, firmado por CA |
| CRL | Lista publicada de certificados revocados |
| OCSP | Consulta puntual del estado de revocación |
| OCSP stapling | El servidor adjunta una respuesta OCSP reciente |

Validar certificado: nombre esperado, fecha de validez, cadena hasta raíz confiable y estado de revocación.

| Tipo | Uso o diferencia |
|---|---|
| Autofirmado | Útil en entorno cerrado con confianza distribuida; no valida externamente por defecto |
| Wildcard | Cubre subdominios de un dominio; una clave comprometida afecta a todos los cubiertos |
| SAN | Incluye varios nombres/identidades en un certificado |
| Autenticación unilateral | El cliente valida normalmente al servidor |
| Autenticación mutua | Cliente y servidor presentan certificados |

Key escrow: copia controlada de claves para recuperación legítima; aumenta disponibilidad, pero exige controles, auditoría y separación de funciones.

### Protección de claves y ocultación de datos

| Recurso | Función |
|---|---|
| TPM | Protege secretos ligados a un equipo, mediciones de arranque y claves locales |
| HSM | Hardware dedicado y resistente a manipulaciones para claves y operaciones de alto valor |
| KMS | Gestiona ciclo de vida de claves a escala: creación, distribución, rotación, revocación y destrucción |
| Enclave seguro | Área aislada para procesar y proteger secretos sensibles |
| Esteganografía | Oculta la existencia de un mensaje en otro contenido; no lo cifra necesariamente |
| Tokenización | Sustituye el dato por un token; la relación se conserva en un sistema protegido |
| Enmascaramiento | Muestra versión parcial o ficticia del dato |

Blockchain: libro mayor distribuido cuyos bloques se enlazan mediante hashes; aporta trazabilidad e integridad detectable. No es infalible: depende de claves, código, gobernanza, consenso y calidad del dato introducido. Un contrato inteligente ejecuta lógica cuando se cumplen condiciones definidas.

## Confusiones rápidas

| Si el escenario dice... | Piensa en... |
|---|---|
| “No puede leerlo” | Confidencialidad / cifrado |
| “Cambió o no coincide” | Integridad / hash |
| “El servicio sigue funcionando al fallar un nodo” | Disponibilidad / redundancia |
| “¿Quién eres?” | Autenticación |
| “¿Qué permisos tienes?” | Autorización |
| “¿Qué hizo?” | Contabilidad / logs |
| “No puede negar que firmó” | No repudio / firma digital |
| “Estado actual frente a objetivo” | Análisis de brechas |
| “Vuelve atrás si falla” | Plan de reversión |
| “Datos grandes con buen rendimiento” | Cifrado simétrico / AES |
| “Intercambio de secreto” | Diffie-Hellman o ECDH |
| “Emite certificados” | CA |
| “Revocación de un certificado concreto” | OCSP |
| “Claves de alto valor en hardware dedicado” | HSM |
| “Dato falso sin uso legítimo” | Honeytoken |

## Repaso final

- Distingue categoría de control de función: técnico/gestión/operativo/físico frente a preventivo/disuasorio/detective/correctivo/compensatorio/directivo.
- CIA protege secreto, exactitud y acceso oportuno; AAA identifica, limita y registra.
- Zero Trust verifica continuamente y reduce privilegio/radio de impacto.
- Un cambio seguro tiene análisis de impacto, aprobación, pruebas, reversión y documentación.
- Cifrado ≠ hash ≠ firma: confidencialidad ≠ integridad ≠ no repudio.
- PKI aporta confianza y gestión alrededor de certificados y claves públicas.
- Ante comparaciones cercanas, busca el verbo del escenario y la propiedad exacta que se está pidiendo.
