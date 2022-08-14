import supabase from "../../supabaseClient";
import { IoCheckmarkCircle } from "solid-icons/io";
import { createSignal } from "solid-js";
import { Badge, Input, FormLabel, Button } from "@hope-ui/solid";

const skills = [
  {
    title: "JavaScript",
    value: "javascript",
  },
  {
    title: "TypeScript",
    value: "typescript",
  },
  {
    title: "React",
    value: "react",
  },
  {
    title: "Next.js",
    value: "next",
  },
  {
    title: "Vue.js",
    value: "vue",
  },
  {
    title: "Python",
    value: "python",
  },
  {
    title: "PHP",
    value: "php",
  },
  {
    title: "Ruby",
    value: "ruby",
  },
];

const Welcome = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [selectedSkills, setSelectedSkills] = createSignal(new Set());
  const [registering, setRegistering] = createSignal(false);

  const register = async () => {
    setRegistering(true);

    const user = supabase.auth.user();
    const { data, error } = await supabase.from("users").insert({
      id: user.id,
      name: name(),
      email: email(),
      skills: Array.from(selectedSkills()),
    });

    setRegistering(false);
  };

  return (
    <div class="mx-auto w-[800px]">
      <h2 class="text-2xl font-bold mb-2">Welcome</h2>
      <div class="mb-5">Let's input your basic information.</div>
      <div class="border border-slate-800 rounded-lg p-8">
        <div class="space-y-4 mb-8">
          <FormLabel for="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Jack"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <FormLabel for="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="jack@twitter.com"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <FormLabel>Your Skills</FormLabel>
          <div class="gap-3 flex flex-wrap">
            {skills.map(({ title, value }) => (
              <Badge
                colorScheme="primary"
                p={8}
                cursor="pointer"
                class="items-center gap-x-2"
                d="inline-flex"
                onClick={() => {
                  setSelectedSkills((prev) => {
                    const clone = new Set(prev);
                    if (clone.has(value)) {
                      clone.delete(value);
                    } else {
                      clone.add(value);
                    }
                    return clone;
                  });
                }}
              >
                {selectedSkills().has(value) && (
                  <IoCheckmarkCircle size={18} color="#ffffff" />
                )}
                {title}
              </Badge>
            ))}
          </div>
        </div>
        <div class="text-right">
          <Button onClick={register} loading={registering()}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
