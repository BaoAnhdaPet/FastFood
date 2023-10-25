import { api } from '~/utils/api';
import ProductCard from './ProductCard';

const Suggest = () => {
    const utils = api.useContext();
    const getAllProductQuery = api.product.getRandomProduct.useQuery({
        limit: 10,
    });

    return (
        <>
            <div className="absolute-center h-full min-h-screen w-full">
                <div className="mt-5 h-full w-[85%]">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Gợi ý cho bạn
                    </h2>

                    <div className="my-8 mx-auto flex h-[80rem] w-full flex-wrap">
                        {getAllProductQuery?.data?.items.map((item, index) => {
                            return <ProductCard key={index} product={item} />;
                        })}
                    </div>

                    <div className="mb-5 flex h-full w-full"></div>
                </div>
            </div>
        </>
    );
};
export default Suggest;
