import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import useGetFilmsStore from '../../component/stores/useGetFilmsStore';

const useFetchFilms = (endpoint) => {
    const setFilmsData = useGetFilmsStore((state) => state.setFilmsData);
    const filmsData = useGetFilmsStore((state) => state.filmsData[endpoint]);
  
    const shouldFetch = !filmsData || filmsData.length === 0;
  
    const query = useQuery({
      queryKey: [endpoint],
      queryFn: async () => {
        const response = await axiosInstance.get(`/${endpoint}`);
        setFilmsData(endpoint, response.data); 
        return response.data;
      },
      retry: 1,
      enabled: shouldFetch, 
      initialData: filmsData, 
    });
  
    return {
      data: query.data || filmsData, 
      isLoading: query.isLoading,
      isError: query.isError,
      error: query.error,
    };
  };
export default useFetchFilms;
