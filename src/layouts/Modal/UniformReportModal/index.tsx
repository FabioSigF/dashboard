import Modal from "..";
import { onClose } from "../../../redux/uniformReportModal/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const UniformReportModal = () => {
  const { isOpen, list } = useAppSelector((state) => state.uniformReport);

  const dispatch = useAppDispatch();

  const currentYear = new Date().getFullYear();

  const body = (
    <div className="max-md:overflow-hidden">
      <div className="overflow-x-auto">
        <div className="max-md:min-w-[1000px]">
          <div className="grid grid-cols-10 border-b pb-4">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Produto</div>
            <div className="col-span-2">Cor</div>
            <div className="col-span-1">Tamanho</div>
            <div className="col-span-1">Quantidade</div>
            <div className="col-span-1">V. Unidade</div>
            <div className="col-span-1">V. Total</div>
          </div>

          <ul className=" text-black-600-p text-sm">
            {list &&
              list.map((item, key) => (
                <li className="grid grid-cols-10 py-4 border-b" key={key}>
                  <div className="col-span-1">{key+1}</div>
                  <div className="col-span-3">{item.name}</div>
                  <div className="col-span-2">{item.color}</div>
                  <div className="col-span-1">{item.size}</div>
                  <div className="col-span-1">{item.amount}</div>
                  <div className="col-span-1">
                    R$ {item.price_unit.toFixed(2)}
                  </div>
                  <div className="col-span-1">
                    <span>R$ {item.total_price.toFixed(2)}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const handleOnClose = () => {
    dispatch(onClose());
  };
  return (
    <Modal
      title={`Ranking: Uniformes Mais Vendidos em ${currentYear}`}
      body={body}
      onClose={handleOnClose}
      isOpen={isOpen}
    />
  );
};

export default UniformReportModal;
