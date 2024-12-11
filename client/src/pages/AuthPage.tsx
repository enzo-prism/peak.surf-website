import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FormData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register } = useUser();
  const { toast } = useToast();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (activeTab === "login") {
        await login(data);
      } else {
        await register(data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4"
         style={{
           backgroundImage: `url(https://images.unsplash.com/photo-1518623489648-a173ef7824f3)`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}>
      <Card className="w-full max-w-md bg-black/80 border-primary/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-light">Peak</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  placeholder="Username"
                  {...form.register("username")}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  {...form.register("password")}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  placeholder="Username"
                  {...form.register("username")}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  {...form.register("password")}
                />
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
