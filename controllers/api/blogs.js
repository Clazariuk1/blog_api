const Blog = require('../../models/blog')


// router.get('/', userCtrl.auth, blogsCtrl.indexBlogs)

const indexBlogs = async ( _ , res, next) => {
    try {
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs // store ALL the user's blogs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.post('/', userCtrl.auth, blogsCtrl.createBlog)

const createBlog = async (req, res, next) => {
    try {
        req.body.user = req.user._id // THIS CONNECTS THE USER TO THE NEW BLOG
        const blog = await Blog.create(req.body)
        req.user.blogs.addToSet(blog) // THIS ADDS THE BLOG TO THE USER's ARRAY
        req.user.save() // THIS SAVES THE USER DATA BECAUSE OF ABOVE ACTION
        res.locals.data.blog = blog // THIS ALLOWS US TO RESPOND VIA EVENT LISTENER WITH BLOG. Res.locals is GLOBAL SCOPE by creation, this is why we use it.
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.get('/:id', userCtrl.auth, blogsCtrl.showBlog)

const showBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.put('/:id', userCtrl.auth, blogsCtrl.updateBlog)

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// router.delete('/:id', userCtrl.auth, blogsCtrl.deleteBlog)

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndDelete({_id : req.params.id,  user: req.user._id})
        req.user.blogs.pull(blog)
        req.user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

function jsonBlog (_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs (_, res) {
    res.json(res.locals.data.blogs)
}

module.exports = {
    indexBlogs,
    createBlog,
    showBlog,
    updateBlog,
    deleteBlog,
    jsonBlog,
    jsonBlogs
}
