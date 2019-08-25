import Vue from 'vue'

let allowed_actions = ['create', 'read', 'update', 'delete']

export const parsePermissions = function (Role) {
  if (!Role || !Role.Permissions || !Array.isArray(Role.Permissions)) return

  let permissions = []
  for (let permission of Role.Permissions) {
    try {
      if (!permission.resource) continue
      let actions = []

      for (let key in permission) {
        if (!allowed_actions.includes(key)) continue
        if (permission[key] !== true) continue

        actions.push(key)
      }

      permissions.push({
        subject: permission.resource,
        actions: actions
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  return permissions
}
