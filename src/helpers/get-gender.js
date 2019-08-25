export default function (gender, options = {}) {
  switch (gender) {
    case 'male':
      gender = 'Hombre'
      break;
    case 'female':
      gender = 'Mujer'
      break;
    default:
      gender = 'N/D'
  }

  if (options.lowerCase) {
    gender = gender.toLowerCase()
  }

  return gender
}
