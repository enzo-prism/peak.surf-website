import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
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
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

export default App;
