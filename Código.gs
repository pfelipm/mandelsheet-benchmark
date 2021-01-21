/**
 * Dibuja una parte del conjunto de Mandebrot y toma tiempos
 * 
 * @OnlyCurrentDoc
 */


/* Añadir las funciones al menú al abrir la hdc */

function onOpen() {
  var mihoja = SpreadsheetApp.getActiveSpreadsheet();
  var menu = [{name:"Mandelbrot (setBackgroundRGB)", functionName:"cellmandelbrot1"},
              {name:"Mandelbrot (setBackgrounds)", functionName:"cellmandelbrot2"}];
  mihoja.addMenu("Scripts", menu);
}

/* ¡A dibujar! -> Versión 1: se cambia el color de las celdas una a una */

function cellmandelbrot1() {

  /* Variables generales */

  var celdasX = 100;
  var celdasY = 50;
  var tamanyocelda = 10;
  var maxiter = 20;
  var zoom = 4.0;
  var mihoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ultimafila = mihoja.getMaxRows();
  var ultimacolumna = mihoja.getMaxColumns();
  
  /* Limpiar lienzo */

  mihoja.clear();
  SpreadsheetApp.flush();
  
  /* Ajustar tamaño hoja > columnas */
  
  if (celdasX > ultimacolumna) {
    mihoja.insertColumns(1, celdasX - ultimacolumna);
  }
  else if (celdasX < ultimacolumna) {
    mihoja.deleteColumns(1, ultimacolumna - celdasX);
  }
  
  /* Ajustar tamaño hoja > filas */
  
  if (celdasY > ultimafila) {
    mihoja.insertRows(1, celdasY - ultimafila);
  }
  else if (celdasY < ultimafila) {
    mihoja.deleteRows(1, ultimafila - celdasY);
  }

   /* Ajustar altura filas y anchura columnas */

  mihoja.setColumnWidths(1, celdasX, tamanyocelda);
  mihoja.setRowHeights(1, celdasY, tamanyocelda);
  
  /* Renombrar hoja para introducir parámetros como sufijo */
  
  var nombre = 'Mandelbrot X:' + celdasX + ' Y:' + celdasY + ' Iter:' + maxiter;
  if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre) == null) {
    mihoja.setName('Mandelbrot X:' + celdasX + ' Y:' + celdasY + ' Iter:' + maxiter);
  }
  
  /* Registrar tiempo inicial */ 

  SpreadsheetApp.getActiveSpreadsheet().toast('Calculando...', 'Ejecución iniciada', -1)
  var t1 = new Date().getTime();
  var t2;
  var ts = 0;
  var ts1;
  var colorFondo;
  
  /* Mandelbrot, basado en http://jonisalonen.com/2013/lets-draw-the-mandelbrot-set/ */
   
  for (fil = 1; fil <= celdasY; fil++) {
    for (col = 1; col <= celdasX; col++) {
      c_re = (col - celdasX/2.0)*zoom/celdasX;
      c_im = (fil - celdasY/2.0)*zoom/celdasX;
      x = 0, y = 0;
      iter = 0;
      while (x*x+y*y <= zoom && iter < maxiter) {
        nueva_x = x*x - y*y + c_re;
        y = 2*x*y + c_im;
        x = nueva_x;
        iter++;
      }
        
      /* Determinar el color de fondo de la celda de acuerdo con un mapa de color definido */
        
      if (iter < maxiter) {
        colorFondo = {r: 255-iter*255/maxiter, g: 60, b: iter*255/maxiter };
      }
      else {
        colorFondo = {r: 0, g: 0, b: 0};
      }

      /* Medir tiempo parcial uso SpreadsheetApp */

      ts1 = new Date().getTime();
      mihoja.getRange(fil, col).setBackgroundRGB(colorFondo.r, colorFondo.g, colorFondo.b);
      ts += new Date().getTime() - ts1;
    }
  }
  
  /* Mostrar tiempos */

  t2 = new Date().getTime();
  SpreadsheetApp.getActiveSpreadsheet().toast('⌛ ' + (t2 - t1)/1000 + 's [' + ts/1000 + 's (' + (ts/1000 / ((t2 - t1)/1000)).toFixed(2) + ') API]', 'Ejecución terminada', -1)
}

