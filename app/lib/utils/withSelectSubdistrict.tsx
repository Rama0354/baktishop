// utils/withSelectCity.tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function withSelectSubdistrict(WrappedComponent:any) {
  const NewComponent = ({selectedCityId, selectedProvinceId, ...props }:any)=> {
    const { data, isLoading, error } = useQuery(
      ['Subdistrict', selectedCityId],
      async () => {
        if (selectedProvinceId !== "" || selectedCityId !== '') {
          const res = await axios.get(`api/getsubdistrict?id=${selectedCityId}`);
          return res.data.data;
        }
        return [];
      }
    );

    return (
      <WrappedComponent
        subdistrict={data}
        isLoading={isLoading}
        error={error}
        selectedCityId={selectedCityId}
        selectedProvinceId={selectedProvinceId}
        {...props}
      />
    )
  };
  return NewComponent
}
