import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { validateProduct } from "../../../utils/validateProducts";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { uploadToImgbb } from "../../../services/uploadImage";
import { createProduct, getProductById, updateProduct } from "../../../services/products";

const initialFormState = {
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
};
//Importamos el componente ProductFormUI para que sea reutilizable
//El Form es usado para create y update de productos, ya que agregue la funcion en product.js para contemplar CRUD.

export const ProductFormContainer = () =>  {

    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        ...initialFormState,
        imageUrl: "", // Añadimos imageUrl al estado inicial, para que la toma si el producto ya esta anteriormente creado.
    });
    const { id } = useParams(); // Obtenemos el ID de la URL
    const navigate = useNavigate();

    const isEditMode = !!id; // Si hay un ID, estamos en modo edición. Bandera para usar el form en PUT!!!

    // Si estamos en modo edición, cargamos los datos del producto
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getProductById(id)
                .then(data => {
                    setProduct(data);
                })
                .catch(err => {
                    console.error(err);
                    setErrors({ general: "No se pudo cargar el producto para editar." });
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e)  => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const handleFileChange = (selectedFile) => {
        setFile(selectedFile);
        // Si había un error de archivo, lo limpiamos al seleccionar uno nuevo.
        if (errors.file) {
            const newErrors = { ...errors };
            delete newErrors.file;
            setErrors(newErrors);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // La validación del archivo solo es obligatoria en modo creación
        const productToValidate = { ...product, file: file };
        // En modo edición, no requerimos un nuevo archivo.
        // En modo creación, sí lo requerimos.
        const isFileRequired = !isEditMode;
        const newErrors = validateProduct(productToValidate, isFileRequired);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            let imageUrl = product.imageUrl; // Mantenemos la URL existente por defecto

            // Si se seleccionó un nuevo archivo, lo subimos
            if (file) {
                imageUrl = await uploadToImgbb(file);
            }

            const productData = { ...product, price: Number(product.price), stock: Number(product.stock), imageUrl };

            if (isEditMode) {
                await updateProduct(id, productData);
                alert(`¡El producto "${product.name}" ha sido actualizado con éxito!`);
            } else {
                await createProduct(productData);
                alert(`¡El producto "${product.name}" ha sido creado con éxito!`);
                // La limpieza del formulario solo ocurre en modo creación
                setProduct(initialFormState);
                setFile(null);
                setErrors({});
            }

            // Redirigimos al panel de administración
            navigate('/admin'); 

            } catch (error) {
                setErrors({general: error.message});
            } finally {
                setLoading(false);
            }
    }

    return (
        <ProductFormUI 
            isEditMode={isEditMode}
            product={product} file={file} errors={errors} loading={loading} 
            onChange={handleChange} onFileChange={handleFileChange} onSubmit={handleSubmit}
        />
    )
};
