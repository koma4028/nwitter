import Footer from "components/Footer";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
    return (
        <div className="pageLayout">
            <main>
                {/* 각 페이지 컴포넌트가 표시되어야 할 부분에 Outlet 컴포넌트를 사용한다 */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;