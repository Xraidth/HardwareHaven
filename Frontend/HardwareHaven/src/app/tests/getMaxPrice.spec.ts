import { getMaxPrice } from "../shared/functions/functions";


describe('getMaxPrice', () => {
  it('debe devolver el valor del precio más reciente', () => {
    const precios = [
      { fecha: new Date('2025-02-18'), valor: 100 },
      { fecha: new Date('2025-02-19'), valor: 200 },
      { fecha: new Date('2025-02-17'), valor: 150 }
    ];

    const resultado = getMaxPrice(precios);
    expect(resultado).toBe(200);
  });

  it('debe devolver 0 si el array está vacío', () => {
    const precios: any[] = [];
    const resultado = getMaxPrice(precios);
    expect(resultado).toBe(0);
  });

  it('debe devolver 0 si el array contiene un precio con fecha nula', () => {
    const precios = [
      { fecha: null, valor: 100 },
      { fecha: new Date('2025-02-18'), valor: 200 }
    ];

    const resultado = getMaxPrice(precios);
    expect(resultado).toBe(200);
  });

  it('debe devolver 0 si no hay fechas válidas', () => {
    const precios = [
      { fecha: null, valor: 100 },
      { fecha: null, valor: 150 }
    ];

    const resultado = getMaxPrice(precios);
    expect(resultado).toBe(0);
  });
});
