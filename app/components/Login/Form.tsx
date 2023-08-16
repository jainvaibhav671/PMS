// Imports
"use client";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/Schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form as FForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSignIn } from "./handleSignin";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Login = z.infer<typeof LoginSchema>;

export function Form() {
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: Login) => {
    const error = await handleSignIn(values.email, values.password);
    if (!error) {
      router.push("/");
    }
  };

  return (
    <FForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="login">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="input">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="input">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button>Submit</Button>
        </div>

        <div id="below-button">
          <span>
            <Input type="checkbox" name="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </span>
          <span>
            <Link href="/forgot">Forgot Password?</Link>
          </span>
        </div>
      </form>
    </FForm>
  );
}
