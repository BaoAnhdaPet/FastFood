import Slider from '~/components/shared/Slider';
import ProductCategory from '~/components/shared/ProductCategory';
import Suggest from '~/components/shared/Suggest';
import NewArrival from '~/components/shared/NewArrival';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Flussho</title>
            </Head>
            <div className="smooth-effect flex h-fit min-h-screen flex-col bg-[#EFEBE4]">
                <div className="absolute-center w-full">
                    <Slider />
                </div>
                <div className="absolute-center h-full">
                    <NewArrival />
                </div>
                <div className="absolute-center h-full">
                    <ProductCategory />
                </div>
                <div className="h-full min-h-screen">
                    <Suggest />
                </div>
            </div>
        </>
    );
};

export default Home;
