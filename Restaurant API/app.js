const express = require('express')
const categoryRoutes = require('./routes/categoryRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const cartItemRoutes = require('./routes/cartItemRoutes')
const tableReservationRoutes = require('./routes/tableReservationRoutes')
const orderRoutes = require('./routes/orderRoutes')
const app = express()
const port = 3000

app.use(express.json())

app.use('/api/categories' , categoryRoutes)
app.use('/api/menuItems' , menuItemRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/carts' , cartRoutes)
app.use('/api/cartItems' , cartItemRoutes)
app.use('/api/tables' , tableReservationRoutes)
app.use('/api/orders' , orderRoutes)

app.get('/' , (req , res) => {
    res.send('Welcome to my API')
})

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    })
})

// 404 handler - must be last
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.listen(port , () => {
    console.log("The server has started at port " + port)
})

module.exports = app