// utils/withSelectCity.tsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function withSelectCity(WrappedComponent:any) {
  const NewComponent = ({selectedProvinceId, ...props }:any)=> {
    const { data, isLoading, error } = useQuery(
      ['city', selectedProvinceId],
      async () => {
        if (selectedProvinceId && selectedProvinceId !== '') {
          const res = await axios.get(`api/getcity?id=${selectedProvinceId}`);
          return res.data.data;
        }
        return [];
      }
    );

    return (
      <WrappedComponent
        city={data}
        isLoading={isLoading}
        error={error}
        selectedProvinceId={selectedProvinceId}
        {...props}
      />
    )
  };
  return NewComponent
}
