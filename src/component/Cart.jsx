import IcDelete from "../assets/image/iconDelete.png";
import IcPlus from "../assets/image/+.png";
import IcMin from "../assets/image/-.png";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

function Cart() {
  const [getCart, setGetCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = () => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    setGetCart(dataCart);

    window.dispatchEvent(new Event("storage"));

    let total = 0;
    let totalQty = 0;

    dataCart.map((item) => {
      totalQty = totalQty + item.qty;
      total = total + item.price * item.qty;
    });
    setTotalQty(totalQty);
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const plusProduct = (product) => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    const findCartIndex = dataCart.findIndex((cartProduct) => cartProduct.id === product.id);
    dataCart[findCartIndex].qty = dataCart[findCartIndex].qty + 1;

    localStorage.setItem("dataCart", JSON.stringify(dataCart));

    fetchCart();
  };

  const minProduct = (product) => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    const findCartIndex = dataCart.findIndex((cartProduct) => cartProduct.id === product.id);
    dataCart[findCartIndex].qty = dataCart[findCartIndex].qty - 1;

    localStorage.setItem("dataCart", JSON.stringify(dataCart));

    fetchCart();
  };

  function deleteCart(id) {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    const newList = dataCart.filter((item) => item.id !== id);
    localStorage.setItem("dataCart", JSON.stringify(newList));
    fetchCart();
  }

  const payCart = () => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    const dataTransaction = JSON.parse(localStorage.getItem("Transaction")) || [];

    const LoginUser = JSON.parse(localStorage.getItem("loginUser"));
    let newTransaction = {
      id: new Date().getTime(),
      date: new Date(),
      cart: dataCart,
      status: "Waiting Approve",
      email: LoginUser.email,
      fullName: LoginUser.fullName,
    };
    if (dataTransaction.length === 0) {
      localStorage.setItem("Transaction", JSON.stringify([newTransaction]));
    } else {
      dataTransaction.push(newTransaction)
      localStorage.setItem("Transaction", JSON.stringify(dataTransaction));
    }
  };

  return (
    <>
      <Container>
        <Row className="custom-margin-top mx-5 responsive-margin-x">
          <h1 className="px-0 product-title">My Cart</h1>
          <p className="px-0 font-size-18px custom-text-primary">Review Your Order</p>
          <Row className="justify-content-between align-items-start px-0">
            <Col xs={12} lg={7}>
              {getCart.map((item) => (
                <Col xs={12} className="py-4 px-0 mb-4 animate__animated animate__slideInLeft" style={{ borderTop: "1px solid #613D2B", borderBottom: "1px solid #613D2B" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap align-items-center">
                      <img src={item.photo} alt={item.name} className="me-3" style={{ width: "7.5rem" }} />
                      <div className="">
                        <h3 className="product-title font-size-18px mb-4"> {item.name} </h3>
                        <div className="d-flex align-items-center">
                          <img src={IcMin} onClick={() => minProduct(item)} alt="Decrease Button" style={{ cursor: "pointer" }} />
                          <span className="font-size-18px custom-text-primar px-3 mx-3 rounded" style={{ backgroundColor: "#F6E6DA" }}>
                            {item.qty}
                          </span>
                          <img src={IcPlus} onClick={() => plusProduct(item)} alt="Increase Button" style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="product-details font-size-18px mb-4">Rp. {item.price} </div>
                      <div className="text-end">
                        <img src={IcDelete} alt="Delete Order" onClick={() => deleteCart(item.id)} style={{ cursor: "pointer" }} />
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Col>
            <Col xs={12} lg={4} className="py-4 px-0 ms-2 animate__animated animate__slideInRight" style={{ borderTop: "1px solid #613D2B" }}>
              <div className="d-flex justify-content-between mb-4 font-size-18px">
                <div className="product-details"> Subtotal </div>
                <div className="product-details"> Rp. {totalPrice} </div>
              </div>
              <div className="d-flex justify-content-between pb-4 font-size-18px" style={{ borderBottom: "1px solid #613D2B" }}>
                <div className="product-details">Qty</div>
                <div className="product-details"> {totalQty} </div>
              </div>
              <div className="d-flex justify-content-between mt-4 font-size-18px">
                <div className="product-details fw-bold">Total</div>
                <div className="product-details fw-bold">Rp. {totalPrice}</div>
              </div>
              <div className="d-flex justify-content-end mt-5">
                <Button variant="primary" onClick={() => payCart()} size="lg" className="custom-btn-primary fw-bold font-size-18px w-75">
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
