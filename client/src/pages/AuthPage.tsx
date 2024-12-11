import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RegisterFormData = {
  username: string;
  password: string;
  phoneNumber: string;
};

type LoginFormData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register } = useUser();
  const { toast } = useToast();
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (activeTab === "login") {
        const { username, password } = data as LoginFormData;
        await login({ username, password });
      } else {
        const formData = data as RegisterFormData;
        if (!formData.phoneNumber) {
          throw new Error("Phone number is required");
        }
        await register(formData);
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
          <img src="/Transparent.png" alt="Peak Logo" className="h-16 w-auto md:h-20 transition-transform hover:scale-105" />
        </div>
        <Card className="bg-black border-primary/20">
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-black/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-black">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-black">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                  <Input
                    placeholder="Username"
                    className="bg-black/50 border-primary/20 placeholder:text-primary/50"
                    {...loginForm.register("username", { required: "Username is required" })}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-black/50 border-primary/20 placeholder:text-primary/50"
                    {...loginForm.register("password", { required: "Password is required" })}
                  />
                  <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                  <Input
                    placeholder="Username"
                    className="bg-black/50 border-primary/20 placeholder:text-primary/50"
                    {...registerForm.register("username", { required: "Username is required" })}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-black/50 border-primary/20 placeholder:text-primary/50"
                    {...registerForm.register("password", { required: "Password is required" })}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-black/50 border-primary/20 placeholder:text-primary/50"
                    {...registerForm.register("phoneNumber", { required: "Phone number is required" })}
                  />
                  <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
