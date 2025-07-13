import type { Route } from "./+types/register";
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

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type TRegister = z.infer<typeof RegisterSchema>;

export default function RegisterPage(){

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
  })

  const { signUp } = auth;
  const navigate = useNavigate()

  async function onSubmit(formData: TRegister) {
    setIsLoading(true)
    signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }, {
      onSuccess: () => {
        navigate("/login")
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
        <p className="text-center text-muted-foreground mt-4">Register to continue</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-[350px] flex flex-col gap-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="John Doe" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <FormLabel className="text-white">Senha</FormLabel>
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password Confirm</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full text-muted-foreground hover:text-primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}