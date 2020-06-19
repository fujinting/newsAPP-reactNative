module.exports = app => {

    const express = require('express')    //引用express

    const router = express.Router({

        mergeParams: true

    })


    // 创造资源
    router.post('/', async (req, res) => {

        const model = await req.Model.create(req.body)
    
        res.send(model)
    
  })

    //更新资源
    router.put('/:id', async (req, res) => {

        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)

        res.send(model)


    })   

     // 删除资源
    router.delete('/:id', async (req, res) => {

      await req.Model.findByIdAndDelete(req.params.id, req.body)

      res.send({
        success: true
      })

    })

    // 获取资源
    router.get('/', async (req, res) => {       
        const queryOptions = {}

        const items = await req.Model.find().setOptions(queryOptions).limit(100)

        res.send(items)


    })

      // 资源详情
    router.get('/:id', async (req, res) => {

      const model = await req.Model.findById(req.params.id)

      res.send(model)


    })

    

      // 与前端交互大接口
   app.use('/admin/api/rest/:resource', async (req, res, next) => {

    const modelName = require('inflection').classify(req.params.resource)

    req.Model = require(`../../models/${modelName}`)

    next()

  }, router)


   // 图片上传
   const multer = require('multer')
   const upload = multer({ dest: __dirname + '/../../uploads' })
 
   app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
     const file = req.file
     file.url = `http://localhost:3000/uploads/${file.filename}`
     res.send(file)
   })
 

}