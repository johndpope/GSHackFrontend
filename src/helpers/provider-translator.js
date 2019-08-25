export default function (platform) {
  switch (platform) {
    case 'messenger':
      return 'facebook'
      break
    case 'twitter':
    case 'facebook':
      return platform
      break
    default:
      return undefined
  }
}
