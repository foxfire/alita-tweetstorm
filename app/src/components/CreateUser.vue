<template>
    <div class="container join">
        <div class="row">
            <div class="col-md-12 mrgnbtm">
            <h2>Join the next Hashtag-Trend</h2>
                <form>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Twitter Handle</label>
                            <input type="text" class="form-control" v-model="twitterHandle" name="twitterHandle" id="twitterHandle" aria-describedby="emailHelp" placeholder="@Alita_26691" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-3 buttons">
                            <button type="button" @click='createUser()' class="btn btn-danger">Join!</button>
                        </div>
                        <div class="form-group col-md-3 buttons">
                            <button type="button" @click='removeUser()' class="btn btn-warning">Unlist</button>
                        </div>
                        <div class="form-group col-md-6">
                            <div v-if="seen" class="infoBlock">Checking Data...</div>
                            <div v-if="emptyString" class="infoBlock">Please check your Twitter-Handle/Email!</div>
                            <div v-if="userAdded" class="infoBlock">{{userAdded}}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { removeUser } from '../services/UserService'
export default {
  name: 'CreateUser',
  props: ['seen', 'emptyString', 'userAdded'],
  data() {
    return {
      twitterHandle: '',
      email: '',
    }
  },
  methods: {
      createUser() {
          const payload = {
              twitterHandle: this.twitterHandle,
              email: this.email
          }
          this.$emit('userChanged', payload)
          this.clearForm();
      },
      removeUser() {
          const payload = {
              twitterHandle: this.twitterHandle,
              email: this.email
          }
          this.$emit('userChanged', payload)
          removeUser(payload);
          this.clearForm();
      },
      clearForm() {
          this.twitterHandle = "";
          this.email = "";
      }
  }
}
</script>