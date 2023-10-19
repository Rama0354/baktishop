"use client"
import React, { useState } from "react";
import ClientLayout from "../components/ClientLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SelectProvince from "../components/SelectProvince";
import SelectCity from "../components/SelectCity";
import SelectSubdistrict from "../components/SelectSubdistrict";

const products = [
  {
    id: 1,
    product_name: "Kabel Data 1M 6A",
    price: 100000,
    fprice: "Rp 100.000",
    qty: 2,
  },
  {
    id: 2,
    product_name: "Fan Cooler Matrix USB C",
    price: 200000,
    fprice: "Rp 200.000",
    qty: 1,
  },
  {
    id: 3,
    product_name: "Xiaomi Stylus Pen 1448Dpi",
    price: 350000,
    fprice: "Rp 350.000",
    qty: 1,
  },
];

export default function CheckoutPage() {
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedSubdistrictId, setSelectedSubdistrictId] = useState('');
  console.log('provinsi: '+selectedProvinceId+' kota: '+selectedCityId+' kecamatan: '+selectedSubdistrictId)

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
  };
  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
  };
  const handleSubdistrictChange = (subdistrictId: string) => {
    setSelectedSubdistrictId(subdistrictId);
  };
  return (
    <ClientLayout>
      <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
        <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
          <AiOutlineShoppingCart className="text-slate-700 stroke-2 w-6 h-6" />
          <h1 className="py-2 font-semibold text-xl text-slate-700">
            Checkout
          </h1>
        </div>
        <div className="w-full py-3 px-6 flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:1/2 md:w-2/3">
            <table className="w-full text-sm text-left text-gray-500 border border-slate-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Produk
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b ">
                    <td
                      scope="row"
                      className="flex items-center justify-between gap-3 px-6 py-3 text-slate-700"
                    >
                      <div className="w-full">
                        <p className="font-medium text-lg">
                          {product.product_name}
                        </p>
                        <p className="w-max py-1 px-2 font-medium text-xs bg-slate-200 rounded-md">
                          varian
                        </p>
                        <p className="font-semibold text-sm text-amber-500">
                          {product.fprice}
                        </p>
                      </div>
                      <div>
                      <p className="font-medium text-lg">
                          x1
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-slate-700">
                <div className="relative my-3 border-b-2 border-slate-300 bg-slate-200">
                    <h2 className="p-3 font-semibold text-xs uppercase">Data diri</h2>
                </div>
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nama Penerima</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="User" required/>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">No. Telp</label>
                            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0813-0000-0000" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                        </div>
                        <SelectProvince onProvinceChange={handleProvinceChange} />
                        <SelectCity
                          selectedProvinceId={selectedProvinceId}
                          onCityChange={handleCityChange}
                          />
                        <SelectSubdistrict
                          selectedCityId={selectedCityId}
                          selectedProvinceId={selectedProvinceId}
                          onSubdistrictChange={handleSubdistrictChange}
                          />
                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Alamat Lengkap(desa dsb.)</label>
                            <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="menganti, RT 01 RW 01" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="shipping" className="block mb-2 text-sm font-medium text-gray-900">Pilih Pengiriman</label>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input type="radio" id="shipping-jne" name="hosting" value="shipping-jne" className="hidden peer" required/>
                                <label htmlFor="shipping-jne" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">JNE OKE</div>
                                        <div className="w-full">Ext 6 - 8 Apr Rp 50.000</div>
                                    </div>
                                    <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="shipping-jnt" name="hosting" value={"shipping-jnt"} className="hidden peer" required/>
                                <label htmlFor="shipping-jnt" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">J&T Express</div>
                                        <div className="w-full">Ext 6 - 8 Apr Rp 48.000</div>
                                    </div>
                                    <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
          </div>
          <div className="w-full sm:1/2 md:w-1/3 flex flex-col gap-1">
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-sm">Total Sementara</p>
              <p>Rp 850.000</p>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-sm">Potongan Harga</p>
              <p>Rp 0</p>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-base">Jumlah</p>
              <p>4</p>
            </div>
            <div className="flex my-3 justify-between items-center text-slate-700 border-t-2 border-slate-500">
              <p className="font-semibold text-base">Harga Total</p>
              <p>Rp 850.000</p>
            </div>
            <div className="flex gap-3">
              <button className="w-full py-1 px-3 font-semibold bg-purple-500 text-white border-2 border-purple-500 rounded-md">
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}