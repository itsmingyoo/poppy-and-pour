import { prisma } from "../../../server/db/client";

async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      const products = await getAllProducts();

      if (!products)
        return res.status(500).json({ message: "Error retrieving products" });

      // console.log("PRODUCTS ----> ", products);

      res.status(200).json(products);

      break;

    case 'POST':
      console.log('Before json', req.body)
      // const body = await req.body.json();
      const body = req.body
      console.log('After json', body)
      const newProd = await createProduct(body);

      if (!newProd)
        return res.status(500).json({ message: "Error creating product" });

      res.status(200).json(newProd);

      break;

    default:
      break;
  }


}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Something Went Wrong Retreiving Products" });
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createProduct(body) {
  let { productName, category, description, color, price, url } = body;
  console.log(productName, "<<<<<<<<<<<<<<<<<<<<")
  try {
    const newProd = await prisma.product.create(
     {data: {
      productName,
      category,
      price,
      color,
      description
    }}
    );
    const prodImg = await prisma.photo.create( {data:{url, productId : newProd.id}});
    return newProd;
  } catch (error){
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
