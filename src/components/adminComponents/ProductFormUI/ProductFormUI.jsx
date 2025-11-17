import styles from './ProductFormUI.module.css';

export const ProductFormUI = ({ isEditMode, product, file, errors, loading, onChange, onFileChange, onSubmit }) => {
  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>{isEditMode ? "Editar Producto" : "Alta de Producto"}</h1>

        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={onChange} required autoComplete="off" />
        </div>
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" value={product.description} onChange={onChange} required autoComplete="off" />
        </div>
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="image">Imagen:</label>
          
          <input key={file ? file.name : 'empty-file'} type="file" id="image" name="image" accept="image/*" onChange={(e) => onFileChange((e.target.files?.[0]) ?? null)} />
        </div>
        {/* La clave de error para el archivo es 'file', no 'image' */}
        {errors.file && <p className={styles.error}>{errors.file}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría:</label>          
          <select id="category" name="category" value={product.category} onChange={onChange} required>
            <option value="">Selecciona una categoría</option>            
            <option value="pasteleria">Dulce</option>
            <option value="salado">Salado</option>
          </select>
        </div>
        {errors.category && <p className={styles.error}>{errors.category}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={onChange} required autoComplete="off" />
        </div>
        {errors.price && <p className={styles.error}>{errors.price}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" name="stock" value={product.stock} onChange={onChange} required autoComplete="off" />
        </div>
        {errors.stock && <p className={styles.error}>{errors.stock}</p>}

        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? <span className={styles.loadingText}>Guardando...</span> : (isEditMode ? "Actualizar" : "Guardar")}
        </button>
      </form>
    </div>
  );
}
