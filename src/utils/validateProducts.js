//evaluar campos del form no vacios, minimos, caracteres especiales, rango de precios

export const validateProduct = (product, fileRequired = true) => {
  const errors = {};

  // Validación del nombre
  if (!product.name || !product.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (product.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }

  // Validación del precio
  const price = parseFloat(product.price);
  if (isNaN(price) || price <= 0) {
    errors.price = "El precio debe ser un número mayor a 0";
  }

  // Validación de la descripción
  if (!product.description || !product.description.trim()) {
    errors.description = "La descripción es obligatoria";
  } else if (product.description.trim().length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  // Validación de la categoría
  if (!product.category || product.category.trim() === "") {
    errors.category = "Debes seleccionar una categoría";
  }

  // Validación del archivo (imagen): Importante para el form de ALta/UpDATE!!!
  // La imagen es obligatoria solo si no hay un archivo nuevo (`product.file`)
  // y si la prop fileRequired es verdadera.
  if (fileRequired && !product.file) {
    errors.file = "La imagen es obligatoria";
  }

  return errors;
};