import CategoryListContainer from "@/components/category/CategoryListContainer";
import ProductListNewContainer from "@/components/products/ProductListNewContainer";
import SliderContainer from "@/components/SliderContainer";
import ProductListBestContainer from "@/components/products/ProductListBestContainer";

export default async function Home() {
  return (
    <div className="container p-3 md:px-6 min-h-screen bg-secondary/25 border border-border">
      <div className="relative flex w-full sm:w-[80vw] md:w-full md:px-12 justify-center mx-auto">
        <SliderContainer />
      </div>
      <CategoryListContainer />
      <div
        id="newcontent"
        className="w-full flex gap-6 text-primary-dark mb-12"
      >
        <div className="w-full">
          {/* main content */}
          <div className="w-full sticky top-14 lg:top-16 z-30 flex items-center justify-between p-3 border-b-2 bg-accent">
            <div className="w-full">
              <p className="font-semibold text-base">Produk Terbaru</p>
            </div>
            <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
          </div>
          <div className="w-full pt-3 pb-12 px-1 sm:px-6">
            <ProductListNewContainer />
          </div>
        </div>
      </div>
      <div
        id="bestsellercontent"
        className="w-full flex gap-6 text-primary-dark mb-12"
      >
        <div className="w-full">
          {/* main content */}
          <div className="w-full sticky top-14 lg:top-16 z-30 flex items-center justify-between p-3 border-b-2 bg-accent">
            <div className="w-full">
              <p className="font-semibold text-base">Produk Terlaris</p>
            </div>
            <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
          </div>
          <div className="w-full pt-3 pb-12 px-1 sm:px-6">
            <ProductListBestContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
