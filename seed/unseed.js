const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

    async function unseedDatabase() {

        try {

            // cart
            await prisma.cart.deleteMany()

            // orders
            await prisma.order.deleteMany()

            // reviews
            await prisma.review.deleteMany()

            // photos
            await prisma.photo.deleteMany()

            // products
            await prisma.product.deleteMany()

            // user
            await prisma.user.deleteMany();

            console.log("UNSEEDED ALL DATA SUCCESS")

        } catch(e) {
            console.log("ERROR WHILE UNSEEDING DATA: ", e)
        } finally {
            await prisma.$disconnect()
        }
}


unseedDatabase()
