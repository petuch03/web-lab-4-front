<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="firstName">Name</label>
      <div>
        <input id="firstName" type="text" v-model="firstName" required autofocus>
      </div>
      <label for="lastName">Lastname</label>
      <div>
        <input id="lastName" type="text" v-model="lastName" required>
      </div>
      <label for="email" >E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  },
  methods: {
    // async signupUser() {
    //   let userData = {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     password: this.password
    //   };
    //   try {
    //     const {data} = await axios.post(`${server.baseURL}/auth/signup`, userData, {
    //       headers: {'Access-Control-Allow-Origin': 'http://localhost:8080'}
    //     });
    //     helpers.handleToken(data);
    //     await router.push('main');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // navigate() {
    //   router.push({name: "signin"});
    // },
    register: function () {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/secure'))
          .catch(err => console.log(err))
    }
  }
};
</script>

<style scoped>

</style>