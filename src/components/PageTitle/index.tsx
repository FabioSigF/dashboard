import { Breadcrumb } from "../../types/global.type";
type Props = {
  title: string;
  breadcrumb: Array<Breadcrumb>;
};

const PageTitle = ({ title, breadcrumb }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-medium">{title}</h1>
      <nav>
        <ol className="flex items-center gap-1">
          {breadcrumb.map((item, key) => (
            <li key={key} className="flex items-center gap-4 text-gray-500">
              <a
                href={item.link}
                className="text-sm font-medium hover:text-primary-300 "
              >
                {item.title}
                {/*Se o item atual não for o último da lista, exibe o > */}
              </a>
              {breadcrumb.length - 1 !==
                breadcrumb.findIndex((i) => i === item) && (
                  <div className="w-2 h-2 bg-gray-300-p rounded-full mr-4 mt-1"></div>
                )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageTitle;
