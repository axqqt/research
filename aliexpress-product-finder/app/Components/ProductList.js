import ProductCard from './ProductCard';

export default function ProductList({ products, selectedProducts, onAddProduct, onExport }) {
  return (
    <div>
      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.url}
                product={product}
                isSelected={selectedProducts.some(p => p.url === product.url)}
                onAddProduct={onAddProduct}
              />
            ))}
          </div>
          {selectedProducts.length > 0 && (
            <button
              onClick={onExport}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Export Selected Products to CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}