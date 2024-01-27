import React from "react";
import type { RootState } from "@/lib/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSort } from "@/lib/redux/slice/filterSlice";

function MyNewFilter() {
  // const { filters, sort, setFilters, setSort, resetAll } = useFilterAndSort();
  const filter = useSelector((state: RootState) => state.filter.filters);
  const sort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();

  const addRatingFilter = (rating: number) => {
    // Buat objek filter sesuai dengan rating yang dipilih
    const newFilter = {
      column: "total_rating", // Sesuaikan dengan kolom yang digunakan dalam data Anda
      text: rating,
      operator: rating < 5 ? ">=" : "=", // Sesuaikan dengan operator yang sesuai
    };
    // setFilters(newFilter);
    dispatch(setFilter(newFilter));
  };

  const setNameFilter = (nameValue: string) => {
    const name = nameValue
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
      .toLowerCase();
    const newFilter = {
      column: "item_gift_slug", // Sesuaikan dengan kolom yang digunakan dalam data Anda
      text: name,
    };
    dispatch(setFilter(newFilter));
    // setFilters(newFilter);
  };

  // Fungsi untuk mengatur nilai stok
  const setStockFilter = (stockValue: string | number) => {
    // Buat objek filter sesuai dengan nilai stok yang dipilih
    const newFilter = {
      column: "item_gift_quantity", // Sesuaikan dengan kolom yang digunakan dalam data Anda
      text: stockValue,
      operator: ">=", // Sesuaikan dengan operator yang sesuai
    };
    dispatch(setFilter(newFilter));
    // setFilters(newFilter);
  };

  // Fungsi untuk mengatur sorting
  const setSorting = (value: string) => {
    const newValue = value.split("-");
    // Buat objek sorting sesuai dengan kolom dan tipe yang dipilih
    const newSort = {
      column: newValue[0], // Sesuaikan dengan kolom yang digunakan dalam data Anda
      type: newValue[1], // Sesuaikan dengan tipe sorting yang sesuai
    };
    dispatch(setSort(newSort));
    // setSort(newSort);
  };

  return (
    <div className="">
      <div className="py-2 flex gap-3">
        <input
          type="text"
          placeholder="Cari Nama"
          className="border-2 border-my-green rounded-md"
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stok"
          className="border-2 border-my-green rounded-md"
          onChange={(e) => setStockFilter(e.target.value)}
        />

        <select
          className="border-2 border-my-green rounded-md"
          onChange={(e) => setSorting(e.target.value)} // Sesuaikan dengan tipe sorting yang sesuai
        >
          <option value={""}>Terbaru</option>
          <option value={"item_gift_slug-asc"}>Nama (A-Z)</option>
          <option value={"item_gift_slug-desc"}>Nama (Z-A)</option>
          <option value={"item_gift_point-asc"}>
            Harga (Terendah ke Tertinggi)
          </option>
          <option value="item_gift_point-desc">
            Harga (Tertinggi ke Terendah)
          </option>
        </select>
      </div>
      <div className="flex gap-2 ">
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen flex object-contain"
          onClick={() => addRatingFilter(0)}
        >
          Bintang 0
        </button>
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen flex object-contain"
          onClick={() => addRatingFilter(1)}
        >
          Bintang 1
        </button>
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen"
          onClick={() => addRatingFilter(2)}
        >
          Bintang 2
        </button>
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen"
          onClick={() => addRatingFilter(3)}
        >
          Bintang 3
        </button>
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen"
          onClick={() => addRatingFilter(4)}
        >
          Bintang 4
        </button>
        <button
          className="py-1 px-2 bg-my-green text-white hover:bg-my-darkgreen"
          onClick={() => addRatingFilter(5)}
        >
          Bintang 5
        </button>
      </div>
    </div>
  );
}

export default MyNewFilter;
