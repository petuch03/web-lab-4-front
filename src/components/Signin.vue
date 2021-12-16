<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Sign in</h2>
      <form class="signin" @submit.prevent="login">
        <label for="email" >E-Mail Address</label>
        <div>
          <input id="email" type="email" v-model="email" required>
        </div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required>
        </div>
        <hr/>
        <button type="submit" style="height: 25px">Login</button>
      </form>
      <small>
        <button class="btn btn-success" v-on:click="navigate()" style="height: 25px">Register</button>
      </small>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
          .then(() => this.$router.push('/secure'))
          .catch(err => console.log(err))
    },
    // async signinUser() {
    //   let userData = {
    //     email: this.email,
    //     password: this.password
    //   };
    //   try {
    //     const {data} = await axios.post(`${server.baseURL}/auth/signin`, userData, {
    //       headers: {'Access-Control-Allow-Origin': 'http://localhost:8080'}
    //     });
    //     helpers.handleToken(data);
    //     await router.push('main');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    //
    navigate() {
      this.$router.push('signup');
    }
  }
};
</script>

<style scoped>

</style>