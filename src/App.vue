<template>
  <div id="app">
    <div id="navigation">
      <router-link to="/" class='header'>Index</router-link>
      <span v-if="isLoggedIn" class='header'> | <router-link to="/secure">Safe zone</router-link></span>
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

#navigation {
  padding: 30px;
}

#navigation a {
  font-weight: bold;
  color: #2c3e50;
}

#navigation a.router-link-exact-active {
  color: #42b983;
}

header {
  font-size: 30px;
}
</style>
