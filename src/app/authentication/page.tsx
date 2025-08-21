"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "not-authenticated") {
      toast.info("Conecte-se à BEWARE para uma melhor experiência.", {
        id: "auth-error",
        duration: 8000,
      });
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Authentication;
