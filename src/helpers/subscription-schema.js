export default function (resource) {
  let schema = {
    name: '',
    external_id: '',
    access_token: '',
    secret_token: ''
  },
  dictionaries = {
    twitter: {
      name: 'screen_name',
      external_id: 'id_str',
      access_token: 'token',
      secret_token: 'token_secret'
    },
    facebook: {
      external_id: 'id'
    }
  }

  for (let item in schema) {
    try {
      if (resource.data[dictionaries[resource.platform][item] || item]) {
        schema[item] = resource.data[dictionaries[resource.platform][item] || item]
      } else {
        delete schema[item]
      }
    } catch (e) {
      console.error(e)
      continue
    }
  }

  schema.platform = resource.platform
  return schema
}
