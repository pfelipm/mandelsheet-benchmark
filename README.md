# mandelsheet-benchmark

Mide el tiempo empleado en dibujarparte del conjunto de Mandelbrot en una hoja de cálculo de Google, usando dos métodos distintos,  mediante Apps Script:

*   Método 1: `setBackgroundRGB()` es usado en cada celda, aunque no se hace `flush()`.
*   Método 2: Los colores calculados se almacenan en una matriz 2D y se establecen de una vez con un único `setBackgrounds()`.

Al alternar entre los motores de ejecución **Rhino** (viejo) y **V8** (nuevo), se aprecia que aunque el último es más rápido, se ve severamente afectado por el uso de llamadas a los servicios integrados de Google en Apps Script (en este caso `SpreadsheetApp`).

![](https://user-images.githubusercontent.com/12829262/105392309-5aab9a00-5c1b-11eb-9adf-963ecd52949d.png)

![](https://user-images.githubusercontent.com/12829262/105392307-5aab9a00-5c1b-11eb-8a01-7002137149b5.png)

![](https://user-images.githubusercontent.com/12829262/105392308-5aab9a00-5c1b-11eb-873f-c969131ef958.png)

![](https://user-images.githubusercontent.com/12829262/105392310-5aab9a00-5c1b-11eb-872d-7c589f5fd58a.png)
