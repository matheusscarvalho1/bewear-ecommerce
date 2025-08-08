"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useAddShippingAddress } from "@/hooks/mutations/use-add-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddress } from "@/hooks/queries/use-shipping-addresses";

const addressFormSchema = z.object({
  email: z.email("Email inválido."),
  fullName: z.string().min(1, "Nome completo é obrigatório."),
  cpf: z.string().min(14, "CPF inválido.").max(14, "CPF inválido."),
  phone: z.string().min(1, "Celular é obrigatório."),
  zipCode: z.string().min(1, "CEP é obrigatório."),
  address: z.string().min(1, "Endereço é obrigatório."),
  number: z.string().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  district: z.string().min(1, "Bairro é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatória."),
  state: z.string().min(1, "Estado é obrigatório."),
});
type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const { data: addresses } = useUserAddress({
    initialData: shippingAddresses,
  });
  const { mutateAsync: updateShippingAddress, isPending: isUpdating } =
    useUpdateCartShippingAddress();

  async function handleGoToPayment(addressId: string) {
    await updateShippingAddress({ shippingAddressId: addressId });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          {addresses?.map((address) => (
            <Card
              key={address.id}
              className={`border-2 ${selectedAddress === address.id ? "border-primary" : "border-muted"} transition-colors`}
            >
              <CardContent className="flex items-center gap-3 px-4 py-4">
                <RadioGroupItem value={address.id} id={address.id} />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {address.recipientName}, {address.street}, {address.number}
                    {address.complement ? `, ${address.complement}` : ""},{" "}
                    {address.neighbourhood}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {address.city} - {address.state}, {address.zipCode}
                  </span>
                </div>

                {selectedAddress === address.id && (
                  <Button
                    className="ml-auto"
                    onClick={() => handleGoToPayment(address.id)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Salvando..." : "Ir para pagamento"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          <Card
            className={`border-2 ${selectedAddress === "add_new" ? "border-primary" : "border-muted"} transition-colors`}
          >
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <RadioGroupItem value="add_new" id="add_new" />
              <Label htmlFor="add_new">Adicionar novo</Label>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <AddressForm
            onAddressCreated={async (newAddressId: string) => {
              await updateShippingAddress({ shippingAddressId: newAddressId });
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

function AddressForm({
  onAddressCreated,
}: {
  onAddressCreated?: (addressId: string) => void;
}) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    },
  });

  const { mutateAsync, isPending } = useAddShippingAddress();

  async function onSubmit(values: AddressFormValues) {
    const result = await mutateAsync({
      email: values.email,
      fullName: values.fullName,
      cpf: values.cpf,
      phone: values.phone,
      zipCode: values.zipCode,
      address: values.address,
      number: values.number,
      complement: values.complement,
      district: values.district,
      city: values.city,
      state: values.state,
    });
    if (onAddressCreated && result?.id) {
      await onAddressCreated(result.id);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="###.###.###-##"
                  mask="_"
                  placeholder="000.000.000-00"
                  {...field}
                  value={field.value || ""}
                  onValueChange={(values) =>
                    field.onChange(values.formattedValue)
                  }
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
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="(##) #####-####"
                  mask="_"
                  placeholder="(00) 00000-0000"
                  {...field}
                  value={field.value || ""}
                  onValueChange={(values) =>
                    field.onChange(values.formattedValue)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <PatternFormat
                  customInput={Input}
                  format="#####-###"
                  mask="_"
                  placeholder="00000-000"
                  {...field}
                  value={field.value || ""}
                  onValueChange={(values) =>
                    field.onChange(values.formattedValue)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o complemento (opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar endereço"}
        </Button>
      </form>
    </Form>
  );
}

export default Addresses;
