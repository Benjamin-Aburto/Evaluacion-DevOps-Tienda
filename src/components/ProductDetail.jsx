import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { db } from '../api/fakeDB'; // <-- Eliminar esta línea
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // Para manejar errores de la API
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://tienda-gamer-final.onrender.com/api/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar el detalle del producto');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Fallo la conexión o el producto no existe:", err);
        setError("No se pudo cargar el producto. Revisa la conexión con el Backend y que el ID sea correcto.");
      });
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price.toFixed(2)}</strong></p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Añadir al carrito</button>
      </div>
    </div>
  );
}
