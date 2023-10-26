import ClientLayout from "./components/layouts/ClientLayout";
import CategoryListContainer from "./components/CategoryListContainer";
import GiftListNewContainer from "./components/GiftListNewContainer";
import SliderContainer from "./components/SliderContainer";
import GiftListBestContainer from "./components/GiftListBestContainer";

export default async function Home() {
  return (
    <ClientLayout>
      <div className="container px-3 md:px-9 min-h-screen">
        <div className="w-full bg-purple-100">
          {/* <div className="w-full h-48 md:h-96"></div> */}
          <SliderContainer />
        </div>
        <CategoryListContainer />
        <div id="newcontent" className="w-full flex gap-6 text-slate-700 mb-12">
          <div className="w-full">
            {/* main content */}
            <div className="w-full sticky top-16 lg:top-20 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-slate-200">
              <div className="w-full">
                <p className="font-semibold text-base">Produk Terbaru</p>
              </div>
              <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
            </div>
            <div className="w-full pb-12">
              <GiftListNewContainer />
            </div>
          </div>
        </div>
        <div
          id="bestsellercontent"
          className="w-full flex gap-6 text-slate-700 mb-12"
        >
          <div className="w-full">
            {/* main content */}
            <div className="w-full sticky top-16 lg:top-20 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-slate-200">
              <div className="w-full">
                <p className="font-semibold text-base">Produk Terlaris</p>
              </div>
              <div className="flex justify-end gap-3 items-center w-1/2 md:w-full"></div>
            </div>
            <div className="w-full pb-12">
              <GiftListBestContainer />
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
