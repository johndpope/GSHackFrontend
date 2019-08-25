export const getItem = function (key) {
  let ls = window.localStorage

  if (typeof ls != undefined) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (e) {
      return ls.getItem(key)
    }
  } else {
    return null
  }
}

export const setItem = function (key, value) {
  let ls = window.localStorage

  if (typeof ls != undefined) {
    if (typeof value !== 'object') {
      return ls.setItem(key, value)
    } else {
      return ls.setItem(key, JSON.stringify(value))
    }
  } else {
    return null
  }
}

export const removeItem = function (key, value) {
  let ls = window.localStorage

  if (typeof ls != undefined) {
    return ls.removeItem(key)
  } else {
    return null
  }
}

export const clear = function (key, value) {
  let ls = window.localStorage

  if (typeof ls != undefined) {
    return ls.clear()
  } else {
    return null
  }
}
