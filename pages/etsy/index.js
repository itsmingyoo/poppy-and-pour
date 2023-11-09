// pages/index.js
import { fetchEtsyData } from '../../lib/etsy'

const EtsyPage = ({ EtsyPage }) => {
    // Use etsyData in your component
    console.log('this is etsydata', etsyData)
}

export async function getServerSideProps() {
    const etsyData = await fetchEtsyData('/application/openapi-ping', {
        /* additional params */
    })

    return {
        props: {
            etsyData,
        },
    }
}

export default EtsyPage
