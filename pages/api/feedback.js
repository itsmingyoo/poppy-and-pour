// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req, res) {

    if (req.method === 'POST') {
        await createTestInstance(req.body.email, req.body.text, res)
    }

    if(req.method === "GET") {
        const feedback = await getAllTestInstances()

        // if feedback was not given, return an error
        if(!(feedback)) {
            res.status(500).json({ error: 'Something Went Retreiving Feeback' });
        } else { // else, it was successful
            res.status(200)
            res.json(feedback)
        }
    }
}


// if req.method === 'POST', create an instance on the Test table on prisma db
async function createTestInstance(email, text, res) {
    try {
        const instanceOnTestTable = await prisma.test.create( {data: {email: email, text: text}} )
        console.log('INSTANCE CREATED TO test TABLE IN PRISMA DB ---> ', instanceOnTestTable);
        res.status(201).json({ message: 'Feedback created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something Went Wrong Creating Feeback' });
    } finally {
        await prisma.$disconnect();
    }
}


// if req.method === 'GET', query for all instances on test table
export async function getAllTestInstances() {
    try {
        const feedback = await prisma.test.findMany();
        return feedback
    } catch (error) {
        console.error(error);
        return null
    } finally {
        await prisma.$disconnect();
    }
}


export default handler
