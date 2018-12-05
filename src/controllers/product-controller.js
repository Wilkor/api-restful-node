const mongoose = require('mongoose')
const Product = mongoose.model('Product');

exports.get = (req, res, next)=>{

    Product.
    find({
        active:true
    },'title price slug').
    then(data =>{
        res.status(200).send(data)   
       }).
        catch(e=>{

            res.status(400).send(e)
        })

}

exports.getBydSlug = (req, res, next)=>{

    Product.
    findOne({
        slug:req.params.slug,
        active:true
    },'title description price slug tags').
    then(data =>{
        res.status(200).send(data)   
       }).
        catch(e=>{

            res.status(400).send(e)
        })

}

exports.getBydId = (req, res, next)=>{

    Product.
    findById(req.params.id,'title description price slug tags').
    then(data =>{
        res.status(200).send(data)   
       }).
        catch(e=>{

            res.status(400).send(e)
        })

}

exports.getBydTag = (req, res, next)=>{

    Product.
    find({
        tags:req.params.tags,
        active:true
    },'title description price slug tags').
    then(data =>{
        res.status(200).send(data)   
       }).
        catch(e=>{

            res.status(400).send(e)
        })

}

exports.post = (req, res, next) => {

    console.log(`teste ${JSON.stringify(req.body)}`)

    var product = new Product(req.body)

    product.save().then(x =>{

        res.status(201).send({ message:'Produto cadastrado com sucesso'})

    }).catch(e=>{

        res.status(400).send({ message:'Falha ao cadastrar o produto',data:e})

    })

   

}


exports.put = (req, res, next) => {

    const id = req.params.id;
    Product.
    findByIdAndUpdate(id,{
   
        $set:{

            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug:req.body.slug
        }

    }).then(x =>{

        console.log("estou aqui")
    
        res.status(200).send({
            message:'Produto atualizado com sucesso'

        })

    }).catch(e =>{
        res.status(400).send({
            message:'Falha ao atualizadar o produto',
            data:e
        })

    })
   

    res.status(200).send({

        id: id,
        item: req.body


    });


}

exports.delete = (req, res, next) => {
   const id = req.body.id

    Product
    .findByIdAndRemove(id)
    .then(x =>{

      res.status(200).send({

          message:'Excluido com sucesso'
      })
    }).catch(e =>{

        res.status(200).send({

            message:'Erro ao excluir um registro',
            data: e

        })

    })



    res.status(200).send(req.body)

}