import { UfDTO } from "./uf.dto";

export interface MunicipioDTO {
	id: string;
	codigoIBGE: number;
	nome: string;
	uf: UfDTO;
}