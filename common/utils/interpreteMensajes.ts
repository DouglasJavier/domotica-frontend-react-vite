const isHTML = RegExp.prototype.test.bind(/^(<([^>]+)>)$/i);

export const serializeError = (err: unknown) =>
  JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

export const InterpreteMensajes = (mensaje: any): string => {
  try {
    const errorMessage = serializeError(mensaje);

    return (
      errorMessage.mensaje ??
      errorMessage.message ??
      errorMessage.error ??
      "Se completó con exito"
    );
  } catch (e) {
    return isHTML(mensaje) ? "Solicitud erronea 🚨" : `${mensaje}`;
  }
};
