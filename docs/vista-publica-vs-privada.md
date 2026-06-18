# Separar la vista pública de la privada (CRM)

**Principio:** la separación es en los **datos**, no solo en la pantalla. El sitio público nunca debe descargar las columnas privadas. Por eso publicamos solo una pestaña con datos públicos.

## Estructura: 1 hoja, 2 pestañas

### Pestaña `Maestro` (privada — tu CRM)
Todas las columnas. Solo tu equipo entra (con su cuenta de Google). El formulario `alta.html` escribe aquí.

| A Fecha | B Nombre | C Giro | D Colonia | E Dirección | F Teléfono | G Horario | H Descripción | I Foto | J Dueño | K Contacto | L Afinidad | M Tamaño | N Moviliza | O Temas | P Seguimiento | Q Capturó | R Consentimiento | S Publicar |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

- **Públicas:** B–I (nombre, giro, colonia, dirección, teléfono, horario, descripción, foto).
- **Privadas (CRM):** J–R (dueño, contacto, afinidad, **tamaño**, **moviliza** = gente que puede movilizar, temas, seguimiento, capturó, consentimiento).
- **Moderación:** S `Publicar` = `sí` / `no`. Solo lo que tú marques `sí` sale a la gaceta.

### Pestaña `Público` (lo que ve el mundo)
En la celda **A1** pon esta fórmula (jala solo columnas públicas + solo filas aprobadas):

```
=QUERY(Maestro!A2:S, "select B,C,D,E,F,G,H,I where S = 'sí'", 0)
```

Pon encabezados manuales en la fila 1 si quieres: `Nombre | Giro | Colonia | Dirección | Teléfono | Horario | Descripción | Foto`. (Si los pones, cambia el rango de la fórmula a `A2`.)

## Publicar SOLO la pestaña Público
1. **Archivo → Compartir → Publicar en la web.**
2. En "Vincular", elige la pestaña **Público** (NO "Todo el documento").
3. Formato **CSV** → **Publicar**.
4. Copia la URL (termina en `output=csv`).

> ⚠️ Nunca publiques "Todo el documento" ni la pestaña Maestro. Si lo haces, expones el CRM.

## Conectar la gaceta
En `index.html`, en `CONFIG`, pega esa URL como `sheetCsvUrl`. La gaceta dejará de usar los datos de muestra y leerá los negocios reales aprobados.

## Capas de seguridad (resumen)
- **Datos:** el sitio solo recibe el CSV público (8 columnas). El CRM nunca viaja al navegador.
- **Acceso:** la hoja Maestro se comparte solo con las cuentas de tu equipo. El resto no puede abrirla.
- **Moderación:** la columna `Publicar` controla qué sale a la calle.
- **Privacidad (LFPDPPP):** el consentimiento queda registrado (col. P); falta redactar el aviso de privacidad real.

## El "CRM" en la práctica
Tu CRM ES la pestaña Maestro. Para trabajarla:
- Filtros/vistas por colonia, por afinidad, por fecha de seguimiento.
- Vista tipo tablero (kanban) con la columna Afinidad.
- Exportar para campaña cuando llegue el momento.
Todo dentro de Google Sheets, sin programar.
