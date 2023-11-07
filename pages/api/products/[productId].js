// /api/products/[productId]
import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  const productId = req.query.productId;

  switch(req.method) {
    case 'GET':

      const product = await getProductDetails(productId);
      if (!product) return res.status(500).json({ message: "Error retrieving product" });
      // console.log("PRODUCT DETAILS ----> ", product);
      res.status(200).json(product); // this returns the product and status
      return

    case 'PUT':

      const productDetails = req.body.newProductInfo

      let newPhoto = null
      if(req.body.newPhotoUrl) newPhoto = req.body.newPhotoUrl

      const newProductDetails = await editProductDetails(productId, productDetails, newPhoto);
      if (!newProductDetails) return res.status(500).json({ message: "Error while editing product" });
      // console.log("NEW PRODUCT DETAILS ----> ", newProductDetails);
      res.status(200).json(newProductDetails); // this returns the product and status
      return

    default:
      return
  }
}

export async function getProductDetails(productId) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        photos: {
          select: {
            url: true
          }
        }
      },
    });
    return product;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function editProductDetails(productId, productDetails, newPhotoUrl) {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: productDetails
    });

    if(newPhotoUrl) {
      const updatedPhoto = await prisma.photo.update({
        where: {
          productId: parseInt(productId),
        },
        data: {
          url: newPhotoUrl.url
        },
      })
    }

    return updatedProduct;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
