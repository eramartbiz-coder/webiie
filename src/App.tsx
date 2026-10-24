import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ToastProvider } from "./components/Toast";
import Home from "./pages/Home";
import { AboutPage, ContactPage, ProcessPage, ServicesPage, WorkPage } from "./pages/Pages";

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="our-work" element={<WorkPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
