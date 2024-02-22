import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosMore, IoMdMore } from "react-icons/io";
interface Equipment {
  id: number;
  equipamento: string;
  marca: string;
  modelo: string;
}

export interface ServiceOrder {
  id: number;
  client: string;
  contato: string;
  equipamentos: Equipment[];
  status: [
    "Pendente",
    "Em processo",
    "Aguardando",
    "Concluído",
    "Entregue",
    "Cancelado"
  ];
  data_de_entrada: string;
}
const TableService = ({ services }: { services: ServiceOrder[] }) => {
  console.log(services);

  return (
    <div className="w-full overflow-x-auto ">
      {services ? (
        services.length > 0 ? (
          <Table className="w-full min-w-screen-sm overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Item(s)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id + Math.random()}>
                  <TableCell> {service.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span className="whitespace-nowrap text-slate-200 font-bold">
                        {service.client}
                      </span>
                      <span className="whitespace-nowrap text-slate-400 text-xs">
                        {service.contato}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        <span className="whitespace-nowrap text-slate-200 font-bold">
                          {" "}
                          {service.equipamentos[0].equipamento}{" "}
                        </span>
                        <span className="whitespace-nowrap  font-bold text-teal-600">
                          {" "}
                          {service.equipamentos[0].marca}{" "}
                        </span>
                      </div>

                      <div className="flex gap-4 items-center ">
                        <span className="whitespace-nowrap text-slate-400 text-xs">
                          {" "}
                          {service.equipamentos[0].modelo}
                        </span>
                        {service.equipamentos.length > 1 ? (
                          <Badge className="whitespace-nowrap" variant="ghost">
                            + {service.equipamentos.length - 1}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Badge variant="primary" className="block  self-start">
                        {service.status}
                      </Badge>
                      <span className="whitespace-nowrap text-slate-400 text-xs">
                        {" "}
                        {service.data_de_entrada}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-xl">
                      <IoIosMore />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full h-64 flex justify-center items-center">
            <p className="text-slate-300">Nenhum Serviço encontrado</p>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center min-h-72">
          <span>Carregando...</span>
        </div>
      )}
    </div>
  );
};

export default TableService;
