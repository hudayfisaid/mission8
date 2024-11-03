//tidak dipakai untuk mission 8, pakai useFetchFilms.js






















import { useState } from 'react';
import {axiosInstance} from '../../lib/axios';
import { useQuery } from '@tanstack/react-query';

const useFetch = (endpoint) => {
   const [data, setData] = useState(null);
   
    const fectDataQuery =  useQuery({
      queryKey: [endpoint],
      queryFn: async () => {
        const response = await axiosInstance.get(`/${endpoint}`);

        setData(response.data);
        return response.data;
      },
      retry: 1,
      
    })
    console.log(fectDataQuery);
  return { data, isLoading : fectDataQuery.isLoading, isError: fectDataQuery.isError, error : fectDataQuery.error };
};

export default useFetch;
