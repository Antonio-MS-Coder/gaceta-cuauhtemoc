/* ============================================================================
   Conexión de La Gaceta de Cuauhtémoc con Google Sheets (sin API key).
   ----------------------------------------------------------------------------
   Para EDITAR la data desde una hoja de Google:
     1) Crea una hoja con la fila de encabezados (ver data/negocios.csv) o
        importa ese CSV directamente (Archivo → Importar → Subir).
     2) En Google Sheets: Archivo → Compartir → Publicar en la web →
        elige la pestaña y formato "Valores separados por comas (.csv)" → Publicar.
     3) Copia esa URL y pégala abajo en SHEET_CSV_URL.
   Mientras SHEET_CSV_URL esté vacío, la gaceta usa los datos locales (offline).
   Guía completa: docs/conectar-google-sheets.md
   ========================================================================== */
window.GACETA = {
  // 👇 URL CSV publicada de tu hoja (pestaña pública del directorio).
  SHEET_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThzEmLuywepHg9dJH-ohe7eSNVFE_DGxp_cEr8Mc9M8sTk58fIugedzZbsPn3GEYfDjOMp4lQKk5OP/pub?gid=1619426642&single=true&output=csv",

  // Convierte una fila de la hoja (objeto por encabezado) a un negocio de la gaceta.
  rowToNegocio(r){
    const get=(...keys)=>{for(const k of keys){const v=r[k];if(v!=null&&String(v).trim()!=='')return String(v).trim();}return '';};
    // Palabras que cuentan como "sí / visible" (en pastillas o texto). Todo lo demás = "no".
    const AFIRMATIVO=['x','✓','✔','sí','si','s','true','verdadero','1','yes','on',
      'activo','activa','visible','público','publico','publicado','publicada',
      'portada','destacado','destacada','acopio'];
    const truthy=v=>AFIRMATIVO.includes(String(v||'').trim().toLowerCase());
    return {
      n:   get('nombre','negocio','name','n'),
      c:   get('categoria','categoría','category','giro','c'),
      col: get('colonia','col'),
      d:   get('descripcion','descripción','desc','d'),
      dir: get('direccion','dirección','dir'),
      tel: get('telefono','teléfono','tel'),
      h:   get('horario','horarios','h'),
      src: get('fuente','source','src'),
      fav:    truthy(get('portada','fav','destacado')),
      acopio: truthy(get('acopio','tapas')),
      activo: truthy(get('activo','visible','estatus','status','publicar','estado','visibilidad','publicación','publicacion')),
      prioridad: parseFloat(get('prioridad','orden','rank','ranking'))||0
    };
  },

  // Parser CSV mínimo: respeta comillas y comas/saltos de línea dentro de un campo.
  parseCSV(text){
    const rows=[]; let row=[], field='', q=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i];
      if(q){
        if(ch==='"'){ if(text[i+1]==='"'){field+='"';i++;} else q=false; }
        else field+=ch;
      } else {
        if(ch==='"') q=true;
        else if(ch===',') { row.push(field); field=''; }
        else if(ch==='\n'){ row.push(field); rows.push(row); row=[]; field=''; }
        else if(ch==='\r'){ /* ignora */ }
        else field+=ch;
      }
    }
    if(field!==''||row.length){ row.push(field); rows.push(row); }
    return rows;
  },

  // Descarga la hoja y regresa un arreglo de negocios, o null si no hay URL / falla.
  async load(){
    const url = this.SHEET_CSV_URL && this.SHEET_CSV_URL.trim();
    if(!url) return null;
    try{
      const res = await fetch(url, {cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      const rows = this.parseCSV(await res.text()).filter(r=>r.some(c=>String(c).trim()!==''));
      if(rows.length < 2) return null;
      const headers = rows[0].map(h=>h.trim().toLowerCase());
      const activoKeys = ['activo','visible','estatus','status','publicar','estado','visibilidad','publicación','publicacion'];
      const hasActivo = headers.some(h=>activoKeys.includes(h));
      let list = rows.slice(1).map(cells=>{
        const obj={}; headers.forEach((h,i)=>obj[h]=cells[i]!=null?cells[i]:'');
        return this.rowToNegocio(obj);
      }).filter(b=>b.n && b.c);
      // Si la hoja trae columna "activo", solo se muestran las filas marcadas (control de visibilidad).
      if(hasActivo) list = list.filter(b=>b.activo);
      return list.length ? list : null;
    }catch(e){
      console.warn('No se pudo cargar el Google Sheet, uso datos locales:', e);
      return null;
    }
  }
};
