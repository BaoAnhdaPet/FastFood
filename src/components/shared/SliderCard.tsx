/* eslint-disable @next/next/no-img-element */

interface SliderCardProps {
    image: string;
}

const SliderCard = ({ image }: SliderCardProps) => {
    return (
        <>
            <div className="absolute-center full-size">
                <div className="smooth-effect relative">
                    <img
                        alt=""
                        src={image}
                        className="z-0 h-[89vh] w-screen bg-contain object-cover"
                    />
                </div>
            </div>
        </>
    );
};

export default SliderCard;
