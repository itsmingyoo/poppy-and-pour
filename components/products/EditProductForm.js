import { useState } from "react"
import { useRouter } from "next/router";

function EditProductForm({productId, currentProductDetails}) {

    const router = useRouter()
    const [url, setUrl] = useState(currentProductDetails.photos[0].url);
    const [color, setColor] = useState(currentProductDetails.color);
    const [price, setPrice] = useState(currentProductDetails.price);
    const [category, setCategory] = useState(currentProductDetails.category);
    const [description, setDescription] = useState(currentProductDetails.description);
    const [productName, setProductName] = useState(currentProductDetails.productName);
    const [formErrors, setFormErrors] = useState({});

    const [formVis, setFormVis] = useState(false)

    async function editProductHandler(e) {
        e.preventDefault()

        const errorsObj = {}
        setFormErrors({})

        if(!url) errorsObj.url = 'please provide a url for this product'
        if(!color) errorsObj.color = 'please provide a color for this product'
        if(!price) errorsObj.price = 'please provide a price for this product'
        if(!category) errorsObj.category = 'please provide a category for this product'
        if(!description) errorsObj.description = 'please provide a description for this product'
        if(!productName) errorsObj.productName = 'please provide a name for this product'

        if(Object.keys(errorsObj).length > 0) {
            setFormErrors(errorsObj)
            return
        }

        const newProductInfo = {
            productName,
            category,
            price: Number(price),
            color,
            description,
        }

        const newPhotoUrl = {
            url
        }

        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({newProductInfo, newPhotoUrl}),
            headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok) {
            const newProductData = await response.json()
            setFormVis(false)
            router.push(`/products/${productId}`);
        } else {
            console.log("ERROR WHILE EDITING PRODUCT")
        }

    }

    return (
        <>
            { formVis ? <form onSubmit={editProductHandler}>
                <input type='string' placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                {formErrors.name && <p className="errors">{formErrors.name}</p>}
                <select value={category} onChange={(e) => setCategory(e.target.value === 'Category' ? null : e.target.value)}>
                    <option value={null}>Category</option>
                    <option value={'Mugs'}>Mugs</option>
                    <option value={'Cups'}>Cups</option>
                    <option value={'Plates'}>Plates</option>
                    <option value={'Bowls'}>Bowls</option>
                </select>
                {formErrors.category && <p className="errors">{formErrors.category}</p>}
                <span>$</span><input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                {formErrors.price && <p className="errors">{formErrors.price}</p>}
                <select value={color} onChange={(e) => setColor(e.target.value === 'Color' ? null : e.target.value)}>
                    <option value={null}>Color</option>
                    <option value={'Red'}>Red</option>
                    <option value={'Silver'}>Silver</option>
                    <option value={'Blue'}>Blue</option>
                    <option value={'White'}>White</option>
                </select>
                {formErrors.color && <p className="errors">{formErrors.color}</p>}
                <textarea placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value ? e.target.value : null)} />
                {formErrors.description && <p className="errors">{formErrors.description}</p>}
                <input type='string' placeholder='Add image url....' value={url} onChange={(e) => setUrl(e.target.value)} />
                {formErrors.url && <p className="errors">{formErrors.url}</p>}
                <button type="submit">Submit</button>
            </form> : <button onClick={() => setFormVis(!formVis)}>Edit Product</button> }
            { formVis ? <button onClick={() => setFormVis(!formVis)}>Hide Product Form</button> : null }
        </>
    )
}


export default EditProductForm
