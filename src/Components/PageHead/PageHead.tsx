import { FC } from 'react';
import './style.scss';

export interface IAction {
  theme: 'primary' | 'secundary';
  label: string;
  function: () => void;
}

interface IPageHead {
  pageTitle: string;
  actions?: IAction[];
}

const PageHead: FC<IPageHead> = ({ pageTitle, actions }) => {
  return (
    <div className="page-head">
      <h3>{pageTitle}</h3>
      {actions?.map((action) => (
        <button
          className={`btn btn-${action.theme}`}
          onClick={() => action.function()}
          type="submit"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default PageHead;
