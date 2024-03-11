// components/SelectCity.tsx
import React, { useEffect } from "react";

interface SelectCityProps {
  city: any[];
  isLoading: boolean;
  error: any; // Ganti dengan tipe yang sesuai dengan data error
  selectedProvinceId: string; // ID provinsi yang dipilih
  onCityChange: (cityId: string) => void;
}

function SelectCity({
  city,
  isLoading,
  error,
  selectedProvinceId,
  onCityChange,
}: SelectCityProps) {
  return (
    <div>
      <label
        htmlFor="city"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Kota
      </label>
      <select
        id="city"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        disabled={!selectedProvinceId || selectedProvinceId === ""}
        onChange={(e) => onCityChange(e.target.value)}
      >
        <option value={""}>Pilih Kota</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : city ? (
          city.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.type} {city.city_name}
            </option>
          ))
        ) : (
          <option>Not Found</option>
        )}
      </select>
    </div>
  );
}

export default SelectCity;
