import React, { useState, useEffect } from "react";
import { menuService } from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { PlusIcon, StarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [categoriesResponse, menuItemsResponse] = await Promise.all([
        menuService.getCategories(),
        menuService.getMenuItems(),
      ]);

      setCategories(categoriesResponse.data);
      setMenuItems(menuItemsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal memuat data menu. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category_id === selectedCategory)
    : menuItems;

  const handleAddToCart = (item) => {
    addToCart(item);
    addToast(`${item.name} ditambahkan ke keranjang`, "success");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  if (loading) {
    return <LoadingSpinner text="Memuat menu..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchData} />;
  }

  return (
    <div className="space-y-8 mt-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-300 mb-4 float">
          Menu Kadjine Coffee
        </h1>
        <p className="text-white/80 text-lg">
          Nikmati kelezatan kopi dan makanan terbaik kami
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
            selectedCategory === null
              ? "glass-card text-white shadow-xl transform scale-105 hover-glow"
              : "glass text-white/80 hover:glass-card hover:text-white"
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
              selectedCategory === category.id
                ? "glass-card text-white shadow-xl transform scale-105 hover-glow"
                : "glass text-white/80 hover:glass-card hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover-glow group"
          >
            <div className="h-40 bg-indigo-600/20 flex items-center justify-center relative overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                  ☕
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-white leading-tight mb-2">
                  {item.name}
                </h3>
                <span className="text-lg font-bold text-emerald-400">
                  {formatPrice(item.price)}
                </span>
              </div>

              <p className="text-white/70 text-xs mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-indigo-300 glass px-3 py-1 rounded-full">
                  {item.category?.name}
                </span>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-xs font-medium hover:scale-105"
                >
                  <PlusIcon className="h-4 w-4" />
                  Tambah
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4 opacity-50">🍽️</div>
          <p className="text-white/60 text-xl">Tidak ada menu yang tersedia</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
