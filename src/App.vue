<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class='header'>Index</router-link>
      <span v-if="isLoggedIn" class='header'> | <router-link to="/Secure">Safe zone</router-link></span>
      <span v-if="isLoggedIn" class='header'> | <a @click="logout">Logout</a></span>
      <span v-if="!isLoggedIn" class='header'> | <router-link to="/signin">Sign In</router-link></span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('signin')
          })
    }
  },
  // created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch("logout")
  //       }
  //       throw err;
  //     });
  //   });
  // },
}
</script>

<style>
#app {
  font-family: Optima, serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

header {
  font-size: 30px;
}
</style>
