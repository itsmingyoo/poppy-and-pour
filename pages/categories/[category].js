import { useRouter } from "next/router";
import { getCategoryProducts } from "../api/categories/[category]";
import { getAllProducts } from "../api/products/index";

function Categories(props) {
  const { products } = props;
  console.log("this is products prop", products);
  return (
    <>
      {/* <button onClick={() => getCategoryProducts(category)}>
        Categories Specific Pages
      </button> */}
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <p>{product.productName}</p>
            <p>{product.category}</p>
          </div>
        ))}
    </>
  );
}

// async function getAllCategoryProducts(category) {
//   let products = await fetch(`/api/categories/${category}`);
//   products = await products.json();
//   console.log("these are products on the frontend", products);
//   return products;
// }

export const getServerSideProps = async (context) => {
  const category = context.params.category;
  let products = await getCategoryProducts(category);
  return {
    props: { products: products },
  };
};

/** getStaticProps and getStaticPaths won't work here currently
 *  because we don't have a table to query for all categories
 *  so we can't put it in the paths
 */
// export async function getStaticPaths(context) {
//   const allProducts = await getAllProducts();
//   const paths = allProducts.map((product) => ({
//     params: { productId: product.id.toString() },
//   }));
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

// export async function getStaticPaths(context) {
//   const category = context.params.category;
//   const products = await getCategoryProducts(category);
//   console.log(products);
//   console.log(params.category);
//   const paths = products.map((product) => ({
//     params: { category: product.category },
//   }));
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export default Categories;
