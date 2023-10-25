/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { isRefetch } from '~/atoms/dataAtom';
import ProductForm from '~/components/modal/ProductForm';
import Loader from '~/components/shared/Loader';
import ProductCard from '~/components/shared/ProductCard';
import { api } from '~/utils/api';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

const AdminProduct = () => {
    const [isRf, setIsRf] = useAtom(isRefetch);

    const {
        data: products,
        status,
        refetch,
    } = api.product.getAllProduct.useQuery({ orderByTime: 'desc' });

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;

    let pageCount;

    if (products != undefined) {
        pageCount = Math.ceil(products?.items.length / productPerPage);
    }

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        void refetch();
        setIsRf(false);
    }, [isRf]);

    return (
        <>
            <div className="full-size absolute-center my-16 flex-col">
                <div className="absolute-center my-16 mt-28 font-secondary text-7xl font-bold">
                    Thống kê sản phẩm
                </div>
                <ProductForm type="add" />
                <div className="mt-16 w-5/6">
                    {status === 'loading' ? (
                        <div className="absolute-center min-h-[10rem] w-full">
                            <Loader />
                        </div>
                    ) : (
                        <div className="flex w-full flex-wrap">
                            {products?.items
                                .slice(
                                    pagesVisited,
                                    pagesVisited + productPerPage,
                                )
                                .map((item, index) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="m-2 rounded-2xl p-2"
                                        >
                                            <ProductCard product={item} />

                                            <div className="absolute-center w-full space-x-4">
                                                <EditProduct
                                                    type="edit"
                                                    initialData={item}
                                                />
                                                <DeleteProduct id={item.id} />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'previous_page'}
                    nextLinkClassName={'next_page'}
                    disabledClassName={'pagination_disabled'}
                    activeClassName={'pagination_active'}
                    pageLinkClassName={'page_link'}
                />
            </div>
        </>
    );
};

export default AdminProduct;
