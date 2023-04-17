import IProduct from '@interfaces/IProduct';
import PageHead, { IAction } from '../../Components/PageHead/PageHead';
import ProductItem from './Components/ProductItem/ProductItem';

const Products = () => {
  const actions: IAction[] = [
    {
      label: 'Adicionar',
      theme: 'primary',
      function: () => console.log('Oláa')
    }
  ];

  const products: IProduct[] = [
    {
      _id: 1,
      categorie: [],
      descripton: 'Descrição 1',
      ingredients: [],
      name: 'Teste 1',
      price: 'R$ 1,00'
    },
    {
      _id: 1,
      categorie: [],
      descripton: 'Descrição 2',
      ingredients: [],
      name: 'Teste 2',
      price: 'R$ 2,00'
    },
    {
      _id: 3,
      categorie: [],
      descripton: 'Descrição 3',
      ingredients: [],
      name: 'Teste 3',
      price: 'R$ 3,00'
    }
  ];

  return (
    <>
      <PageHead pageTitle="Produtos" actions={actions} />
      <ul className="w-100">
        {products.map((product) => (
          <ProductItem {...product} />
        ))}
      </ul>
    </>
  );
};

export default Products;
