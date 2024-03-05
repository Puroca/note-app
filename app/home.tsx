import { auth } from "@/auth";
import WelcomSection from "./components/homeSections/welcom-section";

const HomePage = async () => {
   
    return (
        <div>
            <WelcomSection />
        </div>
    );
}

export default HomePage;