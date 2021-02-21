<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm outerContainer">
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-11">
                    <CreateUser @userChanged="userCreate($event)" :seen="seen" :emptyString="emptyString" :userAdded="userAdded"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-11 numberBox">
                    <DisplayBoard :numberOfUsers="numberOfUsers"/>
                </div>
              </div>
            </div>
            <div class="col-md-4 join2">
              <h2>Alita Army let's go!</h2>
              <p>You can support the Alita-Sequel by subscribing to this service. You will be notified
              about the next upcomming Twitter Hashtag event. A few days ahead and right before
              the action starts. </p>
              <h2>Why are we doing this?</h2>
              <p>Trending isn't easy. You need all the Hunter Warriors you can get at the right time. To coordinate that can be 
              quite difficult. We post in advance but it is hard to know how many have been reached. We want
              to get solid numbers of the participants in before we start. Once we have a solid list of Hunter Warriors
              we go into the offensive.</p>
              <p>So come on what are you waiting for?</p>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateUser from './CreateUser.vue'
import DisplayBoard from './DisplayBoard.vue'
import { getNumberUsers, createUser } from '../services/UserService'
export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateUser,
    DisplayBoard,
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0,
          seen: false,
          emptyString: false,
          userAdded: false,
      }
  },
  methods: {
    getNumberUsers() {
      getNumberUsers().then(response => {
        this.users = response
        this.numberOfUsers = this.users;
      })
    },
    userCreate(data) {
      this.seen = true;
      this.emptyString = false;
      this.userAdded = false;

      createUser(data)
      .then((result) => {
        if(result == "empty"){
          this.emptyString = true;
        } else if (result == "enlisted") {
          this.userAdded = "Hunter Warrior enlisted!";
        }
        this.seen = false;
        this.getNumberUsers();
      });
    }
  },
  mounted () {
    this.getNumberUsers();
  }
}
</script>