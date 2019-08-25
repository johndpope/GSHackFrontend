import Vue from 'vue'
import store from '../store/store'

export const validAccess = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = url.match(/([a-z]+)\/(\d+)\/?/)

      if(result){
        let path = result [1]
        let id = result[2]
        console.log(path)

        switch (path) {
          case 'organization':
            return resolve(await organizationBelongs(id))
            break;

          case 'account':
            let a = await accountBelongs(id)
            console.log(a)
            return resolve(a)
            break;

          default:
            return resolve(true)
            break;
        }
      }
      return resolve(true)
    } catch (e) {
      console.error(e)
      reject(new Error('Error validating access'))
    }
  });
};

let accountBelongs = async (id) => {
  let accounts = []

  if(store.state.account.accounts.length) {
    accounts = store.state.account.accounts
  } else {
    try {
      let admin_id = getCurrentUser().admin_id
      let res =  await Vue.request.get(`admin/${admin_id}/accounts`, {params: {}})
      if(res.data.success) {
        accounts = res.data.resource.slice()
      }
    } catch (e) {
      console.error(e)
    }
  }
  console.log(accounts)
  return !!accounts.find(a => { return  a.account_id == id });
};

let organizationBelongs = async (id) => {
  let organizations = []
  
  if(store.state.organization.organizations.length) {
    organizations = store.state.organization.organizations
  } else {
    try {
      let admin_id = getCurrentUser().admin_id
      let res =  await Vue.request.get(`admin/${admin_id}/organizations`, {params: {}})
      if(res.data.success) {
        organizations = res.data.resource.slice()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return !!organizations.find(o => { return o.organization_id == id });
};

let getCurrentUser = () => {
  let user = Vue.prototype.$cookie.get('user')
  if (user) {
    return JSON.parse(user)
  } else {
    this.$router.push({name: 'logout'})
    return null
  }
}
