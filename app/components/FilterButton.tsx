"use cliet";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type FilterButtonProps = {
  paramName:string;
  paramValue:string;
  label:string;
}

const FilterButton = ({ paramName, paramValue, label }: FilterButtonProps) => {
  const search = useSearchParams();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(search as any);
    setIsActive(queryParams.get(paramName) === paramValue);
  }, [search, paramName, paramValue]);

  const handleFilterClick = () => {
    const queryParams = new URLSearchParams(search as any);

    if (isActive) {
      queryParams.delete(paramName);
    } else {
      queryParams.set(paramName, paramValue);
    }
    console.log(queryParams);

    // router.push({ search: queryParams.toString() });
  };

  return (
    <button onClick={handleFilterClick} className={isActive ? "active" : ""}>
      {label}
    </button>
  );
};

export default FilterButton;
