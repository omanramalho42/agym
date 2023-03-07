import useSWR from 'swr'
import * as api  from '../services/api'

/**
 * O nome "SWR" é derivado de stale-while-revalidate, uma técnica de invalidação 
 * de cache HTTP popularizada pela HTTP RFC 5861. SWR é a estratégia
 *  de primeiro retornar os dados do cache (stale), depois enviar a solicitação 
 * de fetch (revalidate), e finalmente retornar com os dados atualizados.
 */

export const useFetch = () => {
  return {
    getCategories: () => {
      //url, fetcher
      useSWR("/api", async () => {
        const response = await api.getCategories();
        console.log("SWR response", response);
        
        return response;
      });
    }
  }
}