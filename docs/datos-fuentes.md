# Datos y fuentes — La Gaceta de Cuauhtémoc

Este documento registra de dónde salieron los datos **reales** que hoy alimentan la gaceta
(`index.html`) y la página de causa (`causa.html`). La investigación se hizo con búsqueda web
verificando cada negocio contra una fuente real (sitio oficial, Google Maps, reseña o directorio).

> Regla de oro aplicada: solo se incluyó un negocio si se pudo confirmar que existe en una dirección
> real **dentro de la Alcaldía Cuauhtémoc**. Teléfonos y horarios se dejaron **vacíos** cuando no se
> pudieron confirmar en una fuente, en lugar de inventarlos. Cada negocio guarda su URL de origen en el
> campo `src` del arreglo `NEGOCIOS` (no se muestra en pantalla).

## Estado de los datos

- **71 negocios reales** repartidos en 7 categorías y ~14 colonias de la Alcaldía Cuauhtémoc.
- Colonias cubiertas: Centro, San Rafael, Roma Norte, Roma Sur, Condesa, Hipódromo, Doctores,
  Tabacalera, Guerrero, Santa María la Ribera, Obrera, Juárez, Buenavista, Peralvillo.
- Negocio de portada (`fav`): **El Califa de León** (San Rafael) — primera Estrella Michelin del mundo
  para un puesto de tacos.

### Verificar antes de imprimir
- **Horarios y teléfonos cambian.** Los que aparecen vienen de una fuente, pero conviene reconfirmarlos
  (sobre todo en mercados y locales chicos) antes de una edición impresa.
- Varias direcciones de fondas/loncherías chicas (p. ej. Cocina Barrio Obrera, La Delicia Hogareña,
  Carnitas Los Pelayos) vienen de agregadores (DiDi Food, roundups). Son negocios reales; conviene
  confirmar el número exacto en Maps antes de publicar definitivo.

## Cómo están organizados los datos

- `index.html` → constante `NEGOCIOS` (campos: `n` nombre, `c` categoría, `col` colonia, `d` descripción,
  `dir` dirección, `tel`, `h` horario, `src` fuente, `fav` portada, `acopio` se calcula).
- `index.html` → `ACOPIO_SET` marca qué negocios son centro de acopio de tapas (badge en la tarjeta).
- `causa.html` → constante `ACOPIO` (debe coincidir con `ACOPIO_SET`).

---

## Causa "Tapatón" — fundaciones reales y advertencias

Investigación sobre organizaciones legítimas que reciben tapitas de plástico para apoyar el cáncer
infantil en México/CDMX. Se eligieron dos por su solidez y vínculo con la CDMX:

### AMANC — Asociación Mexicana de Ayuda a Niños con Cáncer, I.A.P.
- Aliada del Gobierno de la CDMX (SEDEMA) en la recolección de tapitas (contenedores tipo corazón, 2019).
  Fuente: https://www.sedema.cdmx.gob.mx/comunicacion/nota/se-une-sedema-recoleccion-de-tapitas-de-plastico-favor-de-ninos-con-cancer
- Reciclan el material y con el ingreso compran medicamentos oncológicos, estudios, prótesis, etc.
  Fuente: https://www.amanc.org/ayudar/reciclando/
- Centro de acopio: Insurgentes Sur 3679, Tlalpan, CDMX (**fuera de Cuauhtémoc**).
- Cifra publicada: apoya a **+3,500 pacientes al año** (red nacional). Fuente: https://www.amanc.org/ayudar/reciclando/

### Banco de Tapitas A.C.
- A.C. fundada en 2015; muelen las tapas hasta hacer pellets que venden a la industria del plástico.
  Fuente: https://www.bancodetapitas.org/preguntas
- Atienden a menores de 21 años con cáncer (atención, pelucas oncológicas, equipo médico, albergues).
- Cifra publicada: en **2025 reciclaron más de 1,100 toneladas** de tapas. Fuente: https://www.bancodetapitas.org/
- Casa de acopio CDMX: Playa Pichilingue 31, Iztacalco (**fuera de Cuauhtémoc**).

### ⚠️ A confirmar ANTES de publicar la versión definitiva de la causa
1. Elegir y **confirmar la alianza** con la fundación (AMANC o Banco de Tapitas), con permiso de nombre/logo.
2. **Ningún centro de acopio de la fundación está dentro de Cuauhtémoc.** El barrio debe montar su propio
   punto de acopio vecinal y trasladar las tapas. No decir "centro de acopio de la fundación en Cuauhtémoc".
3. **No publicar equivalencias inventadas** ("X tapas/kg = 1 quimio"). Ninguna fundación publica esa
   conversión. Citar solo cifras reales (1,100 ton 2025 / +3,500 pacientes año).
4. **No prometer recibos deducibles** hasta confirmar el estatus de donataria autorizada con la fundación.
5. La **historia y foto del caso** deben ser reales y con permiso de la familia (hoy es marcador de posición).
6. Los **centros de acopio listados son de ejemplo**: negocios reales del directorio cuya participación es
   voluntaria y está por confirmar con cada uno.

---

## Datos de la Alcaldía Cuauhtémoc (para color editorial)

- **Población: 545,884 habitantes** (Censo INEGI 2020). Fuente: https://www.inegi.org.mx/app/cpv/2020/resultadosrapidos/
- **Superficie: 32.40 km².** Fuente: https://es.wikipedia.org/wiki/Cuauht%C3%A9moc_(Ciudad_de_M%C3%A9xico)
- **33 colonias** (cifra oficial de la Alcaldía; el desglose territorial arroja algunos nombres más —
  defendible mantener "33 colonias"). Fuente: cuenta oficial de la Alcaldía Cuauhtémoc.
- **39 mercados públicos** (cuenta oficial de la Alcaldía + SEDECO; 3ª alcaldía con más mercados de la CDMX).
  Fuente: https://x.com/AlcCuauhtemocMx/status/1630969506141962243
- Aporta ~**4.6% del PIB nacional** y concentra ~**36% de la infraestructura cultural** de la CDMX.
  Fuente: https://es.wikipedia.org/wiki/Cuauht%C3%A9moc_(Ciudad_de_M%C3%A9xico)
- **NO VERIFICADO:** número exacto de unidades económicas/negocios (consultar DENUE de INEGI filtrando
  por la alcaldía; no inventar la cifra).
