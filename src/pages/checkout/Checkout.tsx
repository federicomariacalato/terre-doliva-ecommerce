import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulatePayment } from "@/services/simulatePayment";
import { OrderErrorToast } from "@/components/OrderErrorToast";
import * as z from "zod";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  Wallet,
  CheckCircle2,
  Lock,
} from "lucide-react";

// Componenti UI di shadcn con import relativi
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

// Importa selettori e azioni dal cartSlice
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../store/slices/cartSlice";

// Schema di validazione Zod per il Checkout
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Inserisci nome e cognome"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(8, "Inserisci un numero per il corriere"),
  address: z.string().min(5, "Inserisci via e numero civico"),
  city: z.string().min(2, "Inserisci la città"),
  postalCode: z.string().regex(/^\d{5}$/, "Il CAP deve contenere 5 cifre"),
  paymentMethod: z.enum(["card", "paypal", "cod"], {
    message: "Seleziona un metodo di pagamento",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lettura dati dallo store Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Spedizione gratuita per ordini superiori a 50€
  const shippingCost = cartTotal >= 50 || cartTotal === 0 ? 0 : 6.9;
  const grandTotal = cartTotal + shippingCost;

  // Reindirizza alla Home se il carrello viene svuotato
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      navigate("/");
    }
  }, [cartItems, navigate, isSubmitting]);

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

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setIsSubmitting(true);
      await simulatePayment();

      console.log("Ordine Inviato:", {
        customer: data,
        items: cartItems,
        totalAmount: grandTotal,
      });
      dispatch(clearCart());
      navigate("/", { state: { orderSuccess: true } });
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Si è verificato un errore imprevisto");
      }
      console.log(error);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#fbf9f4] py-8 px-4 sm:px-6 lg:px-8 font-sans text-[#1a1a1a]">
      <OrderErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header di navigazione */}
        <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-4">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2c3e2b] hover:text-[#b87d4b] transition-colors"
          >
            <ArrowLeft size={16} />
            Torna allo Shopping
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#7c7c7c]">
            <Lock size={14} className="text-[#2c3e2b]" />
            <span>Checkout Sicuro 256-bit</span>
          </div>
        </div>

        {/* Struttura principale a 2 Colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLONNA SINISTRA: Form di Spedizione & Pagamento (7/12) */}
          <div className="lg:col-span-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* 1. Dati di Spedizione */}
                <Card className="bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl text-[#2c3e2b]">
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
                              className="bg-white border-[#e8e4d9]"
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
                              Email per la spedizione
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#2c3e2b]">
                              Telefono (per il corriere)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+39 333 1234567"
                                className="bg-white border-[#e8e4d9]"
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
                            Indirizzo e Numero Civico
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Via dei Cipressi, 12"
                              className="bg-white border-[#e8e4d9]"
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
                                  className="bg-white border-[#e8e4d9]"
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
                                className="bg-white border-[#e8e4d9]"
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

                {/* 2. Metodo di Pagamento */}
                <Card className="bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl text-[#2c3e2b]">
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
                              value={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center justify-between p-3.5 border rounded-lg border-[#e8e4d9] bg-white [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="card" id="card" />
                                  <Label
                                    htmlFor="card"
                                    className="flex items-center gap-2 cursor-pointer font-sans text-sm"
                                  >
                                    <CreditCard
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>Carta di Credito / Debito</span>
                                  </Label>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3.5 border rounded-lg border-[#e8e4d9] bg-white [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="paypal" id="paypal" />
                                  <Label
                                    htmlFor="paypal"
                                    className="flex items-center gap-2 cursor-pointer font-sans text-sm"
                                  >
                                    <Wallet
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>PayPal</span>
                                  </Label>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-3.5 border rounded-lg border-[#e8e4d9] bg-white [&:has(:checked)]:border-[#2c3e2b] [&:has(:checked)]:bg-[#f4f1ea]">
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="cod" id="cod" />
                                  <Label
                                    htmlFor="cod"
                                    className="flex items-center gap-2 cursor-pointer font-sans text-sm"
                                  >
                                    <Truck
                                      size={18}
                                      className="text-[#2c3e2b]"
                                    />
                                    <span>
                                      Contrassegno (Pagamento alla Consegna)
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

                {/* Pulsante Conferma Ordine */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2c3e2b] text-[#fbf9f4] hover:bg-[#1e2b1d] h-14 font-sans text-xs uppercase tracking-widest font-semibold rounded-lg shadow-md transition-all cursor-pointer"
                >
                  {isSubmitting
                    ? "Elaborazione dell'Ordine..."
                    : `Conferma e Paga €${grandTotal.toFixed(2)}`}
                </Button>
              </form>
            </Form>
          </div>

          {/* COLONNA DESTRAM: Riepilogo Prodotti Carrello (5/12) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <Card className="bg-[#f4f1ea] border-[#e8e4d9] shadow-sm">
              <CardHeader className="border-b border-[#e8e4d9]">
                <CardTitle className="font-serif text-lg text-[#1a1a1a]">
                  Riepilogo Ordine (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Mappatura prodotti da cartSlice */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-3 border-b border-[#e8e4d9] last:border-b-0"
                    >
                      <div className="w-14 h-16 bg-white rounded-md overflow-hidden shrink-0 border border-[#e8e4d9]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm text-[#1a1a1a] truncate leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#7c7c7c] uppercase tracking-wider block mt-0.5">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-xs text-[#7c7c7c]">
                          Quantità: {item.quantity}
                        </span>
                      </div>
                      <span className="font-sans text-sm font-semibold text-[#b87d4b] self-center">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calcolo Totale e Spedizione */}
                <div className="space-y-2 pt-4 border-t border-[#e8e4d9]">
                  <div className="flex justify-between text-xs text-[#7c7c7c]">
                    <span>Subtotale</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {cartTotal.toFixed(2)}€
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#7c7c7c]">
                    <span>Spedizione Espresso</span>
                    <span className="font-semibold text-[#1a1a1a]">
                      {shippingCost === 0
                        ? "Gratuita"
                        : `${shippingCost.toFixed(2)}€`}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[11px] text-[#b87d4b] pt-1">
                      Mancano €{(50 - cartTotal).toFixed(2)} per la spedizione
                      gratuita!
                    </p>
                  )}

                  <div className="flex justify-between font-serif text-lg font-medium text-[#1a1a1a] pt-3 border-t border-[#e8e4d9]">
                    <span>Totale da Pagare</span>
                    <span className="font-sans text-base font-semibold text-[#b87d4b]">
                      {grandTotal.toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Badge di Affidabilità */}
                <div className="pt-4 space-y-2.5 text-xs text-[#2c3e2b] border-t border-[#e8e4d9]">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck
                      size={18}
                      className="text-[#b87d4b] shrink-0"
                    />
                    <span>Spedizione sicura con imballo anti-rottura</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2
                      size={18}
                      className="text-[#b87d4b] shrink-0"
                    />
                    <span>Olio 100% Extravergine di Oliva Italiano</span>
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
