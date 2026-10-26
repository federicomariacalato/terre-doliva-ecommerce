import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Navbar } from "@/components/Navbar";
import { useNavigate, useLocation } from "react-router";

const signUpFormSchema = z
  .object({
    email: z.string().email("Email"),
    password: z.string().min(6, "Password"),
    confirmPassword: z.string().min(6, "Conferma password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Le password non corrispondono",
    path: ["confirmPassword"],
  });

const loginFormSchema = z.object({
  email: z.string().email("Email"),
  password: z.string().min(6, "Password"),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export function Auth() {
  const [mode, setMode] = useState<"login" | "sign up">("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignUpSubmit = async (data: SignUpFormValues) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error("Credenziali non valide!");
      }

      navigate(location.state?.from ?? "/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Si è verificato un errore imprevisto");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error("Credenziali sbagliate!");
      }

      navigate(location.state?.from ?? "/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Si è verificato un errore imprevisto");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar theme="dark" />
      <div className="relative min-h-screen bg-deep">
        <div className="flex items-center justify-center min-h-screen py-40 px-6">
          <div className="w-full max-w-md">
          <div
            role="alert"
            className={
              errorMessage
                ? "flex items-start gap-3 bg-[#5c2626] text-ground rounded-md shadow-sm px-4 py-3.5 mb-6"
                : ""
            }
          >
            {errorMessage && (
              <>
                <AlertCircle
                  size={20}
                  className="text-[#d97757] shrink-0 mt-0.5"
                />
                <span className="text-sm">{errorMessage}</span>
              </>
            )}
          </div>
          <Card className="bg-ground shadow-none ring-0 py-6 md:py-8">
            <CardHeader className="px-6 md:px-8 pb-2">
              <CardTitle className="font-serif text-4xl font-normal tracking-[-0.02em] leading-none text-ink">
                {mode === "login" ? "Accedi" : "Registrati"}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 md:px-8">
              {mode === "login" ? (
                <>
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-ink">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="mario@esempio.it"
                                type="email"
                                className="bg-white border-line"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-ink">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type="password"
                                className="bg-white border-line"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-deep text-ground hover:bg-oil h-12 font-sans text-[13px] uppercase tracking-[0.14em] font-medium rounded-md transition-colors cursor-pointer mt-2"
                      >
                        {isSubmitting ? "Accesso in corso..." : "Accedi"}
                      </Button>
                    </form>
                  </Form>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      setMode("sign up");
                      setErrorMessage(null);
                    }}
                    className="w-full mt-4 text-xs text-mute hover:text-deep cursor-pointer"
                  >
                    Non sei ancora registrato? Registrati
                  </Button>
                </>
              ) : (
                <>
                  <Form {...signUpForm}>
                    <form
                      onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-ink">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="mario@esempio.it"
                                type="email"
                                className="bg-white border-line"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-ink">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type="password"
                                className="bg-white border-line"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signUpForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-ink">
                              Conferma Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="••••••••"
                                type="password"
                                className="bg-white border-line"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-deep text-ground hover:bg-oil h-12 font-sans text-[13px] uppercase tracking-[0.14em] font-medium rounded-md transition-colors cursor-pointer mt-2"
                      >
                        {isSubmitting
                          ? "Registrazione in corso..."
                          : "Registrati"}
                      </Button>
                    </form>
                  </Form>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage(null);
                    }}
                    className="w-full mt-4 text-xs text-mute hover:text-deep cursor-pointer"
                  >
                    Sei già registrato? Accedi
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </>
  );
}
