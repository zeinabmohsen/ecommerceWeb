import image1 from './images/product1-a.jpeg'
import image2 from './images/product1-b.jpeg'
import image3 from './images/product1-c.jpeg'

const products = [
    { id: 1, name: 'Category 1', image: '../CellPhone.svg',price:"120$" },
    { id: 2, name: 'Category 2', image: '../CellPhone.svg',price:"120$" },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg',price:"120$" },
    { id: 3, name: 'Category 3', image: '../CellPhone.svg',price:"120$" },];

const images =[
    {
        original:`${image1}`
    },
    {
        original: `${image2}`
    },{
        original:`${image3}`
    }

]

const cartItems = [
    { id: 1, name: 'prod 1', image:`${image1}` ,price: 10.99,quantity: 2,subtotal: 21.98,
},
    { id: 2, name: 'prod 2', image: `${image1}`,price: 7.49,quantity: 3,subtotal: 22.47, },
]
export { products, images ,cartItems};