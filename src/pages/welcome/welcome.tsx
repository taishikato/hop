import {
  Badge,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
} from "@hope-ui/solid";

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
];

const Welcome = () => {
  return (
    <div class="mx-auto w-[800px] border rounded-lg p-8">
      <div class="space-y-4">
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Email" />
        <h3 class="font-bold">Your Skills</h3>
        <div class="space-x-3">
          {skills.map(({ title }) => (
            <Badge
              colorScheme="primary"
              p={8}
              cursor="pointer"
              onClick={() => console.log("click")}
            >
              {title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
