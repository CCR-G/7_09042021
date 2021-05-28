<template>
  <div id="app">
    <header>
      <Logo />
      <Menu />
      <Username />
    </header>

    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Logo from "./components/Logo.vue";
  import Menu from "./components/Menu.vue";
  import Username from "./components/Username.vue";
  import router from './router';
  import { getToken } from './helpers/token-getter';
  import { authenticateUser } from './helpers/user-getter';

  @Component({
      components: { Logo, Menu, Username }
    })
  export default class App extends Vue {
    mounted() {
      if(getToken()) {
        authenticateUser()
          .then((user) => {
            this.$store.dispatch('setUser', { username: user.username, email: user.email });
          })
          .catch((err) => {
            this.unauthenticate();
          })
      }
      else {
        this.unauthenticate();
      }
    }

    unauthenticate() {
      this.$store.dispatch('setUser', { username: '', email: '' });
      sessionStorage.clear();
      router.replace("login");
    }
  };
</script>

<style lang="scss">

#app {
  margin: 10px 25px;
  font-family: sans-serif;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-content: middle;
  align-items: stretch;
  justify-content: space-around;
}

h1 {
  font-size: 22px;
  color: orangered;
}

input[type="reset"] {
  border-radius: 7px;
  border: solid orangered 2px;
  padding: 5px 15px;
  background-color: white;
  font-weight: bold;
  color: orangered;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  margin-left: 15px;
}

button, input[type="button"] {
  border-radius: 7px;
  border: solid orangered 2px;
  padding: 5px 15px;
  background-color: orangered;
  font-weight: bold;
  color: white;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  margin-left: 15px;
}

section > form {
  border: 2px lightgray solid;
  padding: 20px;
  display: flex;
  flex-direction: column;

  textarea {
    margin-bottom: 20px;
  }
}

.save-cancel-buttons {
  text-align: right;
  border: none;
  padding: 0;
}

article {
    border: orangered solid 2px;
    border-radius: 20px;
    margin-bottom: 35px;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    header p {
        font-weight: bold;
        margin: 0;
    }

    button {
      margin-left: 0;
    }

    form {
      display: flex;
      justify-content: space-between;
      width: 100%;

      textarea {
        width: 100%;
        background-color: lightgray;
        border: none;
      }

      fieldset {
        border: none;
        padding: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: space-between;
        padding: 0;
        margin-left: 15px;

        button, input[type='reset'] {
          margin: 0;
          width: 100%;
        }

        button {
          margin-top: 10px;
        }
      }
    }

    .comments-section {
      width: 100%;
    }

    .comments-list {
      border-left: orangered 3px solid;
      padding-left: 20px;

      li {
        list-style: none;
        margin: 25px 0;

        > p {
          background-color: lightgray;
          border-radius: 5px;
          padding: 10px;
        }
      }
    }

    .more-comments {
      align-self: flex-end;
    }
}

.show-more-content {
  background: none;
  border: none;
  color: black;
  box-shadow: none;
  padding: 0;
  margin: 0 0 20px 0;
}

</style>
