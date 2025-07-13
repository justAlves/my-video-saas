import { Separator } from "@/components/ui/separator";
import type { Route } from "./+types/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type TLogin = z.infer<typeof loginSchema>;

export default function LoginPage(){

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  })

  const { signIn } = auth;
  const navigate = useNavigate()

  async function onSubmit(formData: TLogin) {
    setIsLoading(true)
    signIn.email({
      email: formData.email,
      password: formData.password,
    }, {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/")
        setIsLoading(false)
      },
      onError: (ctx) => {
        if(ctx.error.message.includes("email") || ctx.error.message.includes("password")){
          toast('Email ou Senha inválidos')
        }else{
          toast("Tivemos um erro ao tentar fazer login, tente novamente.")
        }
        setIsLoading(false)
      }
    })
  }

  async function onGoogleSignIn() {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      });
      navigate("/");
    } catch (error) {
      toast("Tivemos um erro ao tentar fazer login com o Google, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem("token");
    
    if (token) {
      navigate("/");
    }
  }, [])

  return (
    <div className="max-h-screen h-screen w-full bg-background flex flex-col items-center justify-center">
      <div className="max-w-[350px] w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Frontend<br/> Boilerplate</h1>
        <p className="text-center text-muted-foreground mt-4">Login to continue</p>
        <Button
          className="w-full mt-16"
          variant="outline"
          size="lg"
          onClick={onGoogleSignIn}
        >
          <img
            src="google-icon.svg"
            alt="Google Logo"
            className="mr-1 size-5"
          />
          Continue with Google
        </Button>
        <Separator className="w-[350px] my-8"/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-[350px] flex flex-col gap-4">
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="your@email.com" type="email" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className="flex justify-end"
              >
                <Button
                  type="button"
                  variant="link"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full text-muted-foreground hover:text-primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't have an account? Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}