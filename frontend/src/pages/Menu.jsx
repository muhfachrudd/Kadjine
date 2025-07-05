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
    <div className="space-y-6 mt-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#0A400C] mb-3">
          Menu Kadjine Coffee
        </h1>
        <p className="text-[#0A400C]">
          Nikmati kelezatan kopi dan makanan terbaik kami
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
            selectedCategory === null
              ? "bg-black/20 text-black shadow-lg transform scale-105"
              : "bg-black/40 text-black hover:bg-black/10"
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2 rounded-lg transition-all duration-200 font-medium ${
              selectedCategory === category.id
                ? "bg-black/10 text-black shadow-lg transform scale-105"
                : "bg-black/30 text-black hover:bg-black/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#FEFAE0] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-[#B1AB86]"
          >
            <div className="h-32 bg-[#B1AB86]/20 flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[#819067] text-4xl">🍽️</span>
              )}
            </div>

            <div className="p-3">
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-[#0A400C] leading-tight">
                  {item.name}
                </h3>
                <span className="text-sm font-bold text-[#819067]">
                  {formatPrice(item.price)}
                </span>
              </div>

              <p className="text-[#819067] text-xs mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0A400C] bg-[#B1AB86]/30 px-2 py-1 rounded-full">
                  {item.category?.name}
                </span>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#0A400C] text-[#FEFAE0] px-3 py-1.5 rounded-lg hover:bg-[#819067] transition-colors flex items-center gap-1 text-xs"
                >
                  <PlusIcon className="h-3 w-3" />
                  Tambah
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#B1AB86] text-lg">Tidak ada menu yang tersedia</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
