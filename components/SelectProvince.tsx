"use client";
import React from "react";

interface MyComponentProps {
  provinceOptions: { province_id: string; province_name: string }[];
  isLoading: boolean;
  error: any;
  onProvinceChange: (provinceId: string) => void;
}

const SelectProvince: React.FC<MyComponentProps> = ({
  provinceOptions,
  isLoading,
  error,
  onProvinceChange,
}) => {
  return (
    <div>
      <label
        htmlFor="province"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Provinsi
      </label>
      <select
        onChange={(e) => onProvinceChange(e.target.value)}
        id="province"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value={""}>Pilih Provinsi</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : provinceOptions ? (
          provinceOptions.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province_name}
            </option>
          ))
        ) : (
          <option>Not Found</option>
        )}
      </select>
    </div>
  );
};

export default SelectProvince;
