import axios from 'axios';
import type { Degree } from '@/api/types';
//para importar archivos de configuración de TS se usa "import type"

const getDegrees = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  //import es async
  const url = `${baseUrl}/degrees`;
  // const response = await axios.get(url);
  const response = await axios.get<Degree[]>(url);
  //axios puede recibir configuraciones genéricas, por lo que se le creó una, si no se crea, getJobs dirá ":()=>Promise<any>"; sin embargo ahora dirá ":()=>Promise<Job[]>"
  return response.data;
};

export default getDegrees;
