import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:3000/auth/signin', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        if (err.response) {
                            alert(err.response.data.message)
                        }
                        reject(err)
                    })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:3000/auth/signup', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        if (err.response) {
                            alert(err.response.data.message)
                        }
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        check({commit}, hit) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'http://localhost:3000/hit/check',
                    data: hit,
                    method: 'POST'
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        if (err.response) {
                            alert(err.response.data.message)
                        }
                        reject(err)
                    })
            })
        },
        getAll({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'http://localhost:3000/hit/overview',
                    method: 'GET', headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        if (err.response) {
                            alert(err.response.data.message)
                        }
                        reject(err)
                    })
            })
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})