import "./App.css";

import { Outlet } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="font-open-sans min-h-screen">
      <Toaster richColors={true} position="top-right" />
      <Outlet />
    </main>
  );
}

export default App;
