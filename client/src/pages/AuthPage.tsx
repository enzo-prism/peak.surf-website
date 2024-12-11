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

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, register } = useUser();
  const { toast } = useToast();
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const registerForm = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      password: "",
      phoneNumber: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (activeTab === "login") {
        const { username, password } = data as LoginFormData;
        const result = await login({ username, password });
        if (!result.ok) {
          if (result.message.toLowerCase().includes("username")) {
            loginForm.setError("username", { message: result.message });
          } else if (result.message.toLowerCase().includes("password")) {
            loginForm.setError("password", { message: result.message });
          } else {
            toast({
              title: "Error",
              description: result.message,
              variant: "destructive",
            });
          }
          return;
        }
      } else {
        const formData = data as RegisterFormData;
        if (!formData.phoneNumber) {
          registerForm.setError("phoneNumber", { message: "Phone number is required" });
          return;
        }
        const result = await register(formData);
        if (!result.ok) {
          if (result.message.toLowerCase().includes("username")) {
            registerForm.setError("username", { message: result.message });
          } else if (result.message.toLowerCase().includes("password")) {
            registerForm.setError("password", { message: result.message });
          } else if (result.message.toLowerCase().includes("phone")) {
            registerForm.setError("phoneNumber", { message: result.message });
          } else {
            toast({
              title: "Error",
              description: result.message,
              variant: "destructive",
            });
          }
          return;
        }
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
                  <div className="space-y-1">
                    <Input
                      placeholder="Username"
                      className={`bg-black/50 border-primary/20 placeholder:text-primary/50 ${
                        loginForm.formState.errors.username ? "border-destructive" : ""
                      }`}
                      {...loginForm.register("username", { 
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters"
                        }
                      })}
                    />
                    <FormError message={loginForm.formState.errors.username?.message} />
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="password"
                      placeholder="Password"
                      className={`bg-black/50 border-primary/20 placeholder:text-primary/50 ${
                        loginForm.formState.errors.password ? "border-destructive" : ""
                      }`}
                      {...loginForm.register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    <FormError message={loginForm.formState.errors.password?.message} />
                  </div>
                  <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                  <div className="space-y-1">
                    <Input
                      placeholder="Username"
                      className={`bg-black/50 border-primary/20 placeholder:text-primary/50 ${
                        registerForm.formState.errors.username ? "border-destructive" : ""
                      }`}
                      {...registerForm.register("username", { 
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters"
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message: "Username can only contain letters, numbers, and underscores"
                        }
                      })}
                    />
                    <FormError message={registerForm.formState.errors.username?.message} />
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="password"
                      placeholder="Password"
                      className={`bg-black/50 border-primary/20 placeholder:text-primary/50 ${
                        registerForm.formState.errors.password ? "border-destructive" : ""
                      }`}
                      {...registerForm.register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                          message: "Password must contain at least one letter and one number"
                        }
                      })}
                    />
                    <FormError message={registerForm.formState.errors.password?.message} />
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="tel"
                      placeholder="Phone Number (e.g., 123-456-7890)"
                      className={`bg-black/50 border-primary/20 placeholder:text-primary/50 ${
                        registerForm.formState.errors.phoneNumber ? "border-destructive" : ""
                      }`}
                      {...registerForm.register("phoneNumber", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{3}-?\d{3}-?\d{4}$/,
                          message: "Please enter a valid phone number (e.g., 123-456-7890)"
                        }
                      })}
                    />
                    <FormError message={registerForm.formState.errors.phoneNumber?.message} />
                  </div>
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
