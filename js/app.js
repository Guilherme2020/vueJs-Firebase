
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
                            margin-left: 70px;
                        }
                        .chat li.right .chat-body{
                            text-align: right;
                            margin-right: 70px;
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
                                        v-bind:class="{left: !isUser(o.email) , right: isUser(o.email)}" v-for=" o in chat.messages">
                                        <span v-bind:class="{'pull-left':!isUser(o.email),'pull-right':isUser(o.email)}">
                                            <!--<img src="http://placehold.it/50/000FFF/fff&text=00" class="img-circle" alt="">-->
                                            <img v-bind:src=" o.photo " class="img-circle" alt="">
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
                                    <input type="text" class="form-control input-md" placeholder="Digite sua mensagem"/>
                                    <span class="input-group-btn">
                                        <button class="btn btn-success btn-md">Enviar</button>
                                    </span>
                                </div>
                            </div>
                   </div>
        `,
            data: function(){
                return{
                    user:{
                        email:'grodrigues.simeao@gmail.com',
                        name:'Guilherme Rodrigues'
                    },
                    chat:{
                        messages:[
                            {
                                text:"Ola Sou o fulando, como voce esta?",
                                name:"cicrano",
                                email:"fulano@hotmail.com",
                                photo:"http://placehold.it/50/000FFF/fff&text=00"
                            },
                            {
                                text:"Vaza cara",
                                name:"Guilherme",
                                email:"grodrigues.simeao@gmail.com",
                                photo:"http://placehold.it/50/FFFFFF/fff&text=EU"
                            },
                            {
                                text:"Vaza cara SEu otario , tua mae",
                                name:"Guilherme",
                                email:"grodrigues.simeao@gmail.com",
                                photo:"http://placehold.it/50/FFFFFF/fff&text=EU"
                            }
                        ]
                    }
                };
            },
            methods:{
                isUser:function(email){

                    return this.user.email === email;

                }
            }
    };

    Vue.component('my-chat', chatComponent);
    const chat = new Vue({
        el:"#chat",


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
