import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "./ui/input";

const contactFormSchema = z.object({
  fullName: z.string().min(3, "Inserisci nome e cognome"),
  email: z.string().email("Inserisci la tua email"),
  subject: z.string().optional(),
  message: z.string().max(600).min(10, "Scrivi il messaggio"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function HomeContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const honeypotRef = useRef<HTMLInputElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      message: "",
      subject: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);

      const messageContent = {
        email: data.email,
        fullName: data.fullName,
        message: data.message,
        subject: data.subject,
        _gotcha: honeypotRef.current?.value,
      };

      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      if (!endpoint) {
        console.error("VITE_FORMSPREE_ENDPOINT non definito");
        throw new Error("Si è verificato un problema, riprova");
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(messageContent),
      });

      if (!response.ok) {
        console.error("Problema nel metodo POST");
        throw new Error("Si è verificato un problema, riprova");
      } else {
        setIsSuccess(true);
        form.reset();
      }
    } catch (error) {
      setErrorMessage("Si è verificato un errore imprevisto, riprova");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section id="contatti" className="py-24 px-6 bg-[#fbf9f4]">
        <div className="max-w-lg mx-auto">
          <div
            role="alert"
            className={
              errorMessage
                ? "flex items-start gap-3 bg-[#5c2626] text-[#fbf9f4] rounded-lg shadow-sm px-4 py-3.5 mb-6"
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
          {isSuccess ? (
            <div
              role="status"
              aria-live="polite"
              className="text-center py-16 space-y-4"
            >
              <CheckCircle2 size={40} className="text-[#b87d4b] mx-auto" />
              <h2 className="font-serif text-2xl text-[#1a1a1a]">
                Messaggio inviato!
              </h2>
              <p className="font-sans text-sm text-[#7c7c7c] max-w-sm mx-auto">
                Grazie per averci scritto, ti risponderemo il prima possibile.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                // eslint-disable-next-line react-hooks/refs
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <Card className="bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl text-[#2c3e2b]">
                      Contattaci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                            Nome e Cognome
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mario Rossi"
                              className="bg-white border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="mario@esempio.it"
                              className="bg-white border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                            Oggetto{" "}
                            <span className="normal-case text-[#7c7c7c] font-normal">
                              (facoltativo)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Informazioni su un ordine"
                              className="bg-white border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                            Messaggio
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Scrivi qui il tuo messaggio..."
                              className="bg-white border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Input
                      type="text"
                      name="_gotcha"
                      ref={honeypotRef}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2c3e2b] text-[#fbf9f4] hover:bg-[#1e2b1d] h-14 font-sans text-xs uppercase tracking-widest font-semibold rounded-lg shadow-md transition-all cursor-pointer"
                >
                  {isSubmitting ? "Invio in corso..." : "Invia messaggio"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </section>
    </>
  );
}
