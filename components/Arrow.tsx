import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Arrow = () => {
    return (
        <Link href="/">
            <FontAwesomeIcon
                icon={faArrowRight}
                className="text-black transition-colors duration-300 hover:text-green-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl hover:translate-x-1"
            />
        </Link>
    );
};

export default Arrow;
