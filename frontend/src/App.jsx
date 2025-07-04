import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ToastProvider from './context/ToastContext'
import Header from './components/Header'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