/* ¡A dibujar! -> Versión 2: se cambia el color de las celdas de una sola vez */

function cellmandelbrot2() {

 /* Variables generales */

  var celdasX = 100;
  var celdasY = 50;
  var tamanyocelda = 10;
  var maxiter = 20;
  var zoom = 4.0;
  var mihoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var ultimafila = mihoja.getMaxRows();
  var ultimacolumna = mihoja.getMaxColumns();
  var coloresFondo = [];
  
  /* Limpiar lienzo */

  mihoja.clear();
  SpreadsheetApp.flush();
  
  /* Ajustar tamaño hoja > columnas */
  
  if (celdasX > ultimacolumna) {
    mihoja.insertColumns(1, celdasX - ultimacolumna);
  }
  else if (celdasX < ultimacolumna) {
    mihoja.deleteColumns(1, ultimacolumna - celdasX);
  }
  
  /* Ajustar tamaño hoja > filas */
  
  if (celdasY > ultimafila) {
    mihoja.insertRows(1, celdasY - ultimafila);
  }
  else if (celdasY < ultimafila) {
    mihoja.deleteRows(1, ultimafila - celdasY);
  }

   /* Ajustar altura filas y anchura columnas */

  mihoja.setColumnWidths(1, celdasX, tamanyocelda);
  mihoja.setRowHeights(1, celdasY, tamanyocelda);
  
  /* Renombrar hoja para introducir parámetros como sufijo */
  
  var nombre = 'Mandelbrot X:' + celdasX + ' Y:' + celdasY + ' Iter:' + maxiter;
  if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre) == null) {
    mihoja.setName('Mandelbrot X:' + celdasX + ' Y:' + celdasY + ' Iter:' + maxiter);
  }
  
  /* Registrar tiempo inicial */ 

  SpreadsheetApp.getActiveSpreadsheet().toast('Calculando...', 'Ejecución iniciada', -1)
  var t1 = new Date().getTime();
  var t2;
  var ts = 0;
  var ts1;
  var coloresFondoFila = [];
  
  /* Mandelbrot, basado en http://jonisalonen.com/2013/lets-draw-the-mandelbrot-set/ */
   
  for (fil = 1; fil <= celdasY; fil++) {
    coloresFondoFila = [];
    for (col = 1; col <= celdasX; col++) {
      c_re = (col - celdasX/2.0)*zoom/celdasX;
      c_im = (fil - celdasY/2.0)*zoom/celdasX;
      x = 0, y = 0;
      iter = 0;
      while (x*x+y*y <= zoom && iter < maxiter) {
        nueva_x = x*x - y*y + c_re;
        y = 2*x*y + c_im;
        x = nueva_x;
        iter++;
      }
        
      /* Preparar vector fila color de fondo de la celda de acuerdo con un mapa de color definido */

      if (iter < maxiter) {
        coloresFondoFila.push(rgbToHex(255-iter*255/maxiter, 60, iter*255/maxiter));
        }
      else {
        coloresFondoFila.push(rgbToHex(0, 0, 0));
      }
    }

    /* Añadir fila a matriz de colores */
    coloresFondo.push(coloresFondoFila);
  }

  /* Medir tiempo parcial uso servicio SpreadsheetApp */

  ts1 = new Date().getTime();
  mihoja.getRange(1,1,celdasY,celdasX).setBackgrounds(coloresFondo);
  ts += new Date().getTime() - ts1;
  
  var t2 = new Date().getTime();
  SpreadsheetApp.getActiveSpreadsheet().toast('⌛ ' + (t2 - t1)/1000 + 's [' + ts/1000 + 's (' + (ts/1000 / ((t2 - t1)/1000)).toFixed(2) + ') API]', 'Ejecución terminada', -1)
}

/* Convertir RGB (0..255) a color css -> https://stackoverflow.com/a/5624139 */

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
}