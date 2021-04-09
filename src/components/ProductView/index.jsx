import { Grid, Button, Container, Typography } from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons";
import { commerce } from "../../lib/commerce";
import Spinner from "../Snipper";
import { useState, useEffect } from "react";
import "./style.css";

const createMarkup = (text) => {
    return { __html: text };
};


const ProductView = ({ addProduct }) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async (id) => {
        const response = await commerce.products.retrieve(id);
        const { name, price, media, quantity, description } = response;
        setProduct({
            id,
            name,
            quantity,
            description,
            src: media.source,
            price: price.formatted_with_symbol,
        });
    };

    useEffect(() => {
        const id = window.location.pathname.split("/");
        fetchProduct(id[2]);
    }, [])

    const handleQuantity = (param) => {
        if (param === "decries" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if (param === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        }
    };
    return (
        <Container className="product-view">
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} className="image-wrapper">
                    <img
                        onLoad={() => {
                            setLoading(false);
                        }}
                        src={product.src}
                        alt={product.name}
                    />
                </Grid>
                <Grid item xs={12} md={4} className="text">
                    <Typography variant="h2">{product.name}</Typography>
                    <Typography
                        variant="p"
                        dangerouslySetInnerHTML={createMarkup(product.description)}
                    />
                    <Typography variant="h3">Precio :{product.price}</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                variant="contained"
                                className="increase-product-quantity"
                                onclick={() => {
                                    handleQuantity("increase");

                                }}
                            >
                                +
                    </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="quantity" variant="h3">
                                Cantidad: {quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                color="secondary"
                                variant="contained"
                                onclick={() => {
                                    handleQuantity("decries");
                                }}
                            >
                                -
                        </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                className="custom-button"
                                onClick={() => {
                                    addProduct(product.id, quantity);
                                }}
                            >
                                <ShoppingCart /> Agregar al carrito
                    </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {loading && <Spinner />}
        </Container>
    );
}

export default ProductView;