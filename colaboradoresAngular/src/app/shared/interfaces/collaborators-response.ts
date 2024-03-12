import { ResultCollaborators } from "./result-collaborators";

export interface CollaboratorResponseData {
    microservicio?: string;
    endpoint?: string;
    url?: string;
    metodo: string;
    identificacion: string;
    codigoEstatusHttp: string;
    estatusHttp: string;
    codigoEstatus: string;
    descripcion: string;
    tiempoEjecucion: string;
    memoriaConsumida: string;
    resultados: Array<ResultCollaborators>
  }
  