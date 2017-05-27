
    requirejs(['firebase-config'],function (config) {
        const firebaseApp = firebase.initializeApp(config);

        const db = firebaseApp.database();

        const chatComponent = {

            template: ` 
                   <style type="text/css" scoped>
                        .chat{
                            padding:0;
                        
                        }
                        .chat li{
                            margin-bottom:15px;
                            padding-bottom:15px;
                        
                        }
                        .chat li.left .chat-body{
                            margin-left: 100px;
                        }
                        .chat li.right .chat-body{
                            text-align: right;
                            margin-right: 100px;
                        }
                        .panel-body{
                            overflow-y: scroll;
                            height: 400px;
                        }
                   </style> 
                  
                  
                  
                   <div class="panel panel-primary">
                            <div class="panel-heading">Chat</div>
                            <div class="panel-body">
                                <ul class="chat list-unstyled">
                                    <li class="clearfix"
                                        v-bind:class="{left: !isUser(o.email) , right: isUser(o.email)}" v-for=" o in messages">
                                        <span v-bind:class="{'pull-left':!isUser(o.email),'pull-right':isUser(o.email)}">
                                            <!--<img src="http://placehold.it/50/000FFF/fff&text=00" class="img-circle" alt="">-->
                                            <img v-bind:src="o.photo" class="img-circle" alt="">
                                        </span>
                                        <div class="chat-body">
                                            <!--<p>Olá, eu sou fulano, como você está?</p>-->
                                            <strong>{{o.name}}</strong>
                                            <p>{{o.text}}</p>
                                        </div>
                                    </li>
    
                                </ul>
                            </div>
                        
                            <div class="panel-footer">
                                <div class="input-group">
                                    <input type="text" class="form-control input-md" 
                                    placeholder="Digite sua mensagem" v-model="message" @keyup.enter="sendMessage"/>
                                    <span class="input-group-btn">
                                        <button class="btn btn-success btn-md" @click="sendMessage">Enviar</button>
                                    </span>
                                </div>
                            </div>
                   </div>
        `,
            created:function () {
                const roomRef = 'chat/rooms/' + this.$route.params.room;
                this.$bindAsArray('messages',db.ref(roomRef+'/messages'));
            },
            data: function(){
                return{
                    user:{
                        email:localStorage.getItem('email'),
                        name:localStorage.getItem('name'),

                        photo:localStorage.getItem('photo')
                    },
                    message:'',



                };
            },
            methods:{
                isUser:function(email){

                    return this.user.email === email;

                },
                sendMessage:function(){
                    this.$firebaseRefs.messages.push({
                        name: this.user.name,
                        email: this.user.email,
                        text: this.message,
                        photo: this.user.photo
                    });


                }

            }
        };


        const roomsComponent = {
            template :
                `
            <div class="col-md-4" v-for="o in rooms">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        {{o.name}}
                    </div>
                    <div class="panel-body">
                        {{o.description}}
                        <br />
                        <a href="javascript:void(0)" @click="openModal(o)">Entrar</a>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalLoginEmail" tabindex="-1" role="dialog" aria-labelledby="modalLoginEmail">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="exampleModalLabel">Entre com as informações</h4>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <input type="text" class="form-control" name="email" v-model="email" placeholder="E-mail">
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="name" v-model="name" placeholder="Nome">
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" @click="login">Login</button>
                  </div>
                </div>
              </div>
            </div>
         `,
            firebase:{
                rooms: db.ref('chat/rooms')
            },
            data: function(){
                return{
                    rooms:[
                        {id:"001",name:"Php",description:"Entusiastas do PHP"},
                        {id:"002",name:"Java",description:"Developers expert"},
                        {id:"003",name:"C#",description:"Os caras do C#"},
                        {id:"004",name:"C++",description:"Fissurados em Programação"},
                        {id:"005",name:"Js",description:"Olha a web ai "},
                        {id:"006",name:"Vue.Js",description:"Chat dos caras do data-binding"},

                    ],
                    name:'',
                    email:''
                };
            },
            methods:{
                login: function () {
                    localStorage.setItem('name',this.name);
                    localStorage.setItem('email',this.email);
                    localStorage.setItem('user.photo','http://www.gravatar.com/avatar/'+md5(this.email)+'.jpg');
                    $('#modalLoginEmail').modal('hide');


                    this.$route.router.go('/chat/'+this.room.id);
                },
                openModal:function(room){
                    this.room = room;
                    $('#modalLoginEmail').modal('show');
                }
            },
        };
        const rooms=[
            {id:"001",name:"Php",description:"Entusiastas do PHP"},
            {id:"002",name:"Java",description:"Developers expert"},
            {id:"003",name:"C#",description:"Os caras do C#"},
            {id:"004",name:"C++",description:"Fissurados em Programação"},
            {id:"005",name:"Js",description:"Olha a web ai "},
            {id:"006",name:"Vue.Js",description:"Chat dos caras do data-binding"},

        ];

        const roomsCreateComponent = {
            template :
                `<ul>

                <li v-for="o in rooms">
                    {{o.name}}
                </li>
             </ul>  
            
            `,
            firebase:{
                rooms: db.ref('chat/rooms')
            },
            ready: function () {

                const chatRef = db.ref('chat');
                const roomsChildren = chatRef.child('rooms');
                rooms.forEach(function (room) {
                    roomsChildren.child(room.id).set({
                        name: room.name,
                        description: room.description
                    });
                })

            },
            // methods:{
            //     goToChat: function (room) {
            //         this.$route.router.go('/chat/'+room.id);
            //     },
            //     insertData:function(){
            //         this.$firebaseRefs.array.push({
            //             text: this.text
            //         });
            //     }
            // },
        };
        const appComponent = {};
        //Vue.component('my-chat', chatComponent);
        // const chat = new Vue({
        //     el:"#chat",
        //
        //
        // });


        const router = new VueRouter();

        router.map({
            '/chat/:room':{
                component: chatComponent
            },
            '/rooms':{
                component: roomsComponent
            },
            '/rooms-create':{
                component: roomsCreateComponent
            }
        });

        router.start(appComponent,"#app");


    });







    // const chat = new Vue({
    //     el:"#chat",
    //     data:{
    //         user:{
    //             email:'grodrigues.simeao@gmail.com',
    //             name:'Guilherme Rodrigues'
    //         },
    //         chat:{
    //             messages:[
    //                 {
    //                     text:"Ola Sou o fulando, como voce esta?",
    //                     name:"cicrano",
    //                     email:"fulano@hotmail.com",
    //                     photo:"http://placehold.it/50/000FFF/fff&text=00"
    //                 },
    //                 {
    //                     text:"Vaza cara",
    //                     name:"Guilherme",
    //                     email:"grodrigues.simeao@gmail.com",
    //                     photo:"http://placehold.it/50/FFFFFF/fff&text=EU"
    //                 },
    //                 {
    //                     text:"Vaza cara SEu otario , tua mae",
    //                     name:"Guilherme",
    //                     email:"grodrigues.simeao@gmail.com",
    //                     photo:"http://placehold.it/50/FFFFFF/fff&text=EU"
    //                 }
    //             ]
    //         },
    //         methods:{
    //             isUser:function(email){
    //
    //                 return this.user.email == email;
    //
    //             }
    //         }
    //
    //
    //
    //     }
    // });
