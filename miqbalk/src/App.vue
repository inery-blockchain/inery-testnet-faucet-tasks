<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <h1 class="text-center mt-5">Simple Todo DApp using Inery Blockchain</h1>
                        <form @submit.prevent="createTodo">
                            <div class="form-group form-control-lg">
                                <input class="form-control" type="text" v-model="newTodo" placeholder="Add a new task">
                            </div>
                            <center> <button class="btn btn-primary" type="submit">Add Task</button> </center>
                        </form>
                        <div v-if="loading" style="margin-top:10px; margin-bottom:10px;">
                        <center>
                        <button class="btn btn-success" type="button" disabled>
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading Tasks...
                        </button>
                        </center>
                        </div>
                        <div v-else>
                            <div v-if="processing" style="margin-top:10px; margin-bottom:10px;">
                                <center>
                                <div class="spinner-grow text-success" role="status">
                                </div>
                                &nbsp;&nbsp;
                                <div class="spinner-grow text-success" role="status">
                                </div>
                                &nbsp;&nbsp;
                                <div class="spinner-grow text-success" role="status">
                                </div>
                                </center>
                            </div>
                            <div v-else>
                                <div class="table-responsive mt-2" style="height: 300px;">
                                    <table class="table table-hover table-bordered" style="width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="todo in todos" :key="todo.task_id">
                                            <td>{{ todo.task_description }}</td>
                                            <td><button class="btn btn-danger btn-sm" @click="deleteTodo(todo.task_id)">Delete Task</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card text-white bg-success">
                            <div class="card-header">Transaction Info</div>
                            <div class="card-body">
                            <pre class="card-text"><code>{{hash}}</code></pre>
                        </div>
</div>
            </div>
        </div>
    </div>
</template>

<script>

const { Api, JsonRpc, JsSignatureProvider } = require('ineryjs');
const { node_url, node_private_key, node_account } = require('./node_config.js');

const node_actor = node_account
const rpc = new JsonRpc(node_url);
const signatureProvider = new JsSignatureProvider([node_private_key]);
const api = new Api({rpc,signatureProvider})

const addTask = async (data) => {
     try{
         const tx = await api.transact({
                 actions:[
                     {
                         account:node_account,
                         name:"addtask",
                         authorization:[
                             {
                                 actor:node_actor,
                                 permission:"active"
                             }
                         ],
                         data:{ task_description:data }
                     }
                 ]
         },{broadcast:true,sign:true});
         return tx;
     }
     catch(error){
         console.error(error);
     }
};

const completeTask = async (id) => {
     try{
         const tx = await api.transact({
                 actions:[
                     {
                         account:node_account,
                         name:"completetask",
                         authorization:[
                             {
                                 actor:node_actor,
                                 permission:"active"
                             }
                         ],
                         data:{ task_id:id }
                     }
                 ]
         },{broadcast:true,sign:true});
         return tx;
     }
     catch(error){
         console.error(error);
     }
};

const viewTasks = async () => {
     try{
         const tx = await api.transact({
                 actions:[
                     {
                         account:node_account,
                         name:"viewtasks",
                         authorization:[
                             {
                                 actor:node_actor,
                                 permission:"active"
                             }
                         ],
                         data:{}
                     }
                 ]
         },{broadcast:true,sign:true});
        const json = JSON.parse(tx.processed.action_traces[0].console);
        return json.tasks;

     }
     catch(error){
         console.error(error);
     }
};

export default {
  data () {
    return {
      newTodo: '',
      todos: [],
      hash:"Add or Delete a Task !",
      loading : false,
      processing : false
    }
  },
  mounted () {
    this.getTodos()
  },
  methods: {
    async getTodos () {
      this.loading = true
      try {
        this.todos = await viewTasks();
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
    async createTodo () { 
        this.processing = true
        this.hash = "Processing Transaction..."
	try {
        this.hash = JSON.stringify(await addTask(this.newTodo),null,4)
        this.processing = false
        this.newTodo = ''
        this.getTodos()
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTodo (id) {
        this.processing = true
        this.hash = "Processing Transaction..."
	try {
        this.hash = JSON.stringify(await completeTask(id),null,4)
        this.processing = false
        this.getTodos()
      } catch (error) {
        console.error(error)
      } 
    }
  }
}
</script>
