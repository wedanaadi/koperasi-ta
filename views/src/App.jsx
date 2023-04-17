import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes";
// import Toast from "./components/Toast/Toast";
import useStore from "./store/useStore";
import React, { Suspense } from "react";
const Toast = React.lazy(() => import("./components/Toast/Toast"));

function App() {
  const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
  });

  const dataToast = useStore((state) => state.setting);

  return (
    <div className="App">
      <Suspense>
        <Toast
          toastList={[
            {
              id: dataToast?.id,
              title: dataToast?.content?.title,
              description: dataToast?.content?.description,
              backgroundColor: dataToast?.content?.backgroundColor,
              icon: dataToast?.content?.icon,
            },
          ]}
          position={dataToast?.position}
          autoDelete={dataToast?.dismiss}
          autoDeleteTime={dataToast?.duration}
        />
      </Suspense>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
