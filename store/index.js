const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null,
    limitNum: 0
  }
}

export const mutations = {
  setUser(state, auth) {
    state.user = auth
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', auth)
  }
}

