"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function withSelectProvince(WrappedComponent:any) {
  const NewComponent = (props:any)=> {
    const { data, isLoading, error } = useQuery(['province'], async () => {
      const response = await axios.get(`api/getprovince`);
      return response.data.data;
    });
    return <WrappedComponent provinceOptions={data} isLoading={isLoading} error={error} {...props} />;
  };
  return NewComponent
}
