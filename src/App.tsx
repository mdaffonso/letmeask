import { BrowserRouter, Route, Switch } from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext";

import { Toaster } from "react-hot-toast";

import { AdminRoom } from "./pages/AdminRoom";
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room";
import { Unauthorized } from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false} 
      />
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          <Route path="/bad" component={Unauthorized} />
          <Route component={Unauthorized} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
