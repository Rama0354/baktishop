import React from "react";

interface SelectSubdistrictProps {
  subdistrict: any[];
  isLoading: boolean;
  error: any; // Ganti dengan tipe yang sesuai dengan data error
  selectedProvinceId: string; // ID Kota yang dipilih
  selectedCityId: string; // ID Kota yang dipilih
  onSubdistrictChange: (subdistrictId: string) => void;
}

function SelectSubdistrict({
  subdistrict,
  isLoading,
  error,
  selectedCityId,
  selectedProvinceId,
  onSubdistrictChange,
}: SelectSubdistrictProps) {
  return (
    <div>
      <label
        htmlFor="subdistrict"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Kecamatan
      </label>
      <select
        id="subdistrict"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        disabled={selectedCityId === "" || selectedProvinceId === ""}
        onChange={(e) => onSubdistrictChange(e.target.value)}
      >
        <option value={""}>Pilih Kecamatan</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : subdistrict ? (
          subdistrict.map((subdistrict) => (
            <option
              key={subdistrict.subdistrict_id}
              value={subdistrict.subdistrict_id}
            >
              {subdistrict.subdistrict_name}
            </option>
          ))
        ) : (
          <option>Not Found</option>
        )}
      </select>
    </div>
  );
}

export default SelectSubdistrict;
