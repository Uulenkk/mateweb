import { GetServerSideProps } from 'next';
import { getProducts, Product } from '../lib/api';
import Image from 'next/image';

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(p => (
        <div key={p.id} className="border rounded p-4 shadow hover:shadow-lg transition">
          <Image
            src={p.image} 
            width={300} 
            height={400} 
            alt={p.name} 
            className="rounded"
          />
          <h2 className="text-lg font-bold mt-2">{p.name}</h2>
          <p className="text-gray-600">${p.price}</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await getProducts();
    return { props: { products } };
  } catch (error) {
    console.error(error);
    return { props: { products: [] } }; // API алдаатай бол хоосон массив
  }
};
