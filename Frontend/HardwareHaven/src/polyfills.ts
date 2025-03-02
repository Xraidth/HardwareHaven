/***************************************************************************************************
 * BROWSER POLYFILLS
 */

// Polyfill para los navegadores que no soportan `Object.entries`
import 'core-js/es/object/entries';

// Polyfill para la funcionalidad `Promise`
import 'core-js/es/promise';

// Polyfill para `fetch`, necesario para soportar peticiones HTTP en navegadores antiguos
import 'whatwg-fetch';

/***************************************************************************************************
 * Zone JS es requerido por Angular
 */
import 'zone.js';  // Esto está necesario para las zonas en Angular

/***************************************************************************************************
 * Application Imports
 */

// Puedes agregar polyfills adicionales para tus necesidades específicas de la aplicación
