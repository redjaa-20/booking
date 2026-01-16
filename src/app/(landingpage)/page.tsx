// import { ComponentExample } from "src/components/component-example";

// export default function Page() {
// return <ComponentExample />;
// }
import { createClient } from "src/lib/supabase/client";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("test_connection")
    .select("*")
    .limit(1);

  if (error) {
    console.error(error);
    return <pre>Error: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
