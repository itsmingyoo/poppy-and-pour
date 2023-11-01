import { prisma } from '../server/db/client'


// seeding users
await prisma.user.createMany({
    data: [
        { firstName: 'Bob', lastName: 'Jones', username: 'BobJones', hashedPassword: 'password', email: 'bobjones@gmail.com', isAdmin: false, isBanned: false },
        { firstName: 'Alice', lastName: 'Smith', username: 'AliceSmith', hashedPassword: 'password', email: 'alicesmith@gmail.com', isAdmin: false, isBanned: false },
        { firstName: 'Charlie', lastName: 'Brown', username: 'CharlieBrown', hashedPassword: 'password', email: 'charliebrown@gmail.com', isAdmin: false, isBanned: false },
        { firstName: 'David', lastName: 'Johnson', username: 'DavidJohnson', hashedPassword: 'password', email: 'davidjohnson@gmail.com', isAdmin: false, isBanned: false },
    ],
    skipDuplicates: true, // Skip 'Bobo'
})


// products
await prisma.product.createMany({
    data: [
        {category: 'Cups', productName: 'DoubleGlubGlub', price: 100, color: 'red', description: 'this is a nice product'},
        {category: 'Plates', productName: 'SilverShinePlate', price: 75, color: 'silver', description: 'Elegant silver plate' },
        {category: 'Mugs', productName: 'MugMaster', price: 15, color: 'blue', description: 'Perfect for your morning coffee' },
        {category: 'Bowls', productName: 'SuperBowl', price: 50, color: 'white', description: 'Versatile serving bowl' },
    ],
    skipDuplicates: true
})


// photos
await prisma.photo.createMany({
    data: [
        {url: 'https://example.png', productId: 1},
        {url: 'https://image1.png', productId: 2},
        {url: 'https://image2.png', productId: 3},
        {url: 'https://image3.png', productId: 4},
    ],
    skipDuplicates: true
})


// reviews
await prisma.review.createMany({
    data: [
        {review: 'yeah great product yeah uhhuh', rating: 4, userId: 1, productId: 1},
        {review: 'Awesome product, highly recommended!', rating: 5, userId: 2, productId: 2 },
        {review: 'Good value for the price', rating: 3, userId: 3, productId: 3 },
        {review: 'Could be better, not very satisfied', rating: 2, userId: 4, productId: 4 },
    ],
    skipDuplicates: true
})


// order
await prisma.order.createMany({
    data: [
        {
            userId: 2,
            productId: 2,
            batchId: 'uuid124',
            quantity: 3,
            orderDate: '10/24/23',
            trackingNumber: '2345678901',
            status: 'PROCESSING',
            total: 45
        },
        {
            userId: 3,
            productId: 3,
            batchId: 'uuid125',
            quantity: 2,
            orderDate: '10/25/23',
            trackingNumber: '3456789012',
            status: 'DELIVERING',
            total: 30
        },
        {
            userId: 4,
            productId: 4,
            batchId: 'uuid126',
            quantity: 1,
            orderDate: '10/26/23',
            trackingNumber: '4567890123',
            status: 'COMPLETED',
            total: 15
        },
    ],
    skipDuplicates: true
})


// cart
await prisma.cart.createMany({
    data: [
        {
            userId: 1,
            products: '[1, 1, 2, 3, 4]',
            total: 146
        },
        {
            userId: 2,
            products: '[1, 3]',
            total: 115
        },
        {
            userId: 3,
            products: '[2, 4]',
            total: 90
        },
        {
            userId: 4,
            products: '[1, 2, 3]',
            total: 125
        },
    ],
    skipDuplicates: true
})
