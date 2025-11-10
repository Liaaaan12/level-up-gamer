import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

// --- Vistas Placeholder (Nuevas) ---
const ProductDetailPage = () => <main className="main-content"><h2>Detalle de Producto</h2><p>Aquí se mostrarán los detalles de un producto específico.</p></main>;
const RegisterPage = () => <main className="main-content"><h2>Registro de Usuario</h2><p>Aquí iría el formulario de registro.</p></main>;
const BlogPage = () => <main className="main-content"><h2>Blog</h2><p>Aquí se mostrarán las entradas del blog.</p></main>;
const BlogDetailPage = () => <main className="main-content"><h2>Detalle del Blog</h2><p>Aquí se mostrará una entrada específica del blog.</p></main>;
const OffersPage = () => <main className="main-content"><h2>Ofertas</h2><p>Aquí se mostrarán los productos en oferta.</p></main>;
const CheckoutPage = () => <main className="main-content"><h2>Checkout</h2><p>Aquí iría el formulario de pago y envío.</p></main>;
const PaymentSuccessPage = () => <main className="main-content"><h2>Pago Correcto</h2><p>Gracias por tu compra.</p></main>;
const PaymentErrorPage = () => <main className="main-content"><h2>Error en el Pago</h2><p>Hubo un problema al procesar tu pago.</p></main>;

// --- Vistas de Admin (Placeholders) ---
const AdminLayout = () => (
  <main className="main-content">
    <h2>Panel de Administración</h2>
    {/* Este layout de admin debería tener su propia navegación lateral */}
    <nav style={{ border: '1px solid #333', padding: '1rem', marginBottom: '1rem' }}>
      <Link to="/admin">Dashboard</Link> | 
      <Link to="/admin/products">Productos</Link> | 
      <Link to="/admin/orders">Órdenes</Link> | 
      <Link to="/admin/users">Usuarios</Link> | 
      <Link to="/admin/categories">Categorías</Link> | 
      <Link to="/admin/reports">Reportes</Link>
    </nav>
    <div style={{ border: '1px solid #222', padding: '1rem' }}>
      <Outlet />
    </div>
  </main>
);
const AdminDashboard = () => <div><h3>Dashboard</h3><p>Resumen de la tienda.</p></div>;
const AdminProductList = () => <div><h3>Gestión de Productos</h3><p>CRUD de productos.</p></div>;
const AdminProductEdit = () => <div><h3>Editar Producto</h3><p>Formulario para editar producto.</p></div>;
const AdminProductNew = () => <div><h3>Nuevo Producto</h3><p>Formulario para nuevo producto.</p></div>;
const AdminOrderList = () => <div><h3>Gestión de Órdenes</h3><p>Listado de órdenes y boletas.</p></div>;
const AdminOrderDetail = () => <div><h3>Detalle de Orden</h3><p>Mostrar boleta.</p></div>;
const AdminUserList = () => <div><h3>Gestión de Usuarios</h3><p>CRUD de usuarios.</p></div>;
const AdminUserEdit = () => <div><h3>Editar Usuario</h3><p>Formulario para editar usuario.</p></div>;
const AdminUserNew = () => <div><h3>Nuevo Usuario</h3><p>Formulario para nuevo usuario.</p></div>;
const AdminUserHistory = () => <div><h3>Historial de Compras</h3><p>Historial del usuario.</p></div>;
const AdminCategoryList = () => <div><h3>Gestión de Categorías</h3><p>CRUD de categorías.</p></div>;
const AdminReports = () => <div><h3>Reportes</h3><p>Reportes de ventas y críticos.</p></div>;


function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavigationBar />

      <Routes>
        {/* Rutas Públicas de la Tienda (Figura 3) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} /> 
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:id" element={<CategoryPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} /> 
        <Route path="/blog/:id" element={<BlogDetailPage />} /> 
        <Route path="/offers" element={<OffersPage />} /> 
        <Route path="/checkout" element={<CheckoutPage />} /> 
        <Route path="/payment/success" element={<PaymentSuccessPage />} /> 
        <Route path="/payment/error" element={<PaymentErrorPage />} /> 

        {/* Rutas de Administración (Figura 10) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/new" element={<AdminProductNew />} />
          <Route path="products/edit/:id" element={<AdminProductEdit />} />
          <Route path="orders" element={<AdminOrderList />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="users/new" element={<AdminUserNew />} />
          <Route path="users/edit/:id" element={<AdminUserEdit />} />
          <Route path="users/history/:id" element={<AdminUserHistory />} />
          <Route path="categories" element={<AdminCategoryList />} />
          <Route path="reports" element={<AdminReports />} />
          {/* El Perfil de admin puede reusar la página de perfil normal */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;