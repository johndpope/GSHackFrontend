import Vue from 'vue'
import { Ability } from '@casl/ability'
import { removeItem } from './storage-manager'

export const ability = new Ability()

const bus = new Vue()

ability.on('update', ({ rules, ability }) => {
  bus.$emit('ability:update')
})

export const abilityPlugin = (store) => {
  ability.update(store.state.rules)

  return store.subscribe((mutation) => {
    switch (mutation.type) {
    case 'auth/updatePermissions':
      ability.update(mutation.payload)
      break
    case 'auth/destroySession':
      removeItem('rules')
      ability.update([])
      break
    }
  })
}
