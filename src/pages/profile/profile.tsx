import supabase from "../../supabaseClient";
import Container from "./Container/Container";
import H3 from "../../components/H3";
import { createSignal, createEffect } from "solid-js";
import { skills } from "../../consts/skills";
import { IoCheckmarkCircle } from "solid-icons/io";
import { Badge, Input, FormLabel, notificationService } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";

type UserUpdate = {
  id: string;
  name: string;
  email: string;
  skills: string[];
  linkedin?: string;
  website?: string;
};

const Profile = () => {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = createSignal<
    UserUpdate | Record<string, never>
  >({});

  const [updateUser, setUpdateUser] = createSignal<
    UserUpdate | Record<string, never>
  >({});

  const [updateSkills, setUpdateSkills] = createSignal<Set<string>>(new Set());

  createEffect(async () => {
    const user = supabase.auth.user();

    if (user == null) navigate("/app");

    const { data } = await supabase
      .from("users")
      .select()
      .eq("id", user.id)
      .single();

    setLoginUser(data);
  });

  createEffect(() => {
    setUpdateSkills(new Set(loginUser().skills));
  });

  return (
    <div class="w-[700px] mx-auto flex flex-col">
      <H3>Basic Information</H3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const user = loginUser();
          if (user.id == null) return;

          updateUser().skills = Array.from(updateSkills());

          const { error } = await supabase
            .from("users")
            .update(updateUser())
            .eq("id", user.id);

          if (!error) {
            notificationService.show({
              status: "success",
              title: "Saved Successfully",
            });
            setUpdateUser({});
          }
        }}
      >
        <Container>
          <FormLabel for="name">Name</FormLabel>
          <Input
            mt={10}
            mb={20}
            required
            id="name"
            placeholder="Jack"
            value={loginUser().name ?? ""}
            onChange={(e) =>
              setUpdateUser((prev) => {
                const clone = { ...prev };
                clone.name = e.currentTarget.value;

                return clone;
              })
            }
          />
          <FormLabel for="email">Email address</FormLabel>
          <Input
            mt={10}
            mb={20}
            required
            id="email"
            type="email"
            placeholder="jack@twitter.com"
            value={loginUser().email ?? ""}
            onChange={(e) =>
              setUpdateUser((prev) => {
                const clone = { ...prev };
                clone.email = e.currentTarget.value;

                return clone;
              })
            }
          />
        </Container>
        <H3>Skills</H3>
        <Container>
          <div class="gap-3 flex flex-wrap">
            {skills.map(({ title, value }) => (
              <Badge
                colorScheme="primary"
                p={8}
                cursor="pointer"
                class="items-center gap-x-2"
                d="inline-flex"
                onClick={() => {
                  setUpdateSkills((prev) => {
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
                {updateSkills().has(value) && (
                  <IoCheckmarkCircle size={18} color="#ffffff" />
                )}
                {title}
              </Badge>
            ))}
          </div>
        </Container>
        <H3>Links</H3>
        <Container>
          <FormLabel for="linkedin">LinkedIn</FormLabel>
          <Input
            mt={10}
            mb={20}
            type="url"
            id="linkedin"
            value={loginUser().linkedin ?? ""}
            onChange={(e) =>
              setUpdateUser((prev) => {
                const clone = { ...prev };
                clone.linkedin = e.currentTarget.value;

                return clone;
              })
            }
          />
          <FormLabel for="website">Other website</FormLabel>
          <Input
            mt={10}
            mb={20}
            id="website"
            type="url"
            value={loginUser().website ?? ""}
            onChange={(e) =>
              setUpdateUser((prev) => {
                const clone = { ...prev };
                clone.website = e.currentTarget.value;

                return clone;
              })
            }
          />
        </Container>
        <div class="text-right">
          <button class="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
