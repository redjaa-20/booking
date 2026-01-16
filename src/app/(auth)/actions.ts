"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: any) {
  const supabase = await createClient();

  // Type handling depends on how you pass data.
  // If passing raw FormData:
  // const email = formData.get('email') as string
  // const password = formData.get('password') as string

  // If passing object (from react-hook-form):
  const { email, password } = formData;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signup(formData: any) {
  const supabase = await createClient();

  const { email, password, name } = formData;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Optional: manually insert into a 'users' table if you're not using triggers
  /*
  if (data.user) {
    await supabase.from('users').insert({
      id: data.user.id,
      email: email,
      name: name,
    })
  }
  */

  revalidatePath("/", "layout");
  return { success: true };
}
