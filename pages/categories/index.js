import { useRouter } from "next/router";

function Categories(props) {
  // grab product
  // find category value
  // userouter to push to categories/[category]
  // categories/[category] will list all products with that same category
  // query for all products with that same category and display it in jsx
  const router = useRouter();
  function handleCategory(category) {
    router.push(`/categories/${category}`);
  }
  return (
    <>
      <button onClick={() => handleCategory("Cups")}>Cups</button>
      <button onClick={() => handleCategory("Plates")}>Plates</button>
      <button onClick={() => handleCategory("Mugs")}>Mugs</button>
      <button onClick={() => handleCategory("Bowls")}>Bowls</button>
    </>
  );
}

export default Categories;
