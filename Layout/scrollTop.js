import scrolling from '../utils/scrolling'
import { FaArrowUp } from 'react-icons/fa'
import { IconContext } from "react-icons";

const ScrollTop = () => {
    return (
        <button onClick={() => scrolling()} className="top-window">    <IconContext.Provider
            value={{ color: "#eee",  size: 30 }}
        ><FaArrowUp /></IconContext.Provider></button>
    );

}

export default ScrollTop;
