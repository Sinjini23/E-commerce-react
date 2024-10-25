// Example: Checkout component might look like this
const Checkout = ({ cart }) => {
    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                        <div>
                            <img src={product.images} alt={product.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                            <span>{product.title}</span>
                        </div>
                        <div>
                            <span>Price: ${product.price}</span>
                            <span>Quantity: {product.quantity}</span>
                            
                        </div>
                    </li>
                ))}
            </ul>
            {/* Other checkout details and actions */}
        </div>
    );
};
export default Checkout;  