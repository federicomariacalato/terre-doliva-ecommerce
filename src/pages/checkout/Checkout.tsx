import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  Wallet,
  CheckCircle2,
} from "lucide-react";

// Componenti shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Importa selettori e azioni da Redux (adatta i percorsi se diversi)
import {
  selectCartItems,
  selectCartTotal,
  clearCart, // Assicurati di avere un'azione per svuotare il carrello
} from "../store/slices/cartSlice";

// 1. Schema di validazione Zod
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Inserisci nome e cognome completi"),
  email: z.string().email("Inserisci un'indirizzo email valido"),
  phone: z.string().min(8, "Inserisci un numero di telefono per il corriere"),
  address: z.string().min(5, "Inserisci via e numero civico"),
  city: z.string().min(2, "Inserisci la città"),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Il CAP deve contenere esattamente 5 cifre"),
  paymentMethod: z.enum(["card", "paypal", "cod"], {
    required_error: "Seleziona un metodo di pagamento",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lettura dati da Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Calcolo Spedizione (Gratuita sopra i 50€)
  const shippingCost = cartTotal >= 50 || cartTotal === 0 ? 0 : 6.9;
  const grandTotal = cartTotal + shippingCost;

  // Reindirizzamento se il carrello è vuoto
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      navigate("/");
    }
  }, [cartItems, navigate, isSubmitting]);

  // Inizializzazione React Hook Form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "card",
    },
  });

  // Gestione Invio Ordine
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);

    console.log("Dati ordine inviati:", {
      customer: data,
      items: cartItems,
      totalAmount: grandTotal,
    });

    // Simulazione chiamata API (2 secondi)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Svuotiamo il carrello in Redux e navighiamo alla pagina di conferma
    dispatch(clearCart());
    navigate("/thank-you");
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#fbf9f4] py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header con pulsante Torna Indietro */}
        <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2c3e2b] hover:text-[#b87d4b] transition-colors"
          >
            <ArrowLeft size={16} />
            Torna allo Shopping
          </Link>
          <h1 className="font-serif text-2xl text-[#2c3e2b]">
            Cassa & Pagamento
          </h1>
        </div>

        {/* Layout a Due Colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLONNA SINISTRA: Form Spedizione e Pagamento (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Sezione 1: Dati di Spedizione */}
                <Card className="bg-white border-[#e8e4d9] shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg text-[#2c3e2b]">
                      1. Indirizzo di Spedizione
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
                              className="border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                              Email di conferma
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="mario@esempio.it"
                                className="border-[#e8e4d9]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                              Telefono
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+39 333 1234567"
                                className="border-[#e8e4d9]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                            Indirizzo e Civico
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Via dei Cipressi 12"
                              className="border-[#e8e4d9]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                                Città
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Firenze"
                                  className="border-[#e8e4d9]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                              CAP
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="50100"
                                className="border-[#e8e4d9]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Sezione 2: Metodo di Pagamento */}
                <Card className="bg-white border-[#e8e4d9] shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg text-[#2c3e2b]">
                      2. Metodo di Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center justify-between p-3 border rounded-lg border-[#e8e4d9] bg-[#f4f1ea]/30 [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="card" id="card" />
                                  <Label
                                    htmlFor="card"
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                  >
                                    <CreditCard
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>Carta di Credito / Debito</span>
                                  </Label>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3 border rounded-lg border-[#e8e4d9] bg-[#f4f1ea]/30 [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="paypal" id="paypal" />
                                  <Label
                                    htmlFor="paypal"
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                  >
                                    <Wallet
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>PayPal</span>
                                  </Label>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3 border rounded-lg border-[#e8e4d9] bg-[#f4f1ea]/30 [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="cod" id="cod" />
                                  <Label
                                    htmlFor="cod"
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                  >
                                    <Truck
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>
                                      Contrassegno (Pagamento alla consegna)
                                    </span>
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Pulsante Conferma Ordine Desktop */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2c3e2b] text-[#fbf9f4] hover:bg-[#1e2b1d] h-12 text-base font-semibold shadow-md transition-colors"
                >
                  {isSubmitting
                    ? "Elaborazione dell'ordine..."
                    : `Paga €${grandTotal.toFixed(2)}`}
                </Button>
              </form>
            </Form>
          </div>

          {/* COLONNA DESTRAM: Riepilogo Carrello (5/12) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <Card className="bg-[#f4f1ea] border-[#e8e4d9] shadow-sm">
              <CardHeader className="border-b border-[#e8e4d9]/80">
                <CardTitle className="font-serif text-lg text-[#1a1a1a]">
                  Riepilogo Ordine
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Lista Prodotti */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 pb-3 border-b border-[#e8e4d9]/60 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm text-[#1a1a1a] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#7c7c7c]">
                          Quantità: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#b87d4b]">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calcoli Totali */}
                <div className="space-y-2 pt-4 border-t border-[#e8e4d9]">
                  <div className="flex justify-between text-sm text-[#7c7c7c]">
                    <span>Subtotale</span>
                    <span>{cartTotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#7c7c7c]">
                    <span>Spedizione</span>
                    <span>
                      {shippingCost === 0
                        ? "Gratuita"
                        : `${shippingCost.toFixed(2)}€`}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[11px] text-[#b87d4b]">
                      Aggiungi ancora €{(50 - cartTotal).toFixed(2)} per la
                      spedizione gratuita!
                    </p>
                  )}

                  <div className="flex justify-between font-serif text-lg font-bold text-[#1a1a1a] pt-3 border-t border-[#e8e4d9]">
                    <span>Totale</span>
                    <span className="font-sans text-[#b87d4b]">
                      {grandTotal.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Badge di Garanzia per Olio d'Oliva */}
                <div className="pt-4 space-y-2 text-xs text-[#2c3e2b] border-t border-[#e8e4d9]/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#b87d4b]" />
                    <span>Imballaggio Nack-Safe anti-rottura certificato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#b87d4b]" />
                    <span>100% Olio Extravergine estratto a freddo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
