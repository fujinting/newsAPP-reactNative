module.exports = app => {
    const router = require('express').Router()

    const News = require('../../models/News')

    const Videos = require('../../models/Video')

    const Atlas = require('../../models/Atla')

    const Ads = require('../../models/Ad')

    const Users = require('../../models/User')


    //查询新闻(推荐)
    router.get('/list/news/recommend/page=:page', async (req, res) => {         //列表查询

        const items = await News.find({page:req.params.page}).limit(10)
        
        res.send(items)

    })


    //查询新闻(除推荐外)
    router.get('/list/news/other/category=:category&page=:page', async (req, res) => {         //列表查询

       
        const items = await News.find({categories:req.params.category,page:req.params.page})
        
        res.send(items)

    })


    //查询图集
    router.get('/list/atlas/page=:page', async (req, res) => {         //列表查询

        const items = await Atlas.find({page:req.params.page}).limit(5)

        res.send(items)

    })

    //查询视频(推荐)
    router.get('/list/videos/recommend/page=:page', async (req, res) => {         //列表查询

        const items = await Videos.find({page:req.params.page}).limit(10)
        
        res.send(items)

    })

    //查询视频(除推荐外)
    router.get('/list/videos/other/category=:category&page=:page', async (req, res) => {         //列表查询

       
        const items = await Videos.find({categories:req.params.category,page:req.params.page})
        
        res.send(items)

    })

    
    // 查询轮播图广告
    router.get('/list/ads', async (req, res) => {         

        const items = await Ads.find()

        res.send(items)

    })




    //查询新闻详情
    router.get('/news/detail/:id', async (req, res) => {

        const detail = await News.findById(req.params.id)

        res.send(detail)


    })

    //查询视频详情
    router.get('/videos/detail/:id', async (req, res) => {

        const detail = await Videos.findById(req.params.id)

        res.send(detail)


    })

    //查询图集详情
    router.get('/atlas/detail/:id', async (req, res) => {

        const detail = await Atlas.findById(req.params.id)

        res.send(detail)


    })

     //用户登录
     router.get('/users/login/account=:account&password=:password', async (req, res) => {

        const detail = await Users.findOne({account:req.params.account,password:req.params.password})

        res.send(detail)


    })

    // 获取用户详情
    router.get('/users/detail/:id', async (req, res) => {

        const detail = await Users.findById(req.params.id)

        res.send(detail)


    })




    app.use('/app/api', router)



}