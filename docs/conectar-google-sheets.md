# Conectar La Gaceta a Google Sheets

Hay dos conexiones posibles, independientes:

- **Parte A — La gaceta (directorio):** editar los negocios desde una hoja y que el sitio los lea. *(Esto es lo nuevo.)*
- **Parte B — El formulario de alta (`alta.html`):** que cada captura caiga en una hoja.

---

## Parte A · Editar el directorio desde Google Sheets

Hoy la gaceta trae 71 negocios reales escritos en el código (`index.html`). Para poder
**editarlos desde una hoja de Google** (agregar, corregir, quitar, marcar portada o acopio)
sin tocar código, sigue esto una sola vez (~10 min). No requiere API key.

### 1. Crea la hoja con los datos actuales
1. Entra a [sheets.new](https://sheets.new) y nómbrala **Gaceta Cuauhtémoc - Negocios**.
2. **Archivo → Importar → Subir** y sube el archivo `data/negocios.csv` de este repo.
   - En las opciones de importación elige **"Reemplazar hoja actual"** y **detectar separador automático**.
   - Quedan los 71 negocios con sus columnas listas.
3. (Opcional) Renombra la pestaña a `Negocios`.

### 2. Columnas (encabezados de la fila 1)
El sitio lee estas columnas por nombre (no importa el orden, ni mayúsculas/acentos):

| Columna | Qué es | Ejemplo |
|---|---|---|
| `nombre` | Nombre del negocio | Fonda La Esquina |
| `categoria` | **Debe ser una de las 7** (ver abajo) | Restaurantes y Antojitos |
| `colonia` | Colonia de la Cuauhtémoc | Doctores |
| `descripcion` | Una frase | Comida corrida casera… |
| `direccion` | Calle y número | Dr. Lavista 88 |
| `telefono` | Opcional (vacío = no se muestra) | 55 1234 5678 |
| `horario` | Opcional (vacío = no se muestra) | L-S 8:00–18:00 |
| `portada` | `x` en **un** negocio = el destacado | x |
| `acopio` | `x` = centro de acopio de tapas (sale en la causa) | x |
| `activo` | `x` = visible en la gaceta · **vacío = oculto** (sirve para aprobar altas) | x |
| `prioridad` | Número para ordenar: **más alto = más arriba** (según qué tanto apoya; vacío = 0) | 50 |
| `fuente` | Liga de dónde se verificó (no se muestra) | https://… |

> **Columna `activo`:** si la hoja la trae, la gaceta **solo muestra las filas con `x`**. Una fila
> sin `x` queda oculta (pendiente). Así puedes aprobar/bajar negocios sin borrarlos. Si quitas la
> columna por completo, se muestran todos.

**Las 7 categorías con color e ícono propios** (cópialas exactas):
`Restaurantes y Antojitos`, `Cafés y Panaderías`, `Tiendas y Abarrotes`, `Servicios`,
`Salud y Bienestar`, `Belleza y Estética`, `Cultura y Arte`.

Puedes inventar **categorías nuevas**: si escribes una categoría distinta, la gaceta crea su
sección igual (con color gris por defecto). Si quieres que lleve color e ícono propios, se agrega
en el código (`CATMETA` en `index.html`).

**Tip — categoría como lista desplegable (evita errores de dedo):** en la hoja selecciona la
columna `categoria` → menú **Datos → Validación de datos** → Criterios: "Lista de elementos" →
pega las 7 categorías separadas por coma → Listo. Cada alta se elige de un menú.

### 3. Publica la hoja como CSV
1. En la hoja: **Archivo → Compartir → Publicar en la web**.
2. Pestaña: `Negocios` (o "Todo el documento"). Formato: **Valores separados por comas (.csv)**.
3. **Publicar** → copia la URL (termina en `…/pub?gid=0&single=true&output=csv`).

### 4. Pega la URL en el sitio
En `data/gaceta-data.js`, línea `SHEET_CSV_URL`:

```javascript
SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv",
```

Sube el cambio (commit + push). Listo: cada vez que edites la hoja, la gaceta se actualiza
sola al recargar (Google tarda 1-5 min en refrescar el CSV publicado).

### Notas
- **Sin riesgo:** mientras `SHEET_CSV_URL` esté vacío, el sitio usa los datos locales. Si la
  hoja falla o no hay internet, también cae a los datos locales. Nunca se queda en blanco.
- **Una sola fuente para la causa:** la página `causa.html` lee la **misma** hoja y muestra como
  centros de acopio las filas con `acopio` = `x`.
- **Privado:** "Publicar en la web" hace el CSV **público** (cualquiera con la liga lo ve). No pongas
  datos privados (teléfonos de dueños, notas internas) en esta hoja; eso va en el CRM (Parte B).

---

## Parte B · Conectar el formulario de alta (`alta.html`)

El formulario `alta.html` funciona en **modo demostración** (guarda en el dispositivo). Para que
las altas caigan en una hoja de Google, usa Apps Script (porque el formulario **escribe**, y un CSV
publicado solo sirve para **leer**).

### 1. Abre tu hoja
Abre **Gaceta Cuauhtémoc - Directorio** (la del directorio). El script vive dentro de ella:
agrega las altas nuevas como filas **pendientes** en la pestaña del directorio y guarda lo
privado (CRM) en una pestaña aparte `Altas (CRM)` que **no** se publica.

### 2. Pega el script
En la hoja: **Extensiones → Apps Script**. Borra lo que haya y pega:

```javascript
function doPost(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var d = JSON.parse(e.postData.contents);

  // 1) Fila PÚBLICA (pendiente: activo vacío) en la pestaña que lee la gaceta (la primera).
  var pub = ss.getSheets()[0];
  if (pub.getLastRow() === 0){
    pub.appendRow(['nombre','categoria','colonia','descripcion','direccion','telefono','horario','portada','acopio','activo','prioridad','fuente']);
  }
  pub.appendRow([d.nombre, d.giro, d.colonia, d.descripcion, d.direccion, d.telefono, d.horario, '', '', '', '', '']);

  // 2) Fila PRIVADA (CRM) en una pestaña aparte que NO se publica.
  var crm = ss.getSheetByName('Altas (CRM)') || ss.insertSheet('Altas (CRM)');
  if (crm.getLastRow() === 0){
    crm.appendRow(['fecha','nombre','dueno','contacto','afinidad','tamano','moviliza','temas','seguimiento','capturo','consentimiento']);
  }
  crm.appendRow([d.fecha, d.nombre, d.dueno, d.contacto, d.afinidad, d.tamano, d.moviliza, d.temas, d.seguimiento, d.capturadoPor, d.consentimiento]);

  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
```

> Cada alta entra con `activo` **vacío** (pendiente) en el directorio, y sus datos privados van a
> la pestaña `Altas (CRM)`. Aparece en la gaceta cuando tú escribas `x` en `activo`.

### 3. Publícalo como Web App
1. **Implementar → Nueva implementación** → Tipo: **Aplicación web**.
2. **Ejecutar como:** Yo. **Quién tiene acceso:** Cualquier persona.
3. **Implementar** → autoriza → copia la **URL de la app web** (termina en `/exec`).

### 4. Pega la URL en el formulario
En `alta.html`, línea de `CONFIG`:

```javascript
const CONFIG = { endpoint: "https://script.google.com/macros/s/XXXXX/exec" };
```

Sube el cambio y listo: cada alta cae en tu hoja.

### Notas
- **Públicos vs. privados:** las columnas Dueño/Contacto/Afinidad/Temas son tu **CRM** — no las
  publiques en la gaceta. La hoja de la Parte A (pública) y la del CRM (Parte B, privada) son distintas.
- **Privacidad (LFPDPPP):** falta redactar el aviso de privacidad real (hoy es placeholder).
- **Fotos:** hoy se captura una liga; subir foto del celular directo requiere Drive (se ve después).
- **CORS:** el envío usa `mode:'no-cors'`, así que el navegador no lee la respuesta; se asume éxito.
  Es lo normal con Apps Script desde una página estática.

---

## Parte C · Flujo de aprobación (pre-aprobados)

Con el Apps Script de la Parte B, cada alta del formulario hace dos cosas:

1. Agrega una fila **pendiente** (columna `activo` vacía) en la pestaña del directorio → **no se ve** todavía.
2. Guarda los datos del CRM (dueño, contacto, afinidad…) en una pestaña aparte **`Altas (CRM)`** que **no se publica**.

Para **aprobar**: pon `x` en `activo` de esa fila → aparece en la gaceta en minutos.
Para **bajar**: borra la `x` (no pierdes el registro).

**Privacidad (clave):** publica en la web **solo la pestaña del directorio** (no "todo el documento")
y **no** cambies el acceso del archivo a "cualquiera con el enlace". Así la pestaña `Altas (CRM)`
con los datos sensibles queda privada.
```
