import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import styles from './Checkout.module.css';

export const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!buyer.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!buyer.email.trim()) {
        newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(buyer.email)) {
        newErrors.email = "El formato del email no es válido.";
    }
    if (!buyer.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // En un futuro, aquí se enviaría la orden a MockAPI
      console.log("Orden enviada (simulación):", {
        buyer,
        items: cartItems,
        total: totalPrice,
        date: new Date()
      });

      alert(`¡Gracias por tu compra, ${buyer.name}! Tu pedido ha sido procesado.`);
      clearCart();
      navigate('/');
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1>Finalizar Compra</h1>
      <div className={styles.checkoutContent}>
        <div className={styles.formSection}>
          <h2>Tus Datos</h2>
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre Completo</label>
              <input type="text" id="name" name="name" value={buyer.name} onChange={handleChange} />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={buyer.email} onChange={handleChange} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" id="phone" name="phone" value={buyer.phone} onChange={handleChange} />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>Confirmar Pedido</button>
          </form>
        </div>
        <div className={styles.summarySection}>
          <h2>Resumen del Pedido</h2>
          {cartItems.map(item => (
            <div key={item.product.id} className={styles.summaryItem}>
              <span>{item.product.name} (x{item.quantity})</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className={styles.summaryTotal}>
            <strong>Total:</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};