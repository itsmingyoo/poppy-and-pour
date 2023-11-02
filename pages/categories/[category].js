import { useRouter } from "next/router";
import { getCategoryProducts } from "../api/categories/[category]";

function Categories() {
  const router = useRouter();
  const category = router.query.category;
  return (
    <>
      <button onClick={() => getAllCategoryProducts(category)}>
        Categories Specific Pages
      </button>
    </>
  );
}

async function getAllCategoryProducts(category) {
  let products = await fetch(`/api/categories/${category}`);

  products = await products.json();

  console.log("these are products on the frontend", products);

  return products;
}

// export const getStaticProps = async (context) => {
//   let products = await getCategoryProducts(context.params.category);
//   //   if (!products)
//   //     return res
//   //       .status(500)
//   //       .json({ message: "No products of that category found" });
//   //   else {
//   products = await products.json();
//   console.log("this is products in the getstaticprops", products);
//   return {
//     props: { products: products },
//   };
//   //   }
// };

// export async function getStaticPaths(context) {
//   const products = await getCategoryProducts(context.params.category);

//   const paths = products.map((product) => ({
//     params: { category: product.category },
//   }));

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }
export default Categories;
