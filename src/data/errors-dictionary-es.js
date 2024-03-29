const dictionary = {
  es: {
    messages: {
      _default: (field) => `${field} no es válido.`,
      after: (field, [target, inclusion]) => `The ${field} must be after ${inclusion ? 'or equal to ' : ''}${target}.`,
      alpha_dash: (field) => `The ${field} field may contain alpha-numeric characters as well as dashes and underscores.`,
      alpha_num: (field) => `The ${field} field may only contain alpha-numeric characters.`,
      alpha_spaces: (field) => `The ${field} field may only contain alphabetic characters as well as spaces.`,
      alpha: (field) => `${field} debe contener solo letras.`,
      before: (field, [target, inclusion]) => `The ${field} must be before ${inclusion ? 'or equal to ' : ''}${target}.`,
      between: (field, [min, max]) => `The ${field} field must be between ${min} and ${max}.`,
      confirmed: (field) => `${field} no coincide.`,
      credit_card: (field) => `${field} no es válido.`,
      date_between: (field, [min, max]) => `The ${field} must be between ${min} and ${max}.`,
      date_format: (field, [format]) => `${field} debe ser en formato ${format}.`,
      decimal: (field, [decimals = '*'] = []) => `The ${field} field must be numeric and may contain ${!decimals || decimals === '*' ? '' : decimals} decimal points.`,
      digits: (field, [length]) => `${field} debe ser de máximo ${length} dígitos.`,
      dimensions: (field, [width, height]) => `The ${field} field must be ${width} pixels by ${height} pixels.`,
      email: (field) => `${field} no es válido.`,
      ext: (field) => `The ${field} field must be a valid file.`,
      image: (field) => `The ${field} field must be an image.`,
      included: (field) => `The ${field} field must be a valid value.`,
      integer: (field) => `The ${field} field must be an integer.`,
      ip: (field) => `The ${field} field must be a valid ip address.`,
      length: (field, [length, max]) => {
        if (max) {
          return `The ${field} length must be between ${length} and ${max}.`;
        }
        return `The ${field} length must be ${length}.`;
      },
      max: (field, [length]) => `${field} no puede tener más de ${length} caracteres.`,
      max_value: (field, [max]) => `${field} debe tener ${max} o menos caracteres.`,
      mimes: (field) => `The ${field} field must have a valid file type.`,
      min: (field, [length]) => `${field} debe tener al menos ${length} caracteres.`,
      min_value: (field, [min]) => `The ${field} field must be ${min} or more.`,
      excluded: (field) => `The ${field} field must be a valid value.`,
      numeric: (field) => `${field} debe contener solo números.`,
      regex: (field) => `${field} no es válido.`,
      required: (field) => `${field} es requerido.`,
      size: (field, [size]) => `The ${field} size must be less than ${formatFileSize(size)}.`,
      url: (field) => `The ${field} field is not a valid URL.`
    },
    custom:{
      terms: {
        required: () => 'Debes aceptar los términos y condiciones'
      }
    }
  }
};

module.exports = dictionary
