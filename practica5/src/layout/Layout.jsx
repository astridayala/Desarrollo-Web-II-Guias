import { Outlet } from "react-router";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Layout() {
    return(
        <>
            <Header />
            <main className="mx-auto container py-16">
                <Outlet /> {/** al definir rutas anitadas, este representa el lugar 
                * donde se renderizaran los componentes de las subrutas */}
            </main>
            <Modal />
        </>
    )
}