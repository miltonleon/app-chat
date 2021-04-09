import {
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
  } from "@material-ui/core";
  import { ShoppingCart } from "@material-ui/icons";
  import { Link, useLocation } from "react-router-dom";
  
  import "./style.css";
  
  const NavBar = ({ basketItems, totalCost }) => {
    const location = useLocation();
  
    return (
      <>
        <AppBar position="fixed" className="custom-navbar">
          <Container>
            <Toolbar>
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className="custom-title"
                color="inherit"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCV5bAQIPUgpT-2LYCd-xFQkMDoFo8mqfFsw&usqp=CAU"
                  alt="DwinaTech logo"
                  height="25px"
                  className="logo"
                />
              </Typography>
              {location.pathname === "/basket" ? (
                <div className="basket-wrapper">
                  <h2>
                    Total de costo: <strong>{totalCost}</strong>
                  </h2>
                </div>
              ) : (
                <div className="basket-wrapper">
                  <IconButton
                    component={Link}
                    to="/basket"
                    aria-label="Show basket contents"
                    color="inherit"
                  >
                    
                    <Badge badgeContent={basketItems} color="secondary">
                      <ShoppingCart className="custom-basket" />
                    </Badge>
                  </IconButton>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  };
  
  export default NavBar;