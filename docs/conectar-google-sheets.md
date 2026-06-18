# Conectar el formulario a Google Sheets (Camino C)

El formulario `alta.html` ya funciona en **modo demostración** (guarda en el dispositivo). Para que las altas caigan en una **hoja de Google** de verdad, sigue estos pasos una sola vez (~10 min).

## 1. Crea la hoja
1. Entra a [sheets.new](https://sheets.new) y nómbrala **Gaceta Cuauhtémoc - Negocios**.
2. Cambia el nombre de la pestaña a `Negocios`.

## 2. Pega el script
1. En la hoja: menú **Extensiones → Apps Script**.
2. Borra lo que haya y pega esto:

```javascript
function doPost(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Negocios') || ss.insertSheet('Negocios');
  if (sheet.getLastRow() === 0){
    sheet.appendRow(['Fecha','Nombre','Giro','Colonia','Dirección','Teléfono','Horario',
      'Descripción','Foto','Dueño','Contacto','Afinidad','Temas','Seguimiento','Capturó','Consentimiento']);
  }
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.fecha, d.nombre, d.giro, d.colonia, d.direccion, d.telefono, d.horario,
    d.descripcion, d.fotoUrl, d.dueno, d.contacto, d.afinidad, d.temas, d.seguimiento, d.capturadoPor, d.consentimiento]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publícalo como Web App
1. Botón **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. **Ejecutar como:** Yo. **Quién tiene acceso:** Cualquier persona.
4. **Implementar** → autoriza con tu cuenta → copia la **URL de la app web** (termina en `/exec`).

## 4. Pega la URL en el formulario
En `alta.html`, línea de `CONFIG`:

```javascript
const CONFIG = { endpoint: "https://script.google.com/macros/s/XXXXX/exec" };
```

Sube el cambio (commit + push) y listo: cada alta cae en tu hoja.

## Notas
- **Públicos vs. privados:** las columnas Dueño/Contacto/Afinidad/Temas son tu **CRM** — no las publiques en la gaceta. Para la versión pública, conviene una segunda hoja/vista que solo lea las columnas públicas.
- **Privacidad (LFPDPPP):** falta redactar el aviso de privacidad real (hoy es un placeholder en el formulario). Necesario antes de capturar datos de personas.
- **Fotos:** hoy se captura una liga. Subir la foto del celular directo requiere un paso extra (Drive); lo vemos cuando toque.
- **CORS:** el envío usa `mode:'no-cors'`, así que el navegador no lee la respuesta; asumimos éxito. Es lo normal con Apps Script desde una página estática.
