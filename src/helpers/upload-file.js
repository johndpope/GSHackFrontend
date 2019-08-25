import { toBase64 } from './file-converter'

export const UploadFile = function (file) {
  return new Promise (async (resolve, reject) => {
    if (!this['helpers/upload_file']) {
      return reject(new Error('No se encontró la función helpers/upload_file'))
    }

    if (!file || !(file instanceof File)) {
      return reject(new Error('Archivo no válido.'))
    }

    let params = {
      file_name: file.name,
      mime: file.type
    }

    try {
      if (file.name.includes('.'))
        params.file_extension = file.name.split('.').slice(-1)
    } catch (e) {
      console.log(e.message)
    }

    try {
      let fileBase64 = await toBase64(file, true)
      params.file = fileBase64
    } catch (e) {
      console.log(e.message)
      return reject(new Error('Error cargando archivo'))
    }

    this['helpers/upload_file']({
      ...params,
      callback: res => {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve(res.resource.url)
        }
      }
    })
  })
}
