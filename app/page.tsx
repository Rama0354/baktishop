import ClientLayout from "./components/layouts/ClientLayout";
import CategoryListContainer from "./components/category/CategoryListContainer";
import GiftListNewContainer from "./components/gifts/GiftListNewContainer";
import SliderContainer from "./components/SliderContainer";
import GiftListBestContainer from "./components/gifts/GiftListBestContainer";

export default async function Home() {
  return (
    <ClientLayout>
      <div className="container px-3 md:px-6 min-h-screen bg-white">
        <div className="relative flex w-full sm:w-[80vw] md:w-[60vw] justify-center mx-auto mt-3">
          <SliderContainer />
        </div>
        <CategoryListContainer />
        <div
          id="newcontent"
          className="w-full flex gap-6 text-primary-dark mb-12"
        >
          <div className="w-full">
            {/* main content */}
            <div className="w-full sticky top-16 lg:top-20 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-primary-dark">
              <div className="w-full">
                <p className="font-semibold text-base">Produk Terbaru</p>
              </div>
              <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
            </div>
            <div className="w-full pb-12 px-1 sm:px-6">
              <GiftListNewContainer />
            </div>
          </div>
        </div>
        <div
          id="bestsellercontent"
          className="w-full flex gap-6 text-primary-dark mb-12"
        >
          <div className="w-full">
            {/* main content */}
            <div className="w-full sticky top-16 lg:top-20 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-primary-dark">
              <div className="w-full">
                <p className="font-semibold text-base">Produk Terlaris</p>
              </div>
              <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
            </div>
            <div className="w-full pb-12 px-1 sm:px-6">
              <GiftListBestContainer />
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
