import React from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import products from '../products'
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = ({}) => {
    const params = useParams();
    const product = products.find((p)=> params.id === p._id );
    console.log(product);
  return (
    <>
     <Link className='btn btn-light my-3' to="/">Go Back</Link>
     <Row>
       <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
       </Col>
       <Col md={3}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
             <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
        </ListGroup>
       </Col>
     </Row>
    </>
  )
}

export default ProductScreen
