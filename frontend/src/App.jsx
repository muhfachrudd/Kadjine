import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ToastProvider from "./context/ToastContext";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#fdf6ee]">
            <main className="container mx-auto px-4 py-6">
              <div className="sticky top-5 z-50 -mx-4 px-4 mb-6">
                <Header />
              </div>
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/order-confirmation/:orderId"
                  element={<OrderConfirmation />}
                />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
