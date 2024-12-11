import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <img src="/Transparent.png" alt="Peak Logo" className="h-16 w-auto" />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="login" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <Input
                placeholder="Username"
                className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                {...form.register("username")}
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                {...form.register("password")}
              />
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <Input
                placeholder="Username"
                className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                {...form.register("username")}
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                {...form.register("password")}
              />
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
