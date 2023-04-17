import { FC } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import './style.scss';
import IProduct from '@interfaces/IProduct';

const ProductItem: FC<IProduct> = (props) => {
  const { _id, categorie, descripton, name, ingredients, price } = props;

  return (
    <li className="w-100 product-item">
      <span>#{_id}</span>
      <span>{name}</span>
      <span>{descripton}</span>
      <span>{price}</span>
      <AiOutlineEdit />
      <BiTrashAlt />
    </li>
  );
};

export default ProductItem;
