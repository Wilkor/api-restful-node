const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const md5 = require('md5');
const envEmail = require('../services/emailservice');
const authService = require('../services/auth-service');

exports.post = (req, res, next) => {

    console.log(`teste ${JSON.stringify(req.body)}`);

    var customer = new Customer({

        usuario:req.body.usuario,
        senha: md5(req.body.senha + global.SALT_KEY),
        email:req.body.email,
        roles:["user"]

    });

    customer.save().then(x =>{

        res.status(201).send({ message:'Cliente cadastrado com sucesso'});

         envEmail.send(

                req.body.email,
                'Seja Bem Vindo',
                global.EMAIL_TMPL.replace('{0}',req.body.usuario)
             
                       )

    }).catch(e=>{

        res.status(400).send({ message:'Falha ao cadastrar o produto',data:e});

    })

   

}

exports.authenticate = async (req, res, next)=>{
    console.log(md5(req.body.senha + global.SALT_KEY));
      
    Customer.findOne({
        email:req.body.email,
        senha: md5(req.body.senha + global.SALT_KEY)
    }).
    then(async data =>{ 

       const token = await authService.generationToken({id:data.id,email:data.email,usuario:data.usuario});

        res.status(200).send({

            token:token,
            data:{
                email:data.email,
                usuario:data.usuario

            }

        })   

       }).
        catch(e=>{

            res.status(400).send(e)
        })

}