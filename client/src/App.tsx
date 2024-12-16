import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CreateSessionPage from "./pages/CreateSessionPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/new-session" component={CreateSessionPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/admin" component={AdminPage} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

export default App;
