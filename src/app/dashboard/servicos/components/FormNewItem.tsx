// Imports necessários
import { Button } from "@/components/ui/button";
import { getStatus, getTecnics } from "@/utils/lib";
import { ItemType } from "@/utils/types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FaBox,
  FaBoxArchive,
  FaCarBurst,
  FaCheck,
  FaGear,
  FaGenderless,
  FaN,
  FaTimeline,
} from "react-icons/fa6";
import { FaMouse } from "react-icons/fa";

// Definição do Schema para validação dos dados do formulário
const formSchema = z.object({
  id: z.string().min(1, { message: "O id é obrigatório" }),
  item: z.string().min(1, { message: "O item é obrigatório" }),
  brand: z.string().min(1, { message: "A marca é obrigatória" }),
  model: z.string().min(1, { message: "O modelo é obrigatório" }),
  nSerie: z.string().min(1, { message: "O número de série é obrigatório" }),
  acessories: z.string().optional(),
  useBrand: z.boolean().optional(),
  useBrandValue: z.string().optional(),
  status: z.string().min(1, { message: "O status é obrigatório" }),
  tecnico: z.string().min(1, { message: "O técnico é obrigatório" }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  created_at: z.string().optional(),
});

// Tipo inferido do Schema para os dados do formulário
type createItemFormData = z.infer<typeof formSchema>;

// Componente do formulário
const FormNewItem = ({
  listItems,
  setListItems,
  modeAddNewItem,
  setModeAddNewItem,
  currentItem,
  setCurrentItem,
}: {
  listItems: ItemType[];
  setListItems: any;
  modeAddNewItem: boolean;
  setModeAddNewItem: any;
  currentItem?: ItemType;
  setCurrentItem?: any;
}) => {
  // Estados locais
  const [useBrand, setUseBrand] = React.useState<boolean | undefined>(false);
  const [listTecnics, setListTecnics] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);

  // Função para obter a lista de técnicos
  const getListTecnic = async () => {
    const data = await getTecnics();
    setListTecnics(data);
  };

  // Função para obter a lista de status
  const getListStatus = async () => {
    const data = await getStatus();
    setListStatus(data);
  };

  // Hook useForm para controlar o formulário
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createItemFormData>({
    resolver: zodResolver(formSchema),
  });

  // Função para preencher os valores do formulário quando se edita um item
  const handleSetValues = (currentItem: ItemType) => {
    setValue("item", currentItem.item);
    setValue("brand", currentItem.brand);
    setValue("model", currentItem.model);
    setValue("nSerie", currentItem.nSerie);
    setValue("acessories", currentItem.acessories);
    setValue("useBrand", currentItem.useBrand);
    setValue("useBrandValue", currentItem.useBrandValue);
    setValue("description", currentItem.description);
    setValue("id", currentItem.id);
    setValue("status", currentItem.status);
    setUseBrand(currentItem.useBrand);
  };

  // Efeito para preencher o formulário quando se edita um item ou gera um id aleatório para um novo item
  React.useEffect(() => {
    if (currentItem) {
      getListStatus();
      getListTecnic();
      handleSetValues(currentItem);
    } else {
      const random = Math.floor(Math.random() * 10000);
      setValue("id", random.toString());
      setValue("created_at", new Date().toISOString());
    }
  }, [currentItem]);

  // Função para lidar com a submissão do formulário
  const onSubmit = async (data: createItemFormData) => {
    console.log("data", data);
    console.log(currentItem);
    const validateData = formSchema.safeParse(data);
    if (validateData.success) {
      if (currentItem) {
        const index = listItems.findIndex((item) => item.id === currentItem.id);
        const newListItems: ItemType[] = [...listItems];
        newListItems[index] = validateData.data;
        setListItems(newListItems);
      } else {
        setListItems((prev: ItemType[]) => {
          return [...prev, validateData.data];
        });
      }

      setModeAddNewItem(!modeAddNewItem);
      setCurrentItem(undefined);
    }
  };

  // Retorno do componente com o formulário renderizado
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="item pt-6 space-y-6">
      <input type="text" hidden {...register("id")} />
      <input type="text" hidden {...register("created_at")} />
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-3 flex-1">
          <label htmlFor="item" className="text-slate-300 text-sm ">
            Item
          </label>
          <div className="inputWrapper">
            <span className="text-teal-300">
              <FaBox />
            </span>
            <input
              className="inputC"
              // disabled={disabledUserInputs}
              type="text"
              {...register("item")}
              placeholder="Violão Acustico"
            />
          </div>

          {errors.item && errors.item.message && (
            <span className="subtitle_error">
              {errors.item.message.toString()}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <label htmlFor="brand" className="text-slate-300 text-sm ">
            Marca
          </label>
          <div className="inputWrapper">
            <span className="text-teal-300">
              <FaBoxArchive />
            </span>
            <input
              className="inputC"
              // disabled={disabledUserInputs}
              type="text"
              {...register("brand")}
              placeholder="Yamaha"
            />
          </div>

          {errors.brand && errors.brand.message && (
            <span className="subtitle_error">
              {errors.brand.message.toString()}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <label htmlFor="model" className="text-slate-300 text-sm ">
            Modelo
          </label>
          <div className="inputWrapper">
            <span className="text-teal-300">
              <FaBoxArchive />
            </span>
            <input
              className="inputC"
              // disabled={disabledUserInputs}
              type="text"
              {...register("model")}
              placeholder="EX145"
            />
          </div>

          {errors.model && errors.model.message && (
            <span className="subtitle_error">
              {errors.model.message.toString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-3 flex-1">
          <label htmlFor="nSerie" className="text-slate-300 text-sm ">
            N. Série
          </label>
          <div className="inputWrapper">
            <span className="text-teal-300">
              <FaN />
            </span>
            <input
              className="inputC"
              // disabled={disabledUserInputs}
              type="text"
              {...register("nSerie")}
              placeholder="5a325d47"
            />
          </div>

          {errors.nSerie && errors.nSerie.message && (
            <span className="subtitle_error">
              {errors.nSerie.message.toString()}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 flex-1 w-full">
          <label htmlFor="acessories" className="text-slate-300 text-sm ">
            Acessórios
          </label>
          <div className="inputWrapper">
            <span className="text-teal-300">
              <FaMouse />
            </span>
            <input
              type="text"
              className="inputC"
              {...register("acessories")}
              placeholder="Cabo, capa..."
            />
          </div>
          {errors.acessories && errors.acessories.message && (
            <span className="subtitle_error">
              {errors.acessories.message.toString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 flex-1 self-center">
        <div className="flex  w-full  gap-3">
          <label className="text-slate-300 text-sm" htmlFor="c1">
            Marcas de uso?
          </label>
          <Checkbox.Root
            onCheckedChange={() => setUseBrand(!useBrand)}
            className="CheckboxRoot text-teal-300 bg-slate-900 border border-slate-800 w-4 h-4 text-sm flex justify-center items-center rounded-sm"
            id="c1"
          >
            <Checkbox.Indicator
              {...register("useBrand")}
              className="CheckboxIndicator"
            >
              <FaCheck className="text-xs" />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
        {useBrand && (
          <>
            <div className="inputWrapper">
              <span className="text-teal-300">
                <FaCarBurst />
              </span>
              <input
                type="text"
                className="inputC"
                {...register("useBrandValue")}
                placeholder="Arranhão na lateral..."
              />
            </div>

            <span>
              {errors.useBrand && errors.useBrand.message && (
                <span className="subtitle_error">
                  {errors.useBrand.message.toString()}
                </span>
              )}
            </span>
          </>
        )}
      </div>
      <div className={`flex gap-4 w-full `}>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="gender" className="text-slate-300 text-sm ">
            Técnico Responsável
          </label>
          <div className="selectWrapper">
            <span className="text-teal-300 ">
              <FaGear />
            </span>
            <select
              className="selectC"
              defaultValue={"Tecnico 1"}
              {...register("tecnico", { required: true })}
              onClick={() => getListTecnic()}
            >
              <option className="opacity-40 cursor-not-allowed" value="">
                Selecione
              </option>

              {listTecnics && listTecnics.length > 0
                ? listTecnics.map((item: any) => (
                    <option
                      key={item.id}
                      selected={currentItem?.tecnico === item.name}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="gender" className="text-slate-300 text-sm ">
            Status do Serviço
          </label>
          <div className="selectWrapper">
            <span className="text-teal-300 ">
              <FaTimeline />
            </span>
            <select
              className="selectC"
              onClick={() => getListStatus()}
              {...register("status", { required: true })}
            >
              <option className="opacity-40" value="">
                Selecione
              </option>
              {listStatus && listStatus.length > 0
                ? listStatus.map((item: any) => (
                    <option
                      key={item.id}
                      selected={currentItem?.status === item.label}
                      value={item.label}
                    >
                      {item.label}
                    </option>
                  ))
                : null}
            </select>
          </div>
          {errors.status && errors.status.message && (
            <span className="subtitle_error">
              {errors.status.message.toString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <label htmlFor="description" className="text-slate-300 text-sm">
          Descrição do item
        </label>

        <textarea
          className="w-full h-[150px] p-2 bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-lg"
          id="description"
          placeholder="..."
          {...register("description", { required: true })}
        />
        {errors.description && errors.description.message && (
          <span className="subtitle_error">
            {errors.description.message.toString()}
          </span>
        )}
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
        <Button
          variant="cancel"
          onClick={() => {
            setModeAddNewItem(false);
            setCurrentItem(undefined);
          }}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default FormNewItem;
