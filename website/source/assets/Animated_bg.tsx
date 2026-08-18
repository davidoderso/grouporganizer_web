import "../components/themeBgAnimated.css";
import Footer from "./Footer";
import { useTheme } from './ThemeContext';


export default function AnimatedBackground() {
    const {gradientColors} = useTheme();

    const backgroundImage = `linear-gradient(135deg, ${gradientColors.join(', ')})`;

    return (
    <>
    <div className='theme-bg-animated' style={{backgroundImage}} />
    <Footer />
    </>);
};