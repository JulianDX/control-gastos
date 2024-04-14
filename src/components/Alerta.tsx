type AlertaType = {
  alerta: string;
};

export const Alerta = ({ alerta }: AlertaType) => {
  return <div className="bg-red-600 text-white p-2 text-center font-bold">{alerta}</div>;
};
