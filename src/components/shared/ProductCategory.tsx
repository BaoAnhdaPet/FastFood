import ProductCategoryCard from './ProductCategoryCard';
import { ProductCategoryItems } from '~/constants';
const ProductCategory = () => {
    return (
        <>
            <div className="absolute-center h-full w-full">
                <div className="my-12 h-full w-[90%]">
                    <div className="my-8 h-[35rem] w-full">
                        <div className="absolute-center h-fit w-full">
                            {ProductCategoryItems.map((item, index) => {
                                return (
                                    <div
                                        className="absolute-center h-full"
                                        key={index}
                                    >
                                        <ProductCategoryCard
                                            productCategory={item}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductCategory;
