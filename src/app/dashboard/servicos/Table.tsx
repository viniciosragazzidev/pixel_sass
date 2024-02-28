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
import { ServiceType } from "@/utils/types";
import { IoIosMore, IoMdMore } from "react-icons/io";
import ServiceTriggerButton from "./components/ServiceTrigger";
interface Equipment {
  id: number;
  equipamento: string;
  marca: string;
  modelo: string;
}
type TableServiceType = {
  services: ServiceType[];
  serviceN: any;
  setServiceN: any;
};

const TableService = ({
  services,
  serviceN,
  setServiceN,
}: TableServiceType) => {
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
                        {service.client.name}
                      </span>
                      <span className="whitespace-nowrap text-slate-400 text-xs">
                        {service.client.contact}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        <span className="whitespace-nowrap text-slate-200 font-bold">
                          {" "}
                          {service.items[0].item}{" "}
                        </span>
                        <span className="whitespace-nowrap  font-bold text-teal-600">
                          {" "}
                          {service.items[0].brand}{" "}
                        </span>
                      </div>

                      <div className="flex gap-4 items-center ">
                        <span className="whitespace-nowrap text-slate-400 text-xs">
                          {" "}
                          {service.items[0].model}{" "}
                        </span>
                        {service.items.length > 1 ? (
                          <Badge className="whitespace-nowrap" variant="ghost">
                            + {service.items.length - 1}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Badge variant="primary" className="block  self-start">
                        {service.items[0].status}
                      </Badge>
                      <span className="whitespace-nowrap text-slate-400 text-xs">
                        {" "}
                        {service.created_at}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ServiceTriggerButton
                      serviceN={serviceN}
                      service={service}
                      setServiceN={setServiceN}
                    />
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
