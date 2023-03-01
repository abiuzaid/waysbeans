import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import DataProduct from "../assets/data/data.json";
import { Link } from "react-router-dom";

function FooterCard() {
  const getProduct = JSON.parse(localStorage.getItem("dataProduct")) || []

  return (
    <>
      <Container className="d-flex my-3 gap-4 row-cols-4" style={{ marginLeft: 180 }}>
        {getProduct.map((item) => (
          <div key={item.id} className="my-3 mb-5" style={{ backgroundColor: "#F7E6DA", width: 241, height: 410 }}>
            <Link className="text-decoration-none" to={`/detail-product/${item.id}`}>
              <Card.Img variant="top" src={item.photo} to="/detail-product" />
              <Card.Body style={{ color: "#613D2B", fontSize: 14 }}>
                <Card.Title className="fw-bold" style={{marginTop: 14, marginLeft: 16, color: "#613D2B"}} >{item.name}</Card.Title>
                <Card.Text>
                  <p style={{ marginTop: "11px", marginLeft: 16, color: "#613D2B" }}>Price: {item.price}</p>
                  <p style={{ marginTop: "-6%", marginLeft: 16, color: "#613D2B" }}>Stock: {item.stok}</p>
                </Card.Text>
              </Card.Body>
            </Link>
          </div>
        ))}
      </Container>
    </>
  );
}

export default FooterCard;
