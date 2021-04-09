import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Confirmation = ({ orderInfo, orderError }) => {
  if (orderError) {
    return (
      <div className="confirmation">
        <Typography variant="h5">Error: {orderError}</Typography>
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </div>
    );
  }
  return (
    <div className="confirmation">
      <Typography variant="h5">
        Gracias {orderInfo.customer.firstname} {orderInfo.customer.lastname}{" "}
        por su compra!
      </Typography>
      <Button component={Link} variant="contained" type="button" to="/">
        Seguir comprando
      </Button>
    </div>
  );
};

export default Confirmation;