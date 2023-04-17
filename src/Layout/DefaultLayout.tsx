import { FC } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import './styles.scss';

type Props = {
  children?: React.ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div id="dashboard">
      <Sidebar />
      <div className="content w-100 h-100 p-12px">{children}</div>
    </div>
  );
};

export default DefaultLayout;
